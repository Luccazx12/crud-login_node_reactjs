import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { cpfMask } from "../../components/CpfMask/index.js";
import Axios from 'axios';
import backbutton from "../../images/backbutton.png";
import {
    Container,
    Row,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import Select from "../../components/Select/index.js";
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
    const [password, setPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [departament, setDepartament] = useState("");
    const [gerencia, setGerencia] = useState("");
    const [editStatus, setEditStatus] = useState(false);

    useEffect(() => {
        console.log(editStatus);
    }, []);

    const cpfMasked = (e) => {
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

    // update record
    const updateRecords = (id) => {
        Axios.post("http://localhost:3002/users/id" + id, {
            username: username,
            password: password,
            cpf: cpf,
            gerencia: gerencia,
            departament: departament,
            image_user: imgData
        })
            .then((response) => {
                history.push(`/perfil/${id + 1}`)

                console.log(response)
                if (response.data.error) {
                    setEditStatus(false)
                    alert(response.data.error)
                }
                else {

                }
            })
            .then((result) => {
                history.push('/gerencia')
            })
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

    return (
        <div className="App">
            <Container className="wrapper fadeinDown">
                {/* Insert Form */}
                <Row className="perfilrow">
                    <Form
                        className="formContent"
                        encType="multipart/form-data"
                        action="http://localhost:3002/users/id/"
                        method="POST"
                        id="formperfil"
                    >
                        <div className="divHeaderperfil">
                            <div className="divImgBack" onClick={() => history.push('/gerencia')}>
                                <img className='imgBack' src={backbutton}></img>
                            </div>

                            <FormGroup className="fadeIn second">
                                <FormLabel className="formlabel">Usuário</FormLabel>
                                <FormControl
                                    required
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder={username}
                                />
                            </FormGroup>
                        </div>



                        <label htmlFor="photo-upload" className="custom-file-upload fas">
                            <div className="img-wrap img-upload" >
                                <img className="imgphoto" alt="imagem de perfil" htmlFor="photo-upload" src={imgData} />
                            </div>
                            <input className='input-upload' id="photo-upload" type="file" onChange={onChangePicture} />
                        </label>


                        <FormGroup className="fadeIn second">
                            <FormLabel className="formlabel">Senha</FormLabel>
                            <FormControl
                                required
                                type="password"
                                id="password"
                                name="password"
                                placeholder={password}
                            />
                        </FormGroup>

                        <FormGroup className="fadeIn second" id="lastform">
                            <FormLabel className="formlabel">CPF</FormLabel>
                            <FormControl
                                minLength="14"
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder={cpf}
                            />
                        </FormGroup>
                        <Select />
                        <Button
                            className="button fadeIn fourth"
                            // id="confirm-btn"
                            onClick={() => updateRecords(id)}
                        >
                            Confirmar
                        </Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}