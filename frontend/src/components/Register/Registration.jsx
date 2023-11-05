import React, { useState } from "react";
import _ from "lodash";
import "./Registration.css"
import { useNavigate } from "react-router-dom";

function Registration() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [diseases, setDiseases] = useState("");
    const [bloodgp, setBloodgp] = useState("A+");
    const [gender, setGender] = useState("male");
    const [cancer, setCancer] = useState("no");
    const [stage, setStage] = useState("NA")

    const [checked, setChecked] = useState("");

    const navigate = useNavigate();

    function HandleChange(event) {
        const { value, name } = event.target;

        if (name === "name") setName(value);
        else if (name === "username") setUsername(value);
        else if (name === "password") setPassword(value);
        else if (name === "confirmPassword") setConfirmPassword(value);
        else if (name === "location") setLocation(value);
        else if (name === "age") setAge(value);
        else if (name === "weight") setWeight(value);
        else if (name === "height") setHeight(value);
        else if (name === "diseases") setDiseases(value);
        else if (name === "bloodGroup") setBloodgp(value);
        else if (name === "gender") setGender(value);
        else if (name === "cancer") setCancer(value);
        else if (name === "stage") setStage(value);
    }

    async function HandleSubmit() {
        if ((_.trim(name) && _.trim(username) && _.trim(password) && _.trim(confirmPassword) &&
            _.trim(location) && _.trim(age) && _.trim(weight) && _.trim(height) && _.trim(diseases) ) === "") {
            setChecked("* All the fields are necessary !");
            navigate("/register");
        } else if (password !== confirmPassword) setChecked("* Password do not match !");

        else if (cancer === "no" && stage !== "NA") setChecked("* Select cancer as yes to select stage !");

        else {

            let result = await fetch("http://localhost:5050/register", {
                method: "post",
                body: JSON.stringify({ name, username, password, location, age, weight, height, diseases, bloodgp, gender, cancer, stage }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            result = await result.json();
            setChecked(result.message)

            console.log(result);

            if (result.message) {
                navigate("/register");
            } else {
                localStorage.setItem("user", JSON.stringify(result));
                navigate("/");
            }
        }

    }

    return (
        <div className="registration-form">
            <div>
                <h3>Registration Form</h3>

                <input onChange={HandleChange} type="text" name="name" placeholder="Enter your Name" value={name} autoComplete="off" />
                <input onChange={HandleChange} type="email" name="username" placeholder="Email ID" value={username} autoComplete="off" />
                <input onChange={HandleChange} type="password" name="password" placeholder="Create Password" value={password} autoComplete="off" />
                <input onChange={HandleChange} type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} autoComplete="off" />

                <input onChange={HandleChange} type="text" name="location" placeholder="Enter your city" value={location} autoComplete="off" />
                <input onChange={HandleChange} type="text" name="age" placeholder="Age" value={age} autoComplete="off" />

                <div className="height-weight">
                    <input onChange={HandleChange} type="number" name="weight" placeholder="Weight (kg)" value={weight} autoComplete="off" />
                    <input onChange={HandleChange} type="number" name="height" placeholder="Height (cm)" value={height} autoComplete="off" />
                </div>

                <input onChange={HandleChange} type="text" name="diseases" placeholder="Enter your disease/s" value={diseases} autoComplete="off" />

                <div className="general-data">
                    <label for="BloodGroup">Blood Group:
                        <select onChange={HandleChange} name="bloodGroup">
                            <option value="A+" defaultValue={bloodgp} >A+</option>
                            <option value="B+" >B+</option>
                            <option value="AB+" >AB+</option>
                            <option value="O+" >0+</option>
                            <option value="A-" >A-</option>
                            <option value="B-" >B-</option>
                            <option value="AB-" >AB-</option>
                            <option value="O-" >0-</option>
                        </select>
                    </label>

                    <label for="gender">Gender:
                        <select onChange={HandleChange} name="gender">
                            <option value="male" defaultValue={gender} >Male</option>
                            <option value="female" >Female</option>
                        </select>
                    </label>
                </div>


                <div className="cancer-data">
                    <label for="cancer">Do you have cancer?
                        <select onChange={HandleChange} name="cancer">
                            <option value="no" defaultValue={cancer} >No</option>
                            <option value="yes" >Yes</option>
                        </select>
                    </label>

                    <label for="stage">Stage:
                        <select onChange={HandleChange} name="stage">
                            <option value="NA" defaultValue={stage} >NA</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                        </select>
                    </label>
                </div>

                <p>{checked}</p>

                <button onClick={HandleSubmit} type="submit">Submit</button>

            </div>
        </div>
    );
}



export default Registration;