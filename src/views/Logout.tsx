import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/")
        localStorage.removeItem('state');
    }, [])

    return <></>

};

export default Logout;