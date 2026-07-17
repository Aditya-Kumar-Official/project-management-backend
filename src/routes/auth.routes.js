import {
  registerUser,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
  resendEmailVerification,
  resetCurrentPassword,
  forgotPassword,
  forgotPasswordRequest,
  regenerateAccessToken,
} from '../controllers/auth.controller.js';
import { jwtVerify } from '../middlewares/auth.middleware.js';

import { Router } from 'express';
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/logout').post(jwtVerify, logout);
router.route('/getCurrentUser').get(jwtVerify, getCurrentUser);
router.route('/verifyEmail/:unHashedToken').get(verifyEmail);
router
  .route('/resendEmailVerification')
  .get(jwtVerify, resendEmailVerification);
router.route('/forgotPasswordRequest').get(forgotPasswordRequest);
router.route('/forgetPassword/:forgetToken').get(forgotPassword);
router.route('/resetCurrentPassword').post(jwtVerify, resetCurrentPassword);
router.route('/refreshToken').post(regenerateAccessToken);

export default router;
