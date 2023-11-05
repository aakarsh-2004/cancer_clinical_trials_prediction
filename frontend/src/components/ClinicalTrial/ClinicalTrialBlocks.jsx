import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

function ClinicalTrialBlocks(props) {
    return(
        <div className="trial-blocks">
            <p><FaAngleRight /> {props.name}</p>
            <p><span>Email: </span> {props.email}</p>
            <p><span>Contact: </span> {props.contact}</p>
            <p><span>Trials: </span> {props.trials}</p>
            <p><FaLocationDot /> {props.loc}</p>
        </div>
    )
}

export default ClinicalTrialBlocks;