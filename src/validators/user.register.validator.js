import { body } from 'express-validator';

const userRegisterValidator = () => {
  return [
    body('userName')
      .trim()
      .notEmpty()
      .withMessage('userName should not be empty')
      .isLowercase()
      .withMessage('user must be in lower case')
      .isLength({ min: 3 })
      .withMessage('userName must contain atleast 3 letter'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('email must be present')
      .isEmail()
      .withMessage('not valid email'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password should not be empty')
      .isLength({ min: 3 })
      .withMessage('password must containa atleast 3 letter'),
  ];
};
