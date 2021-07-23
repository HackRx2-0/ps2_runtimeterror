import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    keywords: [String],
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamp: true }
);

export default mongoose.model("Message", messageSchema);
