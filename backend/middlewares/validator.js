import { Schema } from "zod";
import asyncHandler from "../utils/asyncHandler.js";

const validator = (schema) => {
  return asyncHandler((req, res, next) => {
    const parsedBody = schema.parse(req.body);

    req.body = parsedBody;

    next();
  });
};

export default validator;
