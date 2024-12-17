import express from "express";
import auth from "../../middlewares/auth.js";
import { AccountController } from "../../controllers/index.js";

const accountRouter = express.Router();

accountRouter.get("/balance", auth, AccountController.fetchBalance);

accountRouter.post("/transfer", auth, AccountController.transferBalance);

export default accountRouter;
