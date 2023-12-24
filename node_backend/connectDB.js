import mongoose from "mongoose";


// Connecting the MongoDB database
function connectDB() {
    mongoose
    .connect()
    .then((e) => console.log(`Connected to mongoDB: ${e.connection.host}`))
    .catch((e) => console.log(e));
}

export default connectDB;
