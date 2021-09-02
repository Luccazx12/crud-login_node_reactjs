import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Gerencia from '../pages/gerencia';
import Login from '../pages/login';
import Perfil from '../pages/perfil/index'
import HomePage from '../pages/homepage/'
import NotFound from '../pages/notfound/'

const Rotas = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/login' component={ Login } />
            <Route exact path='/gerencia' component={ Gerencia } />
            <Route exact path='/' component={ HomePage } />
            <Route exact path='/perfil/:id' component={ Perfil } />
            <Route path="*" exact component={ NotFound } />
            {/* <Route exact path ="*" element={<h1>404</h1>} /> */}
        </Switch>
    </BrowserRouter>
);

export default Rotas;