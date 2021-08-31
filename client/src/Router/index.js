import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Gerencia from '../pages/gerencia';
import perfilge from '../pages/perfilgerencia2';
import Login from '../pages/login';
import Perfil from '../pages/perfilforgerencia/index'
import HomePage from '../pages/homepage/'

const Rotas = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/login' component={ Login } />
            <Route exact path='/gerencia' component={ Gerencia } />
            <Route exact path='/perfilge' component={ perfilge } />
            <Route exact path='/' component={ HomePage } />
            <Route exact path='/perfil' component={ Perfil } />
            <Route exact path='/perfil/:id' component={ Perfil } />

            {/* <Route exact path ="*" element={<h1>404</h1>} /> */}
        </Switch>
    </BrowserRouter>
);

export default Rotas;