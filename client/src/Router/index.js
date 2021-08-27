import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Gerencia from '../pages/gerencia';
import Login from '../pages/login';

const Rotas = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/gerencia' component={ Gerencia } />
            <Route exact path='/' component={ Login } />
        </Switch>
    </BrowserRouter>
);

export default Rotas;