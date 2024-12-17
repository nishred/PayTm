import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const PORT = process.env.PORT;

const JWT_SECRET = process.env.JWT_SECRET;

export { MONGO_URI, PORT, JWT_SECRET };
