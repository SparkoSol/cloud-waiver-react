import React, {useEffect} from 'react';
import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate, useParams} from "react-router-dom";

const GoogleAuth = () => {
    const {redirectUrl} = useParams()
    const navigate = useNavigate()
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
            if (tokenResponse){
                navigate("/login")
            }
        },
        redirect_uri:"https://techtrival.com"
    });
    useEffect(() => {
        login()
        // navigate(-1)
    }, []);
    return (
        <div>

        </div>
    );
};

export default GoogleAuth;
