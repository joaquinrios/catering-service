import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const Products = (props) => {
  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col lg={4} md={8}>
            <h1>Productos</h1>
          </Col>
          <Col lg={8} md={4}>
            <p>
              <Button variant="primary">Nuevo Producto</Button>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Platos fuertes:</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Complementos:</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};
