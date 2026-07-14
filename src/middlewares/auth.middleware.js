import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async-handler.js"
import jwt from "jsonwebtoken"


const jwtVerify=asyncHandler(async(req,res,next)=>
{
    const token=req.cookies?.accessToken || req.header("authorization")?.replace("Bearer","")

    if(!token)
    {
        throw new ApiError(401,"Un-Authorized Request")

    }
    try{

        const decodedToken=jwt.verify(token,process.env.JwtSecretAccessToken)
    
        const user=await User.findById(decodedToken?._id)
    
        if(!user)
        {
            throw new ApiError(401,"Invalid Access token")
        }
        req.user=user
        next()
        
    }
    catch(err)
    {
        throw new ApiError(401,"Invalid access token")
    }

})
export {jwtVerify}