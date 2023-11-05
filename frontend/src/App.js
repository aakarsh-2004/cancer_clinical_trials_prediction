import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header & Footer/Header"
import Footer from "./components/Header & Footer/Footer";
import Home from "./components/Home/Home";
import ClinicalTrial from "./components/ClinicalTrial/ClinicalTrial";
import Feedback from "./components/Feedback/Feedback";
import PrivateComponents from "./components/PrivateComponents";
import Login from "./components/Login & SignUp/Login";
import Registration from "./components/Register/Registration";
import "./App.css";

function App() {

    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route element={<PrivateComponents />} >
                        <Route path="/" element={<Home />} />
                        <Route path="/clinicaltrial" element={<ClinicalTrial />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/forum" element={""} />
                        <Route path="/profile" element={""} />
                    </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App;