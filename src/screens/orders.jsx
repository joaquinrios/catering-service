import React from 'react';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';

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
              <Button variant="primary">Nuevo Pedido</Button>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Accordion>
              <Card>
                <Card.Header>
                  <Row>
                    <Col>
                      <h4>Pedido 1</h4>
                      <p>esto es un pedido</p>
                      <p>y aquí hay algo de información at-a-glance</p>
                    </Col>
                    <Col>
                      <p>Oct 11</p>
                      <p>7:00 PM</p>
                    </Col>
                  </Row>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <p>más detalles...</p>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Informacion p1</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Accordion>
              <Card>
                <Card.Header>
                  <Row>
                    <Col>
                      <h4>Pedido 2</h4>
                      <p>esto es un pedido</p>
                      <p>y aquí hay algo de información at-a-glance</p>
                    </Col>
                    <Col>
                      <p>Oct 12</p>
                      <p>2:00 PM</p>
                    </Col>
                  </Row>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <p>más detalles...</p>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Informacion p2</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};
