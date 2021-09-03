import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from "../../helpers/AuthContext";

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


export default function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const { setAuthState } = useContext(AuthContext);

  const history = useHistory();

  const login = () => {
    Axios.post("http://localhost:3002/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error)
      }
      else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push('/')
      }
    });
  };

  return (
    <div className="App">
      <Container className="wrapper fadeinDown">
        {/* Insert Form */}
        <Row className="rowlogin">
          <Form
            className="formContent"
            encType="multipart/form-data"
            action="http://localhost:3002/login/"
            method="POST"
            id="formlogin"
          >
            <h2 className="h2 fadeIn first">Login</h2>
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

            <FormGroup className="fadeIn second">
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
    </div>
  );
}
