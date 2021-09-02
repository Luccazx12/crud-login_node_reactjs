import React, { useState, useEffect } from "react";
import NavBar from '../../components/NavBar/index.js';
import { useParams, useHistory } from "react-router-dom";
import { cpfMask } from "../../components/CpfMask/index.js";
import backbutton from "../../images/backbutton.png"

import "./index.css";
import {
    Container,
    Row,
    Form,
    Button,
} from "react-bootstrap";


export default function App() {

    const { id } = useParams();

    const history = useHistory();

    const [user, setUser] = useState({
        records: []
    });

    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [username, setUsername] = useState("");
    const [cpf, setCpf] = useState("");
    const [departament, setDepartament] = useState("");
    const [gerencia, setGerencia] = useState("");
    const [editStatus, setEditStatus] = useState();

    useEffect(() => {
        fetchAllRecord();
        console.log(editStatus);
    }, []);

    useEffect(() => {
        regraGerencia();
    });

    const cpfMask = (e) => {
        setCpf(cpfMask(e.target.value))
    }

    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    //fetch all records with id
    const fetchAllRecord = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        if (id >= 1) {
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
                    setUsername(result.response[0].username)
                    setCpf(result.response[0].cpf)
                    setDepartament(result.response[0].departament)
                    setGerencia(result.response[0].gerencia)
                    setImgData("http://localhost:3002/" + result.response[0].image_user)
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }
    };
    const regraGerencia = () => {
        if (gerencia === 0) {
            setGerencia("não é gerente")
        }
        else if (gerencia === 1) {
            setGerencia("é gerente")
        }
    }

    // update record
    const updateRecord = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("http://localhost:3002/users/", {
            method: "POST",
            headers: { accessToken: sessionStorage.getItem("accessToken") }
        })
            .then((response) => response.json())
            .then((result) => {
                this.fetchAllRecord();
            })
            .catch((error) => console.log("error", error));
    };

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

    const editRecord = () => {
        setEditStatus(true)
        setUsername("")
        setCpf("")
        setDepartament("")
        setGerencia("")
    }

    const backButtonEdit = () => {
        setEditStatus(false)
        fetchAllRecord();
    }

    return (
        <div className="App">
            <NavBar></NavBar>
            <Container className="wrapper fadeinDown">
                {/* Insert Form */}
                <Row className="perfilrow">
                    {editStatus ?
                        <Form
                            className="formContent"
                            encType="multipart/form-data"
                            action="http://localhost:3002/login/"
                            method="POST"
                            id="formperfil"
                        >
                            <div className="divHeaderperfil">
                                <div className="divImgBack" onClick={backButtonEdit}>
                                    <img className='imgBack' src={backbutton}></img>
                                </div>

                                <input placeholder={username} />
                            </div>

                            <label for="photo-upload" className="custom-file-upload fas">
                                <div className="img-wrap img-upload" >
                                    <img className="imgphoto" alt="imagem de perfil" for="photo-upload" src={imgData} />
                                </div>
                                <input className='input-upload' id="photo-upload" type="file" onChange={onChangePicture} />
                            </label>
                            <p>CPF:<input placeholder={cpf} onChange={cpfMask} value={cpf} /></p>
                            <p>Departamento:<input placeholder={departament} /></p>
                            <p>Gerencia:<input placeholder={gerencia} /></p>
                            <div>
                                <Button
                                    className="button fadeIn fourth"
                                    // id="confirm-btn"
                                    onClick={updateRecord}
                                >
                                    Confirmar
                                </Button>
                            </div>
                        </Form> :
                        <Form
                            className="formContent"
                            encType="multipart/form-data"
                            action="http://localhost:3002/login/"
                            method="POST"
                            id="formperfil"
                        >


                            <div className="divHeaderperfil">
                                <div className="divImgBack" onClick={() => history.push('/gerencia')}>
                                    <img className='imgBack' src={backbutton}></img>
                                </div>

                                <h2 className="h2 fadeIn first"><span>{username}</span></h2>
                            </div>
                            
                            <div className="divimg-perfil">
                                <div>
                                    <img
                                        src={imgData}
                                        alt="Imagem dos Clientes"
                                        id="img-perfil"
                                    />
                                </div>
                            </div>
                            <div className="divphoto">
                                <input className="input-upload" id="profilePic" type="file" onChange={onChangePicture} />
                            </div>
                            <div className="img-wrap">
                                <img className="playerProfilePic_home_tile" id="img-perfil" alt="imagem do perfil" src={imgData} />
                            </div>


                            <p>CPF:<span>{cpf}</span></p>
                            <p>Departamento:<span>{departament}</span></p>
                            <p>Gerencia:<span>{gerencia}</span></p>
                            <div>
                                <Button
                                    className="button fadeIn fourth"
                                    id="edit-btn"
                                    onClick={editRecord}
                                >
                                    Editar
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="button fadeIn fourth"
                                    id="delete-btn"
                                    onClick={() => deleteRecord(id)}
                                >
                                    Apagar
                                </Button>
                            </div>

                        </Form>
                    }
                </Row>
            </Container>
        </div>
    );
}