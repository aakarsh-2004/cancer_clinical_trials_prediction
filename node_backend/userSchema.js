import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    location: String,
    age: String,
    weight: String,
    height: String,
    diseases: String,
    bloodgp: String,
    gender: String,
    cancer: String,
    stage: String
}); 

const User = mongoose.model("user", userSchema)

export { userSchema, User };