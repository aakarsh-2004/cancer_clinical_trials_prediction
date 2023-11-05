import React from "react";
import "./Header.css";

const currentDate = new Date();
const year = currentDate.getFullYear();

function Footer(){
    return(
        <footer>
            <p>Copyright &copy; {year} </p>
        </footer>
    )
}

export default Footer;