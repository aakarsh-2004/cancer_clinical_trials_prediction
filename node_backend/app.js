import express from "express";
import cors from "cors";
import connectDB from "./connectDB.js";
import _ from "lodash";
import { User } from "./userSchema.js";
import { City } from "./citiesSchema.js";import { TrialCenter } from "./trialcenterSchema.js";
``

const app = express();
const port = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.post("/register", async (req, res) => {
    try {
        const found = await User.findOne({ username: _.toLower(_.trim(req.body.username)) });
        if (found) {
            res.json({ message: "* Email already in use !" });
        } else {
            const newUser = new User({
                name: _.toUpper(_.trim(req.body.name)),
                username: _.toLower(_.trim(req.body.username)),
                password: _.trim(req.body.password),
                location: _.toLower(_.trim(req.body.location)),
                age: _.trim(req.body.age),
                weight: _.trim(req.body.weight),
                height: _.trim(req.body.height),
                diseases: _.toLower(_.trim(req.body.diseases)),
                bloodgp: req.body.bloodgp,
                gender: req.body.gender,
                cancer: req.body.cancer,
                stage: req.body.stage
            });
            await newUser.save();

            res.json({
                name: _.toUpper(_.trim(req.body.name)),
                username: _.toLower(_.trim(req.body.username)),
            });
        }
    } catch (error) {
        // console.log(error);
    }

})

app.post("/login", async (req, res) => {
    try {
        const found = await User.findOne({ username: _.toLower(_.trim(req.body.username)) });
        if (found) {
            if (found.password === _.trim(req.body.password)) {
                res.json({
                    name: found.name,
                    username: _.toLower(_.trim(req.body.username)),
                });
            } else {
                res.json({ message: "* Incorrect password !" });
            }
        }

        res.json({ message: "* User not found !" });

    } catch (error) {
        // console.log("error");
    }
})

app.post("/find-user", async (req, res) => {
    try {
        const found = await User.findOne({ username: _.toLower(_.trim(req.body.username)) });
        if (found) res.json({ message: true });
        else res.json({ message: false });
    } catch (error) {
        // console.log(error)
    }
})

app.post("/forgot-password", async (req, res) => {
    try {
        await User.updateOne({ username: _.toLower(_.trim(req.body.username)) }, { $set: { password: _.trim(req.body.newPassword) } });
        res.json({ message: "Password Changed" });
    } catch (error) {
        // console.log(error);
    }
})

app.get("/get-languages", async(req, res) => {
    try {
        const languages = await Language.find({}, {_id:0, __v:0});
        res.json(JSON.stringify(languages));
        // console.log(JSON.stringify(languages));
    } catch (error) {
        // console.log(error);
    }
})

app.get("/recommended-center", async(req, res) => {
    try {

        const centers = await TrialCenter.find({trials: "lung cancer"}, {_id:0, __v:0});

        // console.log(centers);

        centers.forEach(async(center) => {

            const location = center.location;

            if (_.toLower(location).includes("chandigarh")) {
                res.json(center);
            }
        })
    
    } catch (error) {
        
    }
})

app.get("/other-centers", async(req, res) => { 
    try {
        
        const otherCenters = await TrialCenter.find({trials: "lung cancer"}, {_id:0, __v:0});

        if (otherCenters) res.json(otherCenters);
        
    } catch (error) {
        
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})
