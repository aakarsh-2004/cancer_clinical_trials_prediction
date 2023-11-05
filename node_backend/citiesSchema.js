import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    code: Number,
    city: String
});

const City = mongoose.model("city", citySchema);

export { citySchema, City};