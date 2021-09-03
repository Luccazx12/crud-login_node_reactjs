import React, { useState, useEffect } from "react";

import "./index.css";
import {
    Container,
    Row,
    Form,
    Button,
} from "react-bootstrap";
// import { AuthContext } from "../../helpers/AuthContext";


export default function App() {

    const [mensagem, setMensagem] = useState();
    // const { authState } = useContext(AuthContext);

    const fetchteste = () => {
        fetch("http://localhost:3002/users/", {
            method: "GET",
            headers: { accessToken: localStorage.getItem("accessToken") }
        },
        )
            .then((response) => response.json())
            .then((result) => {
                console.log("result", result);
            })
            .catch((error) => {
                setMensagem("Você não está logado!")
                console.log("error", error);
            });
        if (!localStorage.getItem("accessToken")) {
            setMensagem("Você não está logado!")
        }
        else {
            setMensagem("Reprografia solicitada com sucesso!")
        }
    }

    return (
        <div className="App">
            <Container className="wrapper fadeinDown">
                {/* Insert Form */}
                <Row id="homerow">
                    <Form
                        className="formContent"
                        encType="multipart/form-data"
                        action="http://localhost:3002/login/"
                        method="POST"
                        id="form"
                    >
                        <h2 className="h2 fadeIn first">Solicitar reprografia</h2>
                        <div>
                            <Button
                                onClick={fetchteste}
                                className="button fadeIn fourth"
                                id="create-btn"
                            >
                                Solicitar
                            </Button>
                        </div>
                        <div>
                            <span>{mensagem}</span>
                        </div>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}
