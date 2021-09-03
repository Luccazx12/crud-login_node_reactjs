import React from 'react';
import NavBar from '../../components/NavBar/index.js';
import { useHistory } from "react-router";
import { useEffect } from 'react';
import "./index.css"

export default function App() {

    const history = useHistory();

    const gotoHome = () => {
        history.push('/')
    }

    useEffect(() => {
        // history.push('/')
    });

    return (
        <>
            <NavBar />
            <div className="principalnotfound">
                <h2 >Esta Página não está disponível</h2>
                <h3 >O link que você seguiu pode estar quebrado ou a página pode ter sido removida.</h3>
            </div>
                <div className="divimgnotfound">
                <img className="imgnotfound" src="http://cdn.sayba.com.br.s3-sa-east-1.amazonaws.com/image/233-faustao_wJudPwBIZXAH7jS.jpg" alt="" width="282" height="250" />
                </div>
                <div className="div404">
                <p id="goToHome" onClick={gotoHome}>Clique aqui para voltar para a página inicial</p>
                </div>
        </>

    )
}