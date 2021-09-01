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

    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [username, setUsername] = useState("");
    const [cpf, setCpf] = useState("");
    const [departament, setDepartament] = useState("");
    const [gerencia, setGerencia] = useState("");

    useEffect(() => {
        fetchAllRecord();
    }, []);

    useEffect(() => {
        regraGerencia();
    });
    
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
        if(gerencia === 0) {
            setGerencia("não é gerente")
        }
        else if (gerencia === 1){
            setGerencia("é gerente")
        }
    }

    // update record
    const updateRecord = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var body = JSON.stringify({
            id: this.state.id,
            username: this.state.username,
            password: this.state.password,
            cpf: this.state.cpf,
            selected: this.state.selected,
            data: this.state.data,
        });

        fetch("http://localhost:3002/users/", {
            method: "PUT",
            headers: myHeaders,
            body: body,
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    showAlert: true,
                    alertMsg: result.response,
                    alertType: "sucess",
                    update: false,
                    id: "",
                    username: "",
                    password: "",
                    cpf: "",
                    selected: "",
                    data: ""
                });
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
                    this.setState({
                        showAlert: true,
                        alertMsg: result.response,
                        alertType: "danger",
                    });
                    this.fetchAllRecord();
                })
                .catch((error) => console.log("error", error));
        }
    };

    //delete all records
    const deleteRecords = () => {
        var confirm = window.prompt(
            'Tem certeza que deseja apagar todos os registros? Digite "SIM" para confirmar'
        );
        if (confirm === "SIM" || confirm === "Sim" || confirm === "sim") {
            fetch("http://localhost:3002/users/", {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then((result) => {
                    this.setState({
                        showAlert: true,
                        alertMsg: result.response,
                        alertType: "danger",
                    });
                    this.fetchAllRecord();
                })
                .catch((error) => console.log("error", error));
        }
    };

    return (
        <div className="App">
            <NavBar><div>{user.username}</div></NavBar>
            <Container className="wrapper fadeinDown">
                {/* Insert Form */}
                <Row id="perfilrow">
                    <Form
                        className="formContent"
                        encType="multipart/form-data"
                        action="http://localhost:3002/login/"
                        method="POST"
                        id="formperfil"
                    >
                        <h2 className="h2 fadeIn first"><span>{username}</span></h2>
                        {/* <div className="divimg-perfil">
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
                                </div> */}
                        {/* <div className="divphoto">
                            <input className= "input-upload" id="profilePic" type="file" onChange={onChangePicture} />
                        </div>
                        <div className="img-wrap">
                            <img className="playerProfilePic_home_tile" id="img-perfil" alt="imagem do perfil" src={imgData} />
                        </div> */}
                        <label for="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <img className="imgphoto" alt ="imagem de perfil" for="photo-upload" src={imgData}/>
        </div>
        <input className='input-upload' id="photo-upload" type="file" onChange={onChangePicture}/> 
      </label>

                        
                        <p>CPF:<span>{cpf}</span></p>
                        <p>Departamento:<span>{departament}</span></p>
                        <p>Gerencia:<span>{gerencia}</span></p>
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
                </Row>
            </Container>
        </div>
    );
}