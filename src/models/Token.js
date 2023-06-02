import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, unique: true, ref: "User" },
    refreshToken: {type: String, required: true },
});
const Token = model("Token", TokenSchema);
export default Token;
