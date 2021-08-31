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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
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
      records: [],
      showAlert: false,
      alertMsg: "",
      alertType: "sucess",
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
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        this.setState({
          records: result.response,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //view sigle data to edit
  editRecord = (id) => {
    fetch("http://localhost:3002/users/id/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.props.history.push("/perfil/" + id);
        this.setState({
          id: id,
          update: true,
          username: result.response[0].username,
          password: result.response[0].password,
          cpf: result.response[0].cpf,
          selected: result.response[0].departament,
          data: result.response[0].image_user,
        });

        //Pensando sobre como redirecionar para a página com os dados corretos, eles ficariam da seguinte forma: result.response[0].obj pois só
        //será feito o select daquele ID. O problema é realizar essa troca de informações, redirecionar as informações corretas quando clicado
        //em um registro da tabela...
        // return(
        //   <div className="form">
        //       <p>{result.response[0].username}</p>
        //       {result.response[0].password}
        //       {result.response[0].cpf}
        //       {result.response[0].departament}
        //       {result.response[0].image_user}
        //   </div>
        // )
      })
      .catch((error) => console.log("error", error));
  };

  // update record
  updateRecord = () => {
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
  deleteRecord = (id) => {
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
                  required
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
                <Button
                  className="button fadeIn fourth"
                  id="edit-btn"
                  onClick={this.fetchAllRecord}
                >
                  Ler
                </Button>
                {this.state.update === true ? (
                  <Button className="button" onClick={this.updateRecord}>
                    Atualizar
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={this.submitbutton}
                    className="button fadeIn fourth"
                    id="create-btn"
                  >
                    Registrar
                  </Button>
                )}
                <Button
                  className="button fadeIn fourth"
                  id="delete-btn"
                  onClick={this.deleteRecords}
                >
                  Deletar todos
                </Button>
              </div>
            </Form>
          </Row>
          {/*  All records */}
          <Row>
            <div className="general fadeIn fourth">
              <Table responsive hover size="sm" striped className="table">
                <thead>
                  <tr>
                    <th scope="col">USUÁRIO</th>
                    <th scope="col">SENHA</th>
                    <th scope="col">CPF</th>
                    <th scope="col">DEPARTAMENTO</th>
                    <th scope="col">FOTO</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.records.map((record) => {
                    return (
                      <tr key={record.id}
                        onClick={() => this.editRecord(record.id)}>
                        <td>
                          <p className="p">{record.username}</p>
                        </td>
                        <td>
                          <p className="p" id="password">{record.password}</p>
                        </td>
                        <td>
                          <p className="p">{record.cpf}</p>
                        </td>
                        <td>
                          <p className="p">{record.departament}</p>
                        </td>
                        <td>
                          <div className="divimg">
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
                              />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
