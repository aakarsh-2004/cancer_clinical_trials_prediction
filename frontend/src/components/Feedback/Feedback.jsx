import React from "react";
import { MdAlternateEmail, MdPermIdentity } from "react-icons/md";
import {IoFingerPrintOutline} from "react-icons/io5"
import "./Feedback.css";

function Feedback() {
    return (
        <div className="feedback">
            <div>
                <h3>Feedback</h3>

                <div>
                    <MdPermIdentity />
                    <input type="text" name="name" placeholder="Name" autoComplete="off" />
                </div>

                <div>
                    <IoFingerPrintOutline />
                    <input type="text" name="id" placeholder="Unique ID" autoComplete="off" />
                </div>

                <div>
                    <MdAlternateEmail />
                    <input type="email" name="email" placeholder="Email ID" autoComplete="off" />
                </div>

                <div>
                    <p>Type of feedback : </p>
                    <select name="type">
                        <option value="suggestion" defaultValue>Suggestion</option>
                        <option value="complaint">Complaint</option>
                    </select>
                </div>

                <textarea name="content" placeholder="Explain your consent" />

                <button>Submit</button>
            </div>
        </div>
    )
}

export default Feedback;