import {
  register,
  signIn,
  updateUser,
  getAllUsers,
  getProfile
} from "./user.controller.js";

import { fetchBalance,transferBalance } from "./account.controller.js";

export const UserController = {
  register,
  signIn,
  updateUser,
  getAllUsers,
  getProfile
};

export const AccountController = {
  fetchBalance,transferBalance
};
