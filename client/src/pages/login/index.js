import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../helpers/AuthContext";
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Col,
  FormCheck
} from "react-bootstrap";
import axios from "axios";
import "./index.css";

export default function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthState } = useContext(AuthContext);

  const history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3002/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error)
      }
      else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          gerencia: response.data.gerencia,
          status: true,
        });
        history.push('/')
        // window.location.reload();
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    login();
  }

  return (
    <div className="App">
      <Container className="wrapper fadeinDown">
        {/* Insert Form */}
        <Row className="rowlogin">
          <Form
            onSubmit={onSubmit}
            className="formContent"
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
             <Form.Check type="checkbox" id="autoSizingCheck2"  size ="sm" label="Remember me" />
             <p onClick={() => history.push(`/resetar-senha`)}>Esqueci a senha!</p>
             </div>

             <div>
              <Button
                type="submit"
                className="button fadeIn fourth"
                id="create-btn"
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
