import mongoose from "mongoose";

async function connectToDb(MONGO_URI) {
  await mongoose.connect(MONGO_URI);
}


export default connectToDb
