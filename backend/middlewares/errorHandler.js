import ErrorResponse from "../errors/ErrorResponse.js";

import { StatusCodes } from "http-status-codes";

export function errorHandler(err, req, res, next) {

  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
    });
  }

  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    error: err.message,
  });
}

export default errorHandler;
