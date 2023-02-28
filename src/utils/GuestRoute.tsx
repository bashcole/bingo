import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import {fetchLocalStorage} from "@/lib/utils";

const GuestRoute = ({children}: { children: any }) => {
    let location = useLocation();
    const gameState = fetchLocalStorage("state", null);
    if (gameState?.user_id === undefined) {
        return children;
    }

    return <Navigate to="/" state={{from: location}} replace/>

};

export default GuestRoute;