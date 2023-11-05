import React, { useEffect } from "react";
import ImgAndData from "./ImgAndData";
import ContactUs from "./ContactUs";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (!auth) navigate("/login");
    })
    return (
        <div className="home">
            <ImgAndData />
            <ContactUs />
        </div>
    )
}

export default Home;