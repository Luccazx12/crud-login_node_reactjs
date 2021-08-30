import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Gerencia from '../pages/gerencia';
import Login from '../pages/login';
import Perfil from '../pages/perfil/indextest'

const Rotas = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/gerencia' component={ Gerencia } />
            <Route exact path='/perfil' component={ Perfil } />
            <Route exact path='/' component={ Login } />
            <Route exact path ="*" element={<h1>404</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Rotas;