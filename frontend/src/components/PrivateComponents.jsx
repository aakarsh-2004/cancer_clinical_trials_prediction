import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateComponents() {
    const auth = localStorage.getItem("user");
    // This means if the session is there we send user directly to the website but if the user logouts or if the session is ended he/she may might need to login again
    return auth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateComponents;