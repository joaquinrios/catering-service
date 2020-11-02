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
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Row>
                    <Col>
                      <h4>Pedido 1</h4>
                      <p>aquí hay algo de información at-a-glance</p>
                      <p>si das click, se muestran más detalles</p>
                    </Col>
                    <Col>
                      <p>Oct 11</p>
                      <p>7:00 PM</p>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row>
                      <Col>
                        <Button variant="primary">Editar</Button>
                      </Col>
                      <Col>
                        <p>Total: 5 Kg</p>
                      </Col>
                      <Col>
                        <p>$00.00</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Row>
                    <Col>
                      <h4>Pedido 1</h4>
                      <p>aquí hay algo de información at-a-glance</p>
                      <p>si das click, se muestran más detalles</p>
                    </Col>
                    <Col>
                      <p>Oct 11</p>
                      <p>7:00 PM</p>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row>
                      <Col>
                        <Button variant="primary">Editar</Button>
                      </Col>
                      <Col>
                        <p>Total: 5 Kg</p>
                      </Col>
                      <Col>
                        <p>$00.00</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};
