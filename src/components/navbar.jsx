import React from 'react';
import { Container, Navbar as BNavbar, Nav, Button, FormControl, Form, NavDropdown } from 'react-bootstrap';

import { useAuth, signOut } from './auth_provider';

export const Navbar = (props) => {
  const user = useAuth();
  return (
    <>
      <BNavbar bg='light' expand='lg'>
        <Container>
          <BNavbar.Brand href='/'>Catering Service</BNavbar.Brand>
          <BNavbar.Toggle aria-controls='basic-navbar-nav' />
          <BNavbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              { user ? (
                <>
                  <Nav.Link href='/'>Dashboard</Nav.Link>
                  <Nav.Link href='/orders'>Pedidos</Nav.Link>
                  <Nav.Link href='/products'>Productos</Nav.Link>
                  <Nav.Link href='/customers'>Clientes</Nav.Link>
                  <NavDropdown title={`${user.email}`} id='basic-nav-dropdown'>
                    <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.2'>
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.3'>
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={signOut}>
                      Cerrar sesión
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <> 
                  <Nav.Link href='#services'>Servicios</Nav.Link>
                  <Nav.Link href='#discounts'>Descuentos</Nav.Link>
                  <Nav.Link href='#about-us'>Nosotros</Nav.Link>
                  <Nav.Link href='#contact'>Contacto</Nav.Link>
                </>
              )}
            </Nav>
          </BNavbar.Collapse>
        </Container>
      </BNavbar>
    </>
  );
}