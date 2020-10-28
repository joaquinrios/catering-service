import React from 'react';

import { Container, Navbar as BNavbar, Nav, Button, FormControl, Form, NavDropdown } from 'react-bootstrap';

export const Navbar = (props) => {
  return (
    <>
      <BNavbar bg="light" expand="lg">
        <Container>
          <BNavbar.Brand href="#home">Catering Service</BNavbar.Brand>
          <BNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Dashboard</Nav.Link>
              <Nav.Link href="#orders">Pedidos</Nav.Link>
              <Nav.Link href="#link">Productos</Nav.Link>
              <Nav.Link href="#link">Usuarios</Nav.Link>
              <NavDropdown title="Nombre Usuario" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </BNavbar.Collapse>
        </Container>
      </BNavbar>
    </>
  );
}