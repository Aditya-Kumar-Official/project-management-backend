class ApiError extends Error {
  constructor(
    StatusCode,
    message = 'Something went wrong',
    errors = [],
    stack = ''
  ) {
    super(message);
    this.Statuscode = StatusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      this.stack = Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
