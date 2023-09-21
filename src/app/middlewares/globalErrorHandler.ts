import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { ErrorRequestHandler, NextFunction, Response } from 'express';

// global error handler
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line no-unused-expressions
  config.env == 'development'
    ? 
      console.log(`Global error handler`, error)
    : console.log(`Global error handler`, error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidatorError') {
    const fieldError = handleValidationError(error);
    statusCode = fieldError.statusCode;
    message = fieldError.message;
    errorMessage = fieldError.errorMessage;
  }

  else if (error instanceof ZodError) {
    const fieldError = handleZodError(error);
    statusCode = fieldError.statusCode;
    message = fieldError.message;
    errorMessage = fieldError.errorMessage;
  }

  else if (error?.name === 'CastError') {
    const fieldError = handleCastError(error);
    statusCode = fieldError.statusCode;
    message = fieldError.message;
    errorMessage = fieldError.errorMessage;
  }

  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
