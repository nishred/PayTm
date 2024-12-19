import express from "express";
import { PORT, MONGO_URI, JWT_SECRET } from "./config/server.config.js";

import cors from "cors";
import connectToDb from "./config/db.config.js";
import apiRouter from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import User from "./models/User.js";
import Account from "./models/Account.js";
import jwt from "jsonwebtoken";
import asyncHandler from "./utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());

app.use(express.urlencoded());

app.use(cors());

app.use("/api", apiRouter);

app.get(
  "/me",
  asyncHandler(async (req, res, next) => {
    let token;

    token = req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

    const { userId } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(userId);

    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      data: {
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
  })
);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log("The server has started listening on PORT ", PORT);

  await connectToDb(MONGO_URI);

  console.log("Connect to mongo db was successfull");
});
