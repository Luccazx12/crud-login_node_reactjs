import React from "react";
import "./index.css";
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Table,
} from "react-bootstrap";
import { cpfMask } from "../../components/CpfMask/index.js";
import Select from "../../components/Select/index.js";
import NavBar from '../../components/NavBar/index.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      cpf: "",
      selected: "",
      data: "",
      status: "",
      records: [],
      alertMsg: "",
      alertType: "sucess",
      update: false,
      showAlert: false,
      loading: false,
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  cpfMask = (evt) => {
    this.setState({
      cpf: cpfMask(evt.target.value)
    })
  }

  handleFileUpload = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  componentDidMount() {
    this.fetchAllRecord();
  }



  // fetch all Records
  fetchAllRecord = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:3002/users/", {
      method: "GET",
      // headers: { accessToken: sessionStorage.getItem("accessToken") },
      headers: { accessToken: sessionStorage.getItem("accessToken"), headers }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          this.setState({
            loading: true,
            status: "Usuário não logado"
          })
        }
        else if (result.response.length < 1) {
          this.setState({
            loading: true,
            status: "Sem registros..."
          })
        }
        else {
          this.setState({
            loading: false
          })
        }
        console.log("result", result);
        this.setState({
          records: result.response,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //delete all records
  deleteRecords = () => {
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

  //view sigle data to edit
  perfilById = (id) => {
    var headers = new Headers();
    fetch("http://localhost:3002/users/id/" + id, {
      method: "GET",
      headers: { accessToken: sessionStorage.getItem("accessToken"), headers }
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.props.history.push("/perfil/" + id);
      })
      .catch((error) => console.log("error", error));
  };


  render() {
    return (
      <div className="App">
        <NavBar />
        <Container className="wrapper fadeinDown">
          {this.state.showAlert === true ? (
            <Alert
              variant={this.state.alertType}
              onClose={() => {
                this.setState({
                  showAlert: false,
                });
              }}
              dismissible
            >
              <Alert.Heading>{this.state.alertMsg}</Alert.Heading>
            </Alert>
          ) : null}
          {/* Insert Form */}
          <Row id="rowgerencia" className="principalrow">
            <Form
              className="formContent"
              encType="multipart/form-data"
              action="http://localhost:3002/users/"
              method="POST"
              id="form"
            >
              <h2 className="h2 fadeIn first">Registrar Usuários</h2>
              {/* <FormGroup className="fadeIn first">
                <FormLabel className="formlabel">ID</FormLabel>
                <FormControl type="text" name="id" placeholder="Insira o ID" onChange={this.handleChange} value={this.state.id} />
              </FormGroup> */}

              <FormGroup className="fadeIn second">
                <FormLabel className="formlabel">Usuário</FormLabel>
                <FormControl
                  required
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Insira o usuário"
                  onChange={this.handleChange}
                  value={this.state.username}
                />
              </FormGroup>

              <FormGroup className="fadeIn second">
                <FormLabel className="formlabel">Senha</FormLabel>
                <FormControl
                  required
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Insira a senha"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </FormGroup>

              <FormGroup className="fadeIn second" id="lastform">
                <FormLabel className="formlabel">CPF</FormLabel>
                <FormControl
                  required
                  minLength="14"
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="Insira o CPF"
                  onChange={this.cpfMask}
                  value={this.state.cpf}

                />
              </FormGroup>
              {/* <input
                required
                type="file"
                className="fadeIn fourth"
                id="imagem_cliente"
                name="imagem_cliente"
              /> */}



              <Form.Group className="mb-3">
                <Form.Control size="sm"
                  accept="image/*"
                  type="file"
                  className="fadeIn fourth"
                  id="imagem_cliente"
                  name="imagem_cliente"
                  onChange={this.handleFileUpload}
                />
              </Form.Group>

              <Select />

              <div>
                  <>
                    {this.state.loading === true ? (
                      <>
                        <Button id="buttonloading" className="fadeIn fourth" onClick={() => this.props.history.push('/login')}>Login</Button> <br />
                        <span className="fadeIn fourth">Faça Login para poder registrar um usuário</span>
                      </>
                    ) : (
                      <>
                       <Button
                    onClick={this.fetchAllRecord}
                    className="button fadeIn fourth"
                    id="edit-btn"
                  >
                    Ler
                  </Button>

                        <Button
                          type="submit"
                          // onClick={() => { this.submitForm(); setTimeout(this.fetchAllRecord(), 100000);}}
                          className="button fadeIn fourth"
                          id="create-btn"
                        >
                          Registrar
                        </Button>

                        <Button
                    onClick={this.deleteRecords}
                    className="button fadeIn fourth"
                    id="delete-btn"
                  >
                    Deletar Todos
                  </Button>
                      </>
                    )}
                  </>
                {/* {this.state.loading === true ? (<> </>) : (<> </>)} */}
              </div>
            </Form>
          </Row>
          {/*  All records */}
          <Row>
            <div className="general fadeIn fourth">
              <Table responsive hover size="sm" striped className="table">
                <thead>
                  <tr>
                    <th scope="col">FOTO</th>
                    <th scope="col">USUÁRIO</th>
                    {/* <th scope="col">SENHA</th> */}
                    <th scope="col">CPF</th>
                    <th scope="col">DEPARTAMENTO</th>
                  </tr>
                </thead>
                <tbody>


                  {this.state.loading ?
                    <tr>
                      <td>
                        <input readOnly className="inputstatus" value={this.state.status}></input>
                      </td>
                      <td>
                        <input readOnly className="inputstatus"></input>
                      </td>
                      <td>
                        <input readOnly className="inputstatus"></input>
                      </td>
                      <td>
                        <input readOnly className="inputstatus"></input>
                      </td>
                    </tr> :
                    this.state.records.map((record) => {

                      return (
                        <tr key={record.id}
                          onClick={() => this.perfilById(record.id)}>
                          <td>
                            <div className="divimg">
                              <a
                                href={"http://localhost:3002/" + record.image_user}
                                target="_newblank"
                              >
                                <img
                                  className="img-gerencia"
                                  src={"http://localhost:3002/" + record.image_user}
                                  alt="Imagem dos Clientes"
                                />
                              </a>
                            </div>
                          </td>
                          <td>
                            <p className="p">{record.username}</p>
                          </td>
                          {/* <td>
                            <p className="p" id="password">{record.password}</p>
                          </td> */}
                          <td>
                            <p className="p">{record.cpf}</p>
                          </td>
                          <td>
                            <p className="p">{record.departament}</p>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </div>
            <div className="container text-center"></div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;