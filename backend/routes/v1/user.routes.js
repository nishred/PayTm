import express from "express";
import { registerUserSchema } from "../../validators/user.validator.js";

import validator from "../../middlewares/validator.js";

import { UserController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validator(registerUserSchema),
  UserController.register
);

userRouter.post("/signin", UserController.signIn);

userRouter.put("/", auth, UserController.updateUser);

userRouter.get("/bulk", auth, UserController.getAllUsers);

export default userRouter;
