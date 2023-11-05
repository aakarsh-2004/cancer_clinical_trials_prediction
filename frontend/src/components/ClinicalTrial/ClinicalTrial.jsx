import React, { useEffect, useState } from "react";
import ClinicalTrialBlocks from "./ClinicalTrialBlocks";
import { BiCaretRight } from "react-icons/bi"
import "./ClinicalTrial.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

function ClinicalTrial() {
    const [pred, setPred] = useState("");
    const [recommended, setRecommended] = useState("");
    const [otherCenters, setOtherCenters] = useState("");


    // Loading all the necessary details when the page is loaded
    useEffect(() => {
        async function recommendedCenter() {
            const user = localStorage.getItem("user");

            let result = await fetch("http://localhost:5050/center", {
                method: "post",
                body: (user),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            result = await result.json();

            console.log(result);

            setRecommended(result.recommended);
            setOtherCenters(result.other);
        }

        recommendedCenter();
    }, [])
    console.log(recommended);
    console.log(otherCenters);


    return (
        <div className="clinical-trial">
            <h3><BiCaretRight /> Recommended Center</h3>
            <div className="recommended-block">
                <div className="trial-blocks">
                    <p><FaAngleRight /> {recommended.name}</p>
                    <p><span>Email: </span> {recommended.email}</p>
                    <p><span>Contact: </span> {recommended.mobileNumber}</p>
                    <p><span>Trials: </span> {recommended.trials}</p>
                    <p><FaLocationDot /> {recommended.location}</p>
                </div>
            </div>

            <h3>Other Trial Centers Across India</h3>
            <div className="other-centers">
                {otherCenters ? otherCenters.map((o, index) => {
                    return (
                        <ClinicalTrialBlocks
                        key={index}
                        name={o.name}
                        email={o.email}
                        contact={o.mobileNumber}
                        trials={o.trials}
                        loc={o.location}
                    />
                    )
                }) : ""}


            </div>
        </div>
    )
}

export default ClinicalTrial;