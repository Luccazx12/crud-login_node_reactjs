import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import backbutton from "../../images/backbutton.png";
import axios from 'axios';
import {
    Container,
    Row,
    Button,
} from "react-bootstrap";
import "./index.css";


export default function App() {

    const { id } = useParams();

    const history = useHistory();

    // const [user, setUser] = useState({
    //     records: []
    // });

    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [username, setUsername] = useState("");
    const [cpf, setCpf] = useState("");
    const [departament, setDepartament] = useState("");
    const [gerencia, setGerencia] = useState("");

    useEffect(() => {
        regraGerencia();
    });

    const regraGerencia = () => {
        if (gerencia === 0) {
            setGerencia("não é gerente")
        }
        else if (gerencia === 1) {
            setGerencia("é gerente")
        }
    }

    //delete record
    const deleteRecord = (id) => {
        var confirm = window.confirm(
            "Tem certeza que deseja apagar esse registro?"
        );
        if (confirm === true) {
            fetch("http://localhost:3002/users/id/" + id, {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then((result) => {
                    history.push('/gerencia')
                })
                .catch((error) => console.log("error", error));
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:3002/users/id/" + id, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                console.log(response)
                setUsername(response.data.response[0].username)
                setCpf(response.data.response[0].cpf)
                setDepartament(response.data.response[0].departament)
                setGerencia(response.data.response[0].gerencia)
                setImgData("http://localhost:3002/" + response.data.response[0].image_user)
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, []);

    return (
        <div className="App">
            <Container className="wrapper fadeinDown">
                {/* Insert Form */}
                <Row className="perfilrow">
                    <div className="formContent" id="formperfil">
                        <div className="divHeaderperfil">
                            <div className="divImgBack" onClick={() => history.push('/gerencia')}>
                                <img className='imgBack' src={backbutton} alt="Botão deimgBack"></img>
                            </div>
                            <h2 className="fadeIn first"><span id="h2">{username}</span></h2>
                        </div>

                        <div className="divimg-perfil fadeIn second">
                            <div className="img-wrap" >
                                <img id="imgperfil-firstpage" className="imgperfil" alt="imagem de perfil" htmlFor="photo-upload" src={imgData} />
                            </div>
                        </div>
                        <div className="fadeIn third">
                            <p>CPF:<span>{cpf}</span></p>
                            <p>Departamento:<span>{departament}</span></p>
                            <p>Gerencia:<span>{gerencia}</span></p>
                        </div>
                        <div>
                            <Button
                                className="button fadeIn fourth"
                                id="edit-btn"
                                onClick={() => history.push(`${id}/edit`)}
                            >
                                Editar
                            </Button>
                            <Button
                                className="button fadeIn fourth"
                                id="delete-btn"
                                onClick={() => deleteRecord(id)}
                            >
                                Apagar
                            </Button>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
}