import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const LandingPage = () => {
    return (
      <>
        <Navbar />
        <Container>
          <h1>Slogan e imagen</h1>
          <hr />
          <h1>Servicios</h1>
          <hr/>
          <h1>Descuentos</h1>
          <hr/>
          <h1>Nosotros</h1>
          <hr/>
          <h1>Contacto</h1>
          <hr/>
          <h2>Maybe some footer?</h2>
        </Container>
      </>
    );
}