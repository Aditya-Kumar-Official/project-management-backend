import { User } from '../models/user.model.js';
import { sendMail, emailVerificationMailgenContent } from '../utils/mail.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/async-handler.js';

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });

  if (existedUser) {
    throw new ApiError(400, 'User already exists');
  }
  const user = await User.create({
    userName,
    email,
    password,
    isEmailVerified: false,
  });
  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  sendMail({
    email: user.email,
    userName: (await user).userName,
    subject: 'Email Verification',
    mailgenContent: emailVerificationMailgenContent(
      user.userName,
      `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${unhashedToken}`
    ),
  });

  const createdUser = await User.findById(user._id).select(
    '-password -emailVerificationToken -emailVerificationExpiry -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'User not created');
  }
  res
    .status(201)
    .json(
      new ApiResponse(201, { user: createdUser }, 'User created successfully')
    );
});

const generateAccessAndRfreshToken = async(user_id) => {
  const user = await User.findById(user_id);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const login =asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email) {
    throw new ApiError(400, 'userName and Email must be filled');
  }
  const user = await User.findOne({ email });

  const passwordValid = await user.isPasswordCorrect(password);
  if (!passwordValid)
  {
    throw new ApiError(400,"Incorrect Password")
  }
  const{accessToken,refreshToken}=await generateAccessAndRfreshToken(user._id)

  const loginUser=await User.findById(user._id).select("-password -refreshToken ")

  const options=
  {
    httpOnly:true,
    secure:true
  }

  return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{user:loginUser,accessToken,refreshToken},"Login Successfully"))
})

export { registerUser,login };
