import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import {fetchLocalStorage} from "@/lib/utils";

const ProtectedRoute = ({children}: { children: any }) => {
    let location = useLocation();
    const gameState = fetchLocalStorage("state", null);
    if (gameState?.user_id === undefined) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
    return children

};

export default ProtectedRoute;