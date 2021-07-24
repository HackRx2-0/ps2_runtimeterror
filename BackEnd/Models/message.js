import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
        },
        keywords: [String],
        user_id: {
            type: String,
            required: true,
        },
        user_name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
