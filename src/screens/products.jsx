import React from 'react';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const Products = (props) => {
  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col lg={6} md={6}>
            <h1>Productos</h1>
          </Col>
          <Col lg={6} md={6} className='align-right'> 
            <Button variant='primary' size='lg'>Nuevo producto</Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col lg={8}>
            <h3>Platos fuertes</h3>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Row>
                    <Col>
                      <h4>Plato fuerte # 12</h4>
                    </Col>
                    <Col className='align-right'>
                      <h4>kg</h4>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row>               
                      <Col lg={6}>
                        <p>
                          Este plato consiste de un plato, es fuerte y suele estar en kg.
                          Esta información claramente se puede cambiar
                        </p>
                        
                      </Col>
                      <Col lg={6} className='align-right'>
                        <p>
                          Teléfono: 55 6892 1923 <br/>
                          Correo: roberto@mora.com <br/>
                          <br/>
                        </p>
                      </Col>
                      <Col lg={6}><h4>Precio por kg</h4></Col>
                      <Col lg={6} className='align-right'><h4>$ 150.00</h4></Col>
                      <Col lg={12} className='align-right'>
                        <Button variant='primary' size='sm'>Editar producto</Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          
          <Col lg={4}>
            <h3>Complementos</h3>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Row>
                    <Col>
                      <h5>Orden de órdenes</h5>      
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row>               
                      <Col lg={12}>
                        <p>
                          Practicamente es una orden de órdenes y contiene multiples órdenes en una sola orden.
                        </p>
                      </Col>
                      <Col lg={8}><h6>Precio por pz</h6></Col>
                      <Col lg={4} className='align-right'><h6>$ 50.00</h6></Col>
                      
                      <Col lg={12} className='align-right'>
                        <Button variant='primary' size='sm'>Editar complemento</Button>
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
