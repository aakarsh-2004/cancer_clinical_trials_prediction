import mongoose from "mongoose";

// creating a city schema to link the city code that the model predicts and the city's name
const citySchema = new mongoose.Schema({
    code: Number,
    city: String
});

const City = mongoose.model("city", citySchema);

export { citySchema, City};