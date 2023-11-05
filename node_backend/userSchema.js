import mongoose from "mongoose";

// UserSchema consists of all the necessary information about the user that is used to make predictions.
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