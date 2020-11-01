import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const Orders = (props) => {
  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col lg={4} md={8}>
            <h1>Pedidos</h1>
          </Col>
          <Col lg={8} md={4}>
            <p>
              <Button variant='primary'>Nuevo Pedido</Button>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
