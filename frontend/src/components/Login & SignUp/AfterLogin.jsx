import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AfterLogin() {

    const navigate = useNavigate();

    function HandleLogout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/clinicaltrial">Clinical Trial</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={HandleLogout} to="/">Log Out</Link></li>
        </ul>
    )
}

export default AfterLogin;