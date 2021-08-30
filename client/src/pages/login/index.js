import React, { useState } from "react";
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

function App() {

    const [usuarioreg] = useState('')
    const [senhareg] = useState('')

    return (
        <div className="App">
            <Container className="wrapper fadeinDown">
                {/* Insert Form */}
                <Row>
                    <Form
                        className="formContent"
                        encType="multipart/form-data"
                        action="http://localhost:3002/users/"
                        method="POST"
                        id="form"
                    >
                        <h2 className="h2 fadeIn first">Login</h2>
                        {/* <FormGroup className="fadeIn first">
                <FormLabel className="formlabel">ID</FormLabel>
                <FormControl type="text" name="id" placeholder="Insira o ID" onChange={this.handleChange} value={this.state.id} />
              </FormGroup> */}

                        <FormGroup className="fadeIn second">
                            <FormLabel className="formlabel">Usuário ou CPF</FormLabel>
                            <FormControl
                                required
                                type="text"
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
                                id="password"
                                name="password"
                                placeholder="Insira a senha"
                            />
                        </FormGroup>
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

export default App;
