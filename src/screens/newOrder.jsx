import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const NewOrder = (props) => {
  return (
    <>
      <Navbar />
      <Container>
        <h1>Nuevo pedido:</h1>

        <h2>Datos del cliente:</h2>

        <h2>Datos del pedido:</h2>

        <Row>
          <Col lg={4} md={8}>
            <Button variant="primary">Cancelar</Button>
          </Col>
          <Col lg={8} md={4}>
            <Button variant="primary">Guardar pedido</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
