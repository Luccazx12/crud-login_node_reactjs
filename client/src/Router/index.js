import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import './index.css'

import HomePage from '../pages/homepage/';
import Login from '../pages/login';
import Gerencia from '../pages/gerencia';
import Perfil from '../pages/perfil/';
import PerfilEdit from '../pages/perfil/edit/';
import PerfilEditPassword from '../pages/perfil/edit/password/';
import NotFound from '../pages/notfound';


export default function App() {

    const [gerencia, setGerencia] = useState(false);
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
    });
    const [redirect, setRedirect] = useState()


    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, status: false });
        window.location.reload();
        setRedirect(true);
    };

    const verificaGerencia = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:3002/users/" + authState.id, {
            method: "GET",
            headers: { accessToken: localStorage.getItem("accessToken"), headers }
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("result", result);
                if(result.error){
                    console.log("caraicuzao")
                }
                else if(result.response[0].gerencia === 1){
                        setGerencia(true)
                    }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

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
                }
                else {
                    setAuthState({
                        username: response.username,
                        id: response.data.id,
                        status: true,
                    });
                }
            });
        
    }, []);
        
    useEffect(() => {
        verificaGerencia();
    }, 3)



    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    {redirect ? (<Redirect push to="/login"/>) : null}
                    <div className="navbar">
                        <div className="links">
                    <div>id: {authState.id}</div>
                            <Link to="/"> Página Inicial </Link>
                            {!authState.status && (
                                <Link to="/login"> Login</Link>
                            )}                              <>
                                {gerencia ? <><Link to="/gerencia"> Gerencia </Link> </> : <></>}
                            </>
                        </div>
                        <div className="loggedInContainer">
                            <p>{authState.username}</p>
                            {authState.status && <Button onClick={logout}> Logout </Button>}
                        </div>
                    </div>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/gerencia" exact component={Gerencia} />
                        <Route path="/perfil/:id" exact component={Perfil} />
                        <Route path="/perfil/:id/edit" exact component={PerfilEdit} />
                        <Route path="/perfil/:id/edit/password" exact component={PerfilEditPassword} />
                        <Route path="*" exact component={NotFound} />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}