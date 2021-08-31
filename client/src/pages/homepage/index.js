import React from "react";
// import Axios from "axios";
import NavBar from '../../components/NavBar/index.js';
import Select from "../../components/Select/index.js";

import "./index.css";
import {
    Container,
    Row,
    Form,
    // FormGroup,
    // FormControl,
    // FormLabel,
    Button,
} from "react-bootstrap";
  

export default function App() {
  
   return (
        <div className="App">
            <NavBar />
            <Container className="wrapper fadeinDown">
                {/* Insert Form */}
                <Row id="homerow">
                    <Form
                        className="formContent"
                        encType="multipart/form-data"
                        action="http://localhost:3002/login/"
                        method="POST"
                        id="form"
                    >
                        <h2 className="h2 fadeIn first">Solicitar reprografia</h2>
                        <div className="selects">
                        <Select></Select>

                        <Select></Select>

                        <Select></Select>

                        <Select></Select>
                        </div>
                        <div>
                            <Button
                                className="button fadeIn fourth"
                                id="create-btn"
                            >
                                Solicitar
                            </Button>
                        </div>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}
