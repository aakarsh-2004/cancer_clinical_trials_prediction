import mongoose from "mongoose";

const trialcenterSchema = new mongoose.Schema({
    name: String,
    mobileNumber: String,
    email: String,
    location: String,
    trials: String
});

const TrialCenter = mongoose.model("trailcenter", trialcenterSchema);

export { trialcenterSchema, TrialCenter };