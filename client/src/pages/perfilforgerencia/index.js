import React, { useState, useEffect } from "react";
import NavBar from '../../components/NavBar/index.js';
import { useParams } from "react-router-dom";
// import Card from '../../components/profileCard/';
// import axios from 'axios';

import "./index.css";
import {
    Container,
    Row,
    Form,
    Button,
} from "react-bootstrap";


export default function App() {

    const { id } = useParams();

    const [user, setUser] = useState({
        records: []
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllRecord = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:3002/users/id/" + id, {
            method: "GET",
            headers: headers,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("result", result);
                setUser({
                    records: result.response,
                });
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    useEffect(() => {
        fetchAllRecord();
    }, []);


    return (
        <div className="App">
            <NavBar><div>{user.username}</div></NavBar>
            <Container className="wrapper fadeinDown">
                {/* Insert Form */}
                <Row id="homerow">
                    <div>{id}</div>
                    {isLoading ? <div>Loading...</div> :
                        <div>
                            {user.records.map((record) => {
                                return (
                                    <Form
                                        className="formContent"
                                        encType="multipart/form-data"
                                        action="http://localhost:3002/login/"
                                        method="POST"
                                        id="form"
                                    >
                                        <h2 className="h2 fadeIn first"><span>{record.username}</span></h2>
                                        <div className="divimg-perfil">
                                            <a
                                                href={
                                                    "http://localhost:3002/" + record.image_user
                                                }
                                                target="_newblank"
                                            >
                                                <img
                                                    src={
                                                        "http://localhost:3002/" +
                                                        record.image_user
                                                    }
                                                    alt="Imagem dos Clientes"
                                                    id="img-perfil"
                                                />
                                            </a>
                                        </div>
                                        <p>CPF:<span>{record.cpf}</span></p>
                                        <p>Departamento:<span>{record.departament}</span></p>
                                        <p>Gerencia:<span>{record.gerencia}</span></p>
                                        <div>
                                            <Button
                                                className="button fadeIn fourth"
                                                id="edit-btn"
                                            >
                                                Editar
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                className="button fadeIn fourth"
                                                id="delete-btn"
                                            >
                                                Apagar
                                            </Button>
                                        </div>
                                    </Form>
                                )
                            })}
                        </div>
                    }
                </Row>
            </Container>
        </div>
    );
}