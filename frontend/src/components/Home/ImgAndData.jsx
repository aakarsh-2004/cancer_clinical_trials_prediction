import React from "react";
import { useNavigate } from "react-router-dom";
import QueAns from "./QueAns";
import { FcFaq } from "react-icons/fc"
import { BiCaretRight } from "react-icons/bi";
import "./Home.css";

// const img = "https://media.gettyimages.com/id/79334347/photo/scientists-conducting-an-experiment.jpg?s=612x612&w=0&k=20&c=d5dA54BIC5PbOpLJDsdNFrQZ5zJ9IB5e3viJnuT_3ys=";


function ImgAndData() {

    const navigate = useNavigate()

    function DirectToClinicalTrial() {
        navigate("/clinicaltrial");
    }
    return (
        <section className="upper">

            <div>
                <div>
                    <h1>WHO resolution on clinical trials</h1>
                    {/* <a href="/clinicaltrial">Your Clinical Trial</a> */}
                    <p onClick={DirectToClinicalTrial} >Your Clinical Trial</p>
                </div>
                <img src="https://img.freepik.com/free-vector/hand-drawn-national-doctor-s-day-illustration-with-medics-essentials_23-2149447532.jpg?size=626&ext=jpg" alt="" />
            </div>
            <div>
                <div>
                    <h4><BiCaretRight />
                        What is a clinical trial?
                    </h4>
                    <p>
                        For the purposes of registration, a clinical trial is any research study that prospectively assigns human participants or groups of humans to one or more health-related interventions to evaluate the effects on health outcomes. Clinical trials may also be referred to as interventional trials. Interventions include but are not restricted to drugs, cells and other biological products, surgical procedures, radiologic procedures, devices, behavioural treatments, process-of-care changes, preventive care, etc. This definition includes Phase I to Phase IV trials.
                    </p>
                </div>

                <div>
                    <h4><BiCaretRight />
                        What is trial registration?
                    </h4>
                    <p>
                        WHO regards trial registration as the publication of an  internationally-agreed set of information about the design, conduct and administration of clinical trials. These details are published on a publicly-accessible website managed by a registry conforming to WHO standards.
                    </p>
                </div>
            </div>

            <h2><FcFaq /> Frequently Asked Questions(FAQs)</h2>

            <div className="faqs">
                <QueAns
                    question="Which trials should be registered?"
                    answer="All clinical trials meeting the above definition should be registered. Thus, early and late trials, trials of marketed or non-marketed products, randomized or non-randomized trials -- all should be registered."
                />
                <QueAns
                    question="What is the difference between clinical trials register and a clinical trial registry?"
                    answer="A clinical trials register is the formal record of an internationally agreed minimum amount of information about a clinical trial. This record is usually stored in and managed using a database. A clinical trials registry is the entity that houses the register, and is responsible for ensuring the completeness and accuracy of the information it contains, and that the registered information is used to inform health care decision making. A clinical trials registry is more than its database."
                />
                <QueAns
                    question="When should trials be registered?"
                    answer="Trials should be registered before the first participant is recruited."
                />
                <QueAns
                    question="What information needs to be registered?"
                    answer="The minimum information that must be registered is specified in the WHO Trial Registration Data Set. Individual registers may request more information than this (e.g., study sites)."
                />
                <QueAns
                    question="How many times should a trial be registered?"
                    answer="To meet WHO requirements for transparency and publication it is only necessary for your trial to be to registered once, in either a Primary Registry or an ICMJE approved registry."
                />
                <QueAns
                    question="What should I do if I want to take part in clinical trial?"
                    answer="If you are patient or family member and you find a trial that is of interest we suggest that you print out the information and discuss it with your health care provider. They should be able to advise you on the appropriate course of action.

                    If you are a health care provider or researcher you should approach one of the contact persons listed in the registered record."
                />
                <QueAns
                    question="What is a Primary Registory?"
                    answer="A Primary Registry in the WHO Registry Network is a clinical trial registry with at least a national remit that meets WHO Registry Criteria for content, quality and validity, accessibility, unique identification, technical capacity and governance and administration. Primary Registries have the support of the ICMJE."
                />
            </div>

        </section>
    )
}

export default ImgAndData