import express from "express";
import userRouter from "./user.routes.js";

import accountRouter from "./account.routes.js";

const v1Router = express.Router();

v1Router.get("/ping", (req, res, next) => {
  res.json({
    msg: "ping success",
  });
});

v1Router.use("/users", userRouter);

v1Router.use("/accounts", accountRouter);

export default v1Router;
