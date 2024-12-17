import Account from "../models/Account.js";

import mongoose from "mongoose";

import asyncHandler from "../utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";
import ErrorResponse from "../errors/ErrorResponse.js";

const fetchBalance = asyncHandler(async (req, res, next) => {
  const account = await Account.findOne({ userId: req.userId });

  res.status(200).json({
    success: true,
    data: {
      balance: account.balance,
    },
  });
});

const transferBalance = asyncHandler(async (req, res, next) => {
  let { to, amount: balance } = req.body;

  console.log("body", req.body);

  balance = Number(balance);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const fromAccount = await Account.findOne({ userId: req.userId });

    const toAccount = await Account.findOne({ userId: to });


    if (fromAccount.balance >= balance) {
      fromAccount.balance -= balance;

      toAccount.balance += balance;

      await fromAccount.save({ session });

      await toAccount.save({ session });
    } else {
      throw new ErrorResponse("Insufficient balance", StatusCodes.BAD_REQUEST);
    }

    await session.commitTransaction();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Transaction successfull",
    });
  } catch (err) {
    await session.abortTransaction();

    throw err;
  } finally {
    session.endSession();
  }
});

export { fetchBalance, transferBalance };
