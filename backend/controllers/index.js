import {
  register,
  signIn,
  updateUser,
  getAllUsers,
} from "./user.controller.js";

import { fetchBalance,transferBalance } from "./account.controller.js";

export const UserController = {
  register,
  signIn,
  updateUser,
  getAllUsers,
};

export const AccountController = {
  fetchBalance,transferBalance
};
