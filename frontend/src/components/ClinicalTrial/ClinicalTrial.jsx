import React, { useEffect, useState } from "react";
import ClinicalTrialBlocks from "./ClinicalTrialBlocks";
import { BiCaretRight } from "react-icons/bi"
import "./ClinicalTrial.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

function ClinicalTrial() {

    const [recommended, setRecommended] = useState("");
    const [otherCenters, setOtherCenters] = useState("");

    useEffect(() => {

        async function getRecommmendedCenter() {
            let center = await fetch("http://localhost:5050/recommended-center", {
                method: "get"
            });

            center = await center.json();
            setRecommended(center);

            let others = await fetch("http://localhost:5050/other-centers", {
                method: "get"
            });

            others = await others.json();
            setOtherCenters(others);
            // console.log(others);
        }

        getRecommmendedCenter();

    }, [])

    for (let i = 0; i < otherCenters.length; i++) {
        console.log(otherCenters[i]);
    }

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

                {/* <ClinicalTrialBlocks
                    name="anant shree multispeciality hospital"
                    email="anant1452@gmail.com"
                    contact="7554262151"
                    trials="Breast Cancer"
                    loc="chandragupta marg chanakpuri, New Delhi"
                /><ClinicalTrialBlocks
                    name="anant shree multispeciality hospital"
                    email="anant1452@gmail.com"
                    contact="7554262151"
                    trials="Breast Cancer"
                    loc="chandragupta marg chanakpuri, New Delhi"
                /><ClinicalTrialBlocks
                    name="anant shree multispeciality hospital"
                    email="anant1452@gmail.com"
                    contact="7554262151"
                    trials="Breast Cancer"
                    loc="chandragupta marg chanakpuri, New Delhi"
                /><ClinicalTrialBlocks
                    name="anant shree multispeciality hospital"
                    email="anant1452@gmail.com"
                    contact="7554262151"
                    trials="Breast Cancer"
                    loc="chandragupta marg chanakpuri, New Delhi"
                /><ClinicalTrialBlocks
                    name="anant shree multispeciality hospital"
                    email="anant1452@gmail.com"
                    contact="7554262151"
                    trials="Breast Cancer"
                    loc="chandragupta marg chanakpuri, New Delhi"
                /><ClinicalTrialBlocks
                    name="anant shree multispeciality hospital"
                    email="anant1452@gmail.com"
                    contact="7554262151"
                    trials="Breast Cancer"
                    loc="chandragupta marg chanakpuri, New Delhi"
                /> */}
            </div>
        </div>
    )
}

export default ClinicalTrial;