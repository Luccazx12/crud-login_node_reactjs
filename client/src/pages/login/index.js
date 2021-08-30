import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./index.css";
import {
    Container,
    Row,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
  

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

 const login = () => {
    Axios.post("http://localhost:3002/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

    return (
        <div className="App">
            <Container className="wrapper fadeinDown">
                {/* Insert Form */}
                <Row>
                    <Form
                        className="formContent"
                        encType="multipart/form-data"
                        action="http://localhost:3002/login/"
                        method="POST"
                        id="form"
                    >
                        <h2 className="h2 fadeIn first">Login</h2>
                        {/* <FormGroup className="fadeIn first">
                <FormLabel className="formlabel">ID</FormLabel>
                <FormControl type="text" name="id" placeholder="Insira o ID" onChange={this.handleChange} value={this.state.id} />
              </FormGroup> */}

                        <FormGroup className="fadeIn second">
                            <FormLabel className="formlabel">Usuário</FormLabel>
                            <FormControl
                                required
                                type="text"
                                onChange={(e) => {
                                  setUsername(e.target.value);
                                }}
                                id="username"
                                name="username"
                                placeholder="Insira o usuário"

                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel className="formlabel">Senha</FormLabel>
                            <FormControl
                                required
                                type="password"
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                                id="password"
                                name="password"
                                placeholder="Insira a senha"
                            />
                        </FormGroup>
                        <div>
                            <Button
                                className="button fadeIn fourth"
                                id="create-btn"
                                onClick={login}
                            >
                                Logar
                            </Button>
                        </div>
                    </Form>
                </Row>
            </Container>
            <h1>{loginStatus}</h1>
        </div>
    );
}
