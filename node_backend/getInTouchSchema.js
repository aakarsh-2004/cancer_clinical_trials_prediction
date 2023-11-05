import mongoose, { mongo } from "mongoose";

const GetInTouchSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Contact = mongoose.model("contactus", GetInTouchSchema);

export { GetInTouchSchema, Contact };