import mongoose from "mongoose";
import Message from "./message.js";

const Schema = mongoose.Schema;

const channelSchema = new Schema({
  channelName: {
    type: String,
    required: true,
  },
  messages: [{ type: Schema.ObjectId, ref: "Message" }],
});

export default mongoose.model("Channel", channelSchema);
