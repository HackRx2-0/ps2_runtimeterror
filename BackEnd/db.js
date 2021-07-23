import mongoose from "mongoose";
import config from "./config.js";

const db = mongoose.connect(
  config.mongoDBKey,
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.error("Error! " + err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

export default db;
