import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [loginPage, setLoginPage] = useState({
        display: "flex"
    });
    const [forgotPage, setForgotPage] = useState({
        display: "none"
    });
    const [newPassField, setNewPassField] = useState({ display: "none" });
    const [nextBtn, setNextBtn] = useState({ display: "block" });
    const [submitForgotBtn, setSubmitForgotBtn] = useState({ display: "none" });

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) navigate("/");
    })

    function HandleChange(event) {
        const { value, name } = event.target;

        if (name === "username") setUserName(value);
        if (name === "password") setPassword(value);
        if (name === "newPassword") setNewPassword(value);
        if (name === "confirmNewPassword") setConfirmNewPassword(value);
    }

    async function handleSubmit() {
        if ((_.trim(username) && _.trim(password)) === "") {
            setChecked("* All the fields are necessary !");
            navigate("/login");
        } else {

            let result = await fetch("http://localhost:5050/login", {
                method: "post",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            result = await result.json();
            setChecked(result.message);

            if (result.message) {
                navigate("/login");
            } else {
                localStorage.setItem("user", JSON.stringify(result));
                navigate("/");
            }
        }
    }

    async function handleForgotPassword() {
        let result = await fetch("http://localhost:5050/find-user", {
            method: "post",
            body: JSON.stringify({ username }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        result = await result.json();

        if (result.message) {
            setNewPassField({ display: "block" });
            setNextBtn({ display: "none" });
            setSubmitForgotBtn({ display: "block" });
            setChecked("");

        } else {
            setChecked("* User not found !");
        }

    }

    async function handleSubmitForgot() {

        if ((_.trim(newPassword) && _.trim(confirmNewPassword)) === "") {
            setChecked("* All the fields are necessary !");
            navigate("/login");
        } else if (newPassword !== confirmNewPassword) setChecked("* Password do not match !");

        else {
            let result = await fetch("http://localhost:5050/forgot-password", {
                method: "post",
                body: JSON.stringify({ username, newPassword }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            result = await result.json();

            alert(result.message);
            navigate("/");
        }
    }

    function ToggleToForgot() {
        setChecked("");
        setLoginPage({ display: "none" });
        setForgotPage({ display: "flex" });
    }
    function ToggleToLogin() {
        setChecked("");
        setLoginPage({ display: "Flex" });
        setForgotPage({ display: "none" });
    }


    return (
        <div className="login-form">
            <div>
                <div style={loginPage}>

                    <h3>Login</h3>
                    <input onChange={HandleChange} type="email" name="username" placeholder="Email ID" autoComplete="off" value={username} />
                    <input onChange={HandleChange} type="password" name="password" placeholder="Password" value={password} />
                    <p>{checked}</p>
                    <p name="toForgot" className="forgot-pass-page" onClick={ToggleToForgot}>Forgot Password ?</p>


                    <button onClick={handleSubmit} type="button">Login</button>

                </div>
                <div style={forgotPage}>

                    <h3>Forgot Password</h3>
                    <input onChange={HandleChange} type="email" name="username" placeholder="Email ID" autoComplete="off" value={username} />

                    <input onChange={HandleChange} style={newPassField} type="password" name="newPassword" placeholder="Enter New Password" value={newPassword} />

                    <input onChange={HandleChange} style={newPassField} type="password" name="confirmNewPassword" placeholder="Confirm Password" value={confirmNewPassword} />

                    <p>{checked}</p>
                    <p onClick={ToggleToLogin} className="login-page">Back to login</p>

                    <button style={nextBtn} type="button" onClick={handleForgotPassword}>Next</button>

                    <button style={submitForgotBtn} type="button" onClick={handleSubmitForgot}>Submit</button>

                </div>
            </div>
        </div>
    )
}

export default Login;