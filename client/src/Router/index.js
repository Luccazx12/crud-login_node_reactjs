import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

import Gerencia from '../pages/gerencia';
import Login from '../pages/login';
import Perfil from '../pages/perfil/index';
import PerfilEdit from '../pages/perfiledit/index';
import HomePage from '../pages/homepage/';
import NotFound from '../pages/notfound';


function App() {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
    });

    const [gerencia, setGerencia] = useState(true);

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
                        status: true,
                    });
                }
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, status: false });
    };

    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <div className="navbar">
                        <div className="links">
                            <Link to="/"> Home Page</Link>
                            {!authState.status && (
                                <Link to="/login"> Login</Link>
                            )}
                            {authState.status && (
                                <>
                                    {gerencia ? <Link to="/gerencia"> Registration</Link> : <></>}
                                </>
                            )}


                        </div>
                        <div className="loggedInContainer">
                            <h1>{authState.username} </h1>
                            {authState.status && <button onClick={logout}> Logout</button>}
                        </div>
                    </div>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/perfil/:id" exact component={Perfil} />
                        <Route path="/perfil/:id/edit" exact component={ PerfilEdit} />
                        <Route path="/gerencia" exact component={Gerencia} />
                        <Route path="/login" exact component={Login} />
                        <Route path="*" exact component={NotFound} />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;