import ErrorResponse from "../errors/ErrorResponse.js";
import UserRepository from "../repositories/user.repository.js";
import asyncHandler from "../utils/asyncHandler.js";

import { StatusCodes } from "http-status-codes";

const userRepository = new UserRepository();

const register = asyncHandler(async (req, res, next) => {
  const user = await userRepository.create(req.body);

  const token = user.getJwtToken();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registered Successfully",
    data: { token },
  });
});

const signIn = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new ErrorResponse(
      "Both username and password are required",
      StatusCodes.BAD_REQUEST
    );

  const user = await userRepository.findByUsername(username);

  if (!user) throw new ErrorResponse("User not found", StatusCodes.NOT_FOUND);

  const comparePassword = await user.compare(password);

  if (!comparePassword)
    throw new ErrorResponse("Incorret password", StatusCodes.BAD_REQUEST);

  const token = user.getJwtToken();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Login successfull",

    data: { token },
  });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const updatedUser = await userRepository.update(req.userId, req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User updated successfully",
  });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await userRepository.getAll(req.query);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Retrived all users successfully",

    data,
  });
});

export { register, signIn, updateUser, getAllUsers };
