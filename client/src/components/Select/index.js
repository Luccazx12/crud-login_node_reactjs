import React, { useState } from "react";
import { FormSelect } from "react-bootstrap";
import "./index.css"

function App() {
    const [select, setSelected] = useState("");

    return (
            <FormSelect className="formSelect" onChange={(e) => {
                const select = e.target.value;
                setSelected(select);
            }} aria-label="Default select example" id="select" name="select">
                <option>Escolha um departamento</option>
                <option value="x">Departamento x</option>
                <option value="y">Departamento y</option>
                <option value="z">Departamento z</option>
            </FormSelect>
    );
}

export default App;