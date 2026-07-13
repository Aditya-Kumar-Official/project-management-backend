import { validationResult } from 'express-validator';

import { ApiError } from '../utils/ApiError.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  extractedError = [];
  errors.array().map((err) => {
    extractedError.push({ [err.path]: err.msg });
  });
  throw new ApiError(422, 'Not valid data', extractedError);
};
