import React, { useState } from "react";
import { BiCaretRight } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";

function QueAns(props) {

    const [paraStyle, setParaStyle] = useState({
        display: "none"
    });

    const [plus, setPlus] = useState({
        display: "block"
    });
    const [minus, setMinus] = useState({
        display: "none",
        fontSize: "33px"
    });

    function HandleClick() {
        if (paraStyle.display === "none") {
            setParaStyle({ display: "block" });
            setPlus({display: "none"});
            setMinus({display: "block", fontSize: "33px"});
        }
        else if (paraStyle.display === "block") {
            setParaStyle({ display: "none" });
            setPlus({display: "block"});
            setMinus({display: "none", fontSize: "33px"});
        }
    }

    return (
        <div className="que">
            <h4 onClick={HandleClick} >
                <BiCaretRight /> {props.question}
                <div>
                    <BsPlusCircle style={plus} />
                    <AiFillMinusCircle style={minus} />
                </div>
            </h4>
            <p style={paraStyle}>{props.answer}</p>
        </div>
    )
}

export default QueAns