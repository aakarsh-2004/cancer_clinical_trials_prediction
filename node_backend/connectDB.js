import mongoose from "mongoose";

function connectDB() {
    mongoose
    .connect("mongodb+srv://mannuhere06:0624haishayad@admin-abhi.zbvwevw.mongodb.net/?retryWrites=true&w=majority")
    .then((e) => console.log(`Connected to mongoDB: ${e.connection.host}`))
    .catch((e) => console.log(e));
}

export default connectDB;