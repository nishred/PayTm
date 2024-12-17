import express from "express";
import { PORT, MONGO_URI } from "./config/server.config.js";

import cors from "cors";
import connectToDb from "./config/db.config.js";

import apiRouter from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import User from "./models/User.js";
import Account from "./models/Account.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded());

app.use(cors());

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log("The server has started listening on PORT ", PORT);

  await connectToDb(MONGO_URI);

  console.log("Connect to mongo db was successfull");
});
