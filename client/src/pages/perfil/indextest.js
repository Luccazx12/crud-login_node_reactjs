import React from "react";
import "./index.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
        };
    }

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
        fetch("http://localhost:3002/users/" + id, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    id: id,
                    update: true,
                    username: result.response[0].username,
                    password: result.response[0].password,
                    cpf: result.response[0].cpf,
                    selected: result.response[0].departament,
                    data: result.response[0].image_user,
                });
            })
            .catch((error) => console.log("error", error));
    };



    render() {
        return (
            <div className="App">
                {this.state.records.map((records) => {
                    return (
                        <tr key={records.id} onClick={this.handleClick}>
                            <td>
                                <p className="p">{records.username}</p>
                            </td>
                            <td>
                                <p className="p">{records.password}</p>
                            </td>
                            <td>
                                <p className="p">{records.cpf}</p>
                            </td>
                            <td>
                               <p className="p">{records.departament}</p>
                            </td>
                            <td>
                                <div className="divimg">
                                    <a
                                        href={
                                            "http://localhost:3002/" + records.image_user
                                        }
                                        target="_newblank"
                                    >
                                        <img
                                            src={
                                                "http://localhost:3002/" +
                                                records.image_user
                                            }
                                            alt="Imagem dos Clientes"
                                        />
                                    </a>
                                </div>
                            </td>
                            <td>
                                <a
                                    href="#!"
                                    onClick={() => this.editRecord(records.id)}
                                >
                                    <EditIcon className="editicon">Editar</EditIcon>
                                </a>
                            </td>
                            <td>
                                <a
                                    href="#!"
                                    onClick={() => this.deleteRecord(records.id)}
                                >
                                    <DeleteIcon className="deleteicon"></DeleteIcon>
                                </a>
                            </td>
                        </tr>
                    );
                })}
            </div>
        )
    }
}

export default App;
