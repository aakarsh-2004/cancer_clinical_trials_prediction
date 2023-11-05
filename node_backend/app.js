import express, { json } from "express";
import cors from "cors";
import connectDB from "./connectDB.js";
import _ from "lodash";
import { User } from "./userSchema.js";
import { TrialCenter } from "./trialcenterSchema.js";
import { Contact } from "./getInTouchSchema.js";


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

app.get("/get-languages", async (req, res) => {
    try {
        const languages = await Language.find({}, { _id: 0, __v: 0 });
        res.json(JSON.stringify(languages));
        // console.log(JSON.stringify(languages));
    } catch (error) {
        // console.log(error);
    }
})

app.post("/get-in-touch", async (req, res) => {
    try {
        const contactus = new Contact(req.body);
        await contactus.save();

        res.json({ message: "Your request has been successfully received !" });
    } catch (error) {

    }
})

app.post("/center", async (req, res) => {
    try {

        const user = await User.findOne({username: req.body.username});

        console.log(user);

        let result = await fetch("http://127.0.0.1:8000/api/", {
            method: "POST",
            body: JSON.stringify({
                "Age": -_.toNumber(user.age),
                "Weight": _.toNumber(user.weight),
                "Height": _.toNumber(user.height),
                "Location": (user.location),
                "Blood Group": user.bloodgp,
                "Disease": user.diseases,
                "Cancer": _.toNumber(user.cancer),
                "Stage": _.toNumber(user.stage),
                "Gender": _.capitalize(user.gender)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        result = await result.json();
        
        console.log(result); // --> { Result, Disease, City}
        
        let param = {disease: _.toLower(result.Disease), city: _.toLower(result.City)};
        
        let recommended = await fetch("http://localhost:5050/recommended-center", {
            method: "post",
            body: JSON.stringify(param),
            headers: {
                "Content-Type": "application/json"
            }
        })

        recommended = await recommended.json();

        let otherCenters = await fetch("http://localhost:5050/other-centers", {
            method: "post",
            body: JSON.stringify({disease: param.disease}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        otherCenters = await otherCenters.json();

        if (recommended && otherCenters) res.json({recommended: recommended, other: otherCenters});
        
    } catch (error) {
        
    }
})


app.post("/recommended-center", async (req, res) => {
    try {

        // console.log(req.body);
        const centers = await TrialCenter.find({ trials: req.body.disease }, { _id: 0, __v: 0 });

        // console.log(centers);

        for (let i = 0; i < centers.length; i++) {
            const center = centers[i]
            
            if (_.toLower(center.location).includes(req.body.city)){
                res.json(center);
                break;
            }
        }

    } catch (error) {

    }
})

app.post("/other-centers", async (req, res) => {
    try {

        const otherCenters = await TrialCenter.find({ trials: req.body.disease }, { _id: 0, __v: 0 });

        if (otherCenters) res.json(otherCenters);

    } catch (error) {

    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})

// https://localhost:8000/api/


// user_data = {
//     "Age": user["Age"],
//     "Weight (in kg)": user["Weight"],
//     "Height (in cm)": user["Height"],
//     "Location": user["Location"],
//     "Blood Group": user["Blood Group"],
//     "Disease": user["Disease"],
//     "Stage": user["Stage"],
//     "Cancer": user["Cancer"],
//     "Gender": user["Gender"]
// }

// age, weight, height, stage, cancer --> in Number