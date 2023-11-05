import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { BiPlusMedical } from "react-icons/bi";
import BeforeLogin from "../Login & SignUp/BeforeLogin";
import AfterLogin from "../Login & SignUp/AfterLogin";
import "./Header.css";

function Header() {
    // getting the session from the localStorage
    let auth = localStorage.getItem("user");

    const navigate = useNavigate();

    // Handling the logout functionality
    const HandleLogout = () => {
        localStorage.clear();
        auth = localStorage.getItem("user");
        navigate("/login");
    }

    return (
        <header>
            <div>
                <BiPlusMedical />
                <p>CliniQuest</p>
            </div>
            { (auth) ?
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/clinicaltrial">Clinical Trial</Link></li>
                    <li><Link to="/feedback">Feedback</Link></li>
                    <li><Link to="/forum">Forum</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={HandleLogout} to="/">Log Out</Link></li>
                </ul>
                :
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            }

        </header>
    );
}

export default Header