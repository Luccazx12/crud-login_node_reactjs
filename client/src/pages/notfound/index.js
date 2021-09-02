import React from 'react';
import NavBar from '../../components/NavBar/index.js';
import { useHistory } from "react-router";
import "./index.css"

export default function App () {

    const history = useHistory();

    const gotoHome = () => {
        history.push('/')
    }

    return (
        <>
        <NavBar />
        <div className="div404">
            <h1 id="h1404">ERROR 404 - NOT FOUND</h1>
        </div>
            <div className="div404">
            <p id="goToHome" onClick={gotoHome}>Clique aqui para voltar para a página inicial</p>
            </div>
        </>
    )
}