import React from 'react';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const Customers = (props) => {
    return (
      <>
        <Navbar />
        <Container>
          <Row>
            <Col lg={6} md={6}>
              <h1>Clientes</h1>
            </Col>
            <Col lg={6} md={6} className='align-right'> 
              <Button variant='primary' size='lg'>Nuevo cliente</Button>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col lg={8}>
              <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <Row>
                      <Col>
                        <h4>Sr. Roberto Perezyera</h4>
                        <p>Último pedido: Oct 11</p>
                        
                      </Col>
                      <Col className='align-right'>
                        <h4>21 años</h4>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <Row>               
                        <Col lg={6}>
                          <p>
                            C. Dr. Mora 9 <br/>
                            Centro, Cuauhtemoc <br/>
                            06000, Ciuda de México, CDMX <br/>
                          </p>
                          <h4>Último evento</h4>
                          <p>
                            Cena familiar, Oct 11, 7:00 PM
                          </p>
                        </Col>
                        <Col lg={6} className='align-right'>
                          <p>
                            Teléfono: 55 6892 1923 <br/>
                            Correo: roberto@mora.com <br/>
                            <br/>
                          </p>
                        </Col>
                        <Col lg={12} className='align-right'>
                          <Button variant='info' size='sm'>Añadir evento</Button>{' '}
                          <Button variant='primary' size='sm'>Editar información</Button>
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
