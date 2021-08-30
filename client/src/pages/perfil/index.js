import React, { useState } from "react";

function App() {

    const [usuarioreg] = useState('')
    const [senhareg] = useState('')

    return (
        <div className="App">
            {/* <div classname="registration">
                <h1>Registro</h1>
                <label>Usuário</label>
                <input type="text" onChange={(e)=> {setUsuarioReg(e.target.value)}} />
                <label>Senha</label>
                <input type="password" onChange={(e)=> {setSenhaReg(e.target.value)}} />
                <button> Registrar</button>
            </div> */}
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="usuário..." />
                <input type="password" placeholder="senha..." />
                <button>Registrar</button>
            </div>
        </div>
    );
}

export default App;
