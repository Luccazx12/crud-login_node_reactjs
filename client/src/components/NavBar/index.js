import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import './index.css'

export default function NavBar(){
    return(
<>
  <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand href="http://localhost:3000/">REPROGRAFIA</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="http://localhost:3000/">Página Inicial</Nav.Link>
      <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
      <Nav.Link href="http://localhost:3000/gerencia">Registrar</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
</>
)}