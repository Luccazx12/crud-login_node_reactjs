import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import './index.css'

import HomePage from '../pages/homepage/';
import Login from '../pages/login';
import Manager from '../pages/manager';
import Profile from '../pages/profile/';
import MyProfile from '../pages/myprofile/';
import ProfileEdit from '../pages/profile/edit/';
import ChangePassword from '../pages/myprofile/changepassword'
import NotFound from '../pages/notfound';


export default function App() {

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
        gerencia: 0
    });
    const [redirect, setRedirect] = useState()

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, gerencia: 0, status: false });
        setRedirect(true);
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
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        gerencia: response.data.gerencia,
                        status: true,
                    });
                }
            });
    },[]);

    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    { redirect ? (<Redirect push to="/login" />) : null }
                    <div className="navbar">
                        <div className="links">

                            <Link to="/"> Página Inicial </Link>
                            {!authState.status && (
                                <Link to="/login"> Login</Link>
                            )}
                            {authState.status && (
                                <>
                                    {authState.gerencia ? (
                                        <Link to="/gerencia"> Gerencia </Link>
                                    ) : <></>}
                                </>)}

                        </div>
                        <div className="loggedInContainer">
                            <Link to="/meuperfil"><p>{authState.username}</p></Link>
                            
                            {authState.status && <Button onClick={logout}> Logout </Button>}
                        </div>
                    </div>
                    <Switch>
                        <Route path="/" exact component={ HomePage } />
                        <Route path="/login" exact component={ Login } />
                        <Route path="/gerencia" exact component={ Manager } />
                        <Route path="/perfil/:id" exact component={ Profile } />
                        <Route path="/perfil/:id/edit" exact component={ ProfileEdit } />
                        <Route path="/meuperfil" exact component={ MyProfile } />
                        <Route path="/meuperfil/changepassword" exact component={ ChangePassword } />
                        <Route path="*" exact component={ NotFound } />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}