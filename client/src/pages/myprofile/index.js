import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import backbutton from "../../images/backbutton.png";
import axios from 'axios';
import {
    Container,
    Row,
    Button,
} from "react-bootstrap";


export default function App() {

    const history = useHistory();

    const [imgData, setImgData] = useState(null);
    // eslint-disable-next-line
    const [username, setUsername] = useState("");
    // eslint-disable-next-line
    const [cpf, setCpf] = useState("");
    // eslint-disable-next-line
    const [departament, setDepartament] = useState("");
    // eslint-disable-next-line
    const [gerencia, setGerencia] = useState("");

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
        gerencia: 0
    });

    useEffect(() => {
        axios
        .get("http://localhost:3002/auth", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        .then((response) => {
            console.log(response)
            if (response.data.error) {
                setAuthState({ ...authState, status: false });
            } else {
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    gerencia: response.data.gerencia,
                    status: true,
                });
                axios
                .get("http://localhost:3002/users/" + response.data.username, {
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
            }
        });
// eslint-disable-next-line
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
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
}