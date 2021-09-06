import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";

export default function App() {
    
    // const { setAuthState } = useContext(AuthContext);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:3002/users", {
    //             headers: {
    //                 accessToken: localStorage.getItem("accessToken"),
    //             },
    //         })
    //         .then((response) => {
    //             console.log(response)
    //             if (response.data.error) {
    //                 setAuthState({ ...authState, status: false });
    //             } else {
    //                 setAuthState({
    //                     username: response.data.username,
    //                     id: response.data.id,
    //                     gerencia: response.data.gerencia,
    //                     status: true,
    //                 });
    //             }
    //         });
    // },[]);





    return (
        <>
        lbn gay
        </>
    )
}