import React from 'react';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const Customers = (props) => {
    return (
      <>
        <Navbar />
        <Container>
          <Row>
            <Col lg={4} md={8}>
              <h1>Clientes</h1>
            </Col>
            <Col lg={8} md={4}>
              <p>
                <Button variant="primary">Nuevo Cliente</Button>
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
                        <h4>Robertito Tablas</h4>
                        <h6>+52 1 55 5555 5555</h6>
                        <h6>asdf@ghjkl.com</h6>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Row>
                        <Col>
                          <p>dirección: dlsakfjañsldkf</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h6>Eventos recurrentes</h6>
                        </Col>
                        <Col>
                          <Button variant="primary">Agregar evento</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button variant="primary">Editar cliente</Button>
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
                        <h4>Robertito Tablas</h4>
                        <h6>+52 1 55 5555 5555</h6>
                        <h6>asdf@ghjkl.com</h6>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Row>
                        <Col>
                          <p>dirección: dlsakfjañsldkf</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h6>Eventos recurrentes</h6>
                        </Col>
                        <Col>
                          <Button variant="primary">Agregar evento</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button variant="primary">Editar cliente</Button>
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
