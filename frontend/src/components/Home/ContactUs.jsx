import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import "./ContactUs.css"

function ContactUs() {
    return (
        <div>
            {/* <section>
                <div>Name:</div>
                <div>Unique Id:</div>
                <div>Age:</div>
                <div>Height:</div>
                <div>Weight:</div>
                <div>Location:</div>
                <div>Blood:</div>
                <div>Disease:</div>
                <div>Stage:</div>
                <div>Cancer:</div>
                <div>Gender:</div>
            </section> */}

            <section className="contact-us">
                <div>
                    <h3>Contact Us</h3>
                    <p>Email: <a href="mailto:abhimishrahere@gmail.com">abhimishrahere@gmail.com</a></p>

                    <p>Contact: <a href="tel:+91 XXXXX XXXXX">+91 XXXXX XXXXX</a></p>

                    <p><FaLocationDot /> Kalchuri Nagar, Raisen Road, Bhopal (M.P.)</p>

                </div>

                <div>
                    <h3>Get in touch</h3>
                    <input type="text" placeholder="Enter your Name" />
                    <input type="email" placeholder="Enter your Email" />
                    <button type="submit">Submit</button>
                </div>

            </section>
        </div>
    )
}

export default ContactUs