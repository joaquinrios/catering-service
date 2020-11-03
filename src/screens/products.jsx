import React, { useState } from 'react';
import { Container, Row, Col, Button, Accordion, Card, Modal, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';

import { Navbar } from '../components/navbar';

export const Products = () => {
  const [modalShow, setModalShow] = useState(false);

  const onSubmitCreateProduct = (values) => {};

  return (
    <>
      <Navbar />
      <FinalForm onSubmit={onSubmitCreateProduct}>
        {({ handleSubmit, submitting }) => (
          <Modal
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={modalShow}
            onHide={() => setModalShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title-vcenter'>
                Añadir un nuevo producto
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col lg={12}>
                    <h3>Información del producto</h3>
                  </Col>
                  <Col lg={8}>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <FinalFormField name='name'>
                        {({ input }) => (
                          <Form.Control
                            {...input}
                            type='text'
                            placeholder='i.e. Chicharrón en salsa verde'
                          />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={12}>
                    <Form.Group>
                      <Form.Label>Descripción</Form.Label>
                      <FinalFormField name='description'>
                        {({ input }) => (
                          <Form.Control
                            {...input}
                            type='textarea'
                            placeholder='i.e. pues el nombre dice bastante'
                          />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={8}>
                    <Form.Group>
                      <Form.Label>Categoría</Form.Label>
                      <FinalFormField name='category'>
                        {({ input }) => (
                          <Form.Control as='select'>
                            <option>Plato fuerte</option>
                            <option>Bebida</option>
                            <option>Complemento</option>
                          </Form.Control>
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Precio</Form.Label>
                      <FinalFormField name='price'>
                        {({ input }) => (
                          <Form.Control
                            {...input}
                            type='text'
                            placeholder='i.e. $50.00'
                          />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>por (unidad medida)</Form.Label>
                      <FinalFormField name='measureUnit'>
                        {({ input }) => (
                          <Form.Control as='select'>
                            <option>Kg</option>
                            <option>litros</option>
                            <option>órden(es)</option>
                          </Form.Control>
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setModalShow(false)}>
                Cerrar
              </Button>
              <Button variant='success'>Crear producto</Button>
            </Modal.Footer>
          </Modal>
        )}
      </FinalForm>
      <Container>
        <Row>
          <Col lg={6} md={6}>
            <h1>Productos</h1>
          </Col>
          <Col lg={6} md={6} className='align-right'>
            <Button
              variant='primary'
              size='lg'
              onClick={() => setModalShow(true)}
            >
              Nuevo producto
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={8}>
            <h3>Platos fuertes</h3>
            <Accordion defaultActiveKey='0'>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='0'>
                  <Row>
                    <Col>
                      <h4>Plato fuerte # 12</h4>
                    </Col>
                    <Col className='align-right'>
                      <h4>kg</h4>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    <Row>
                      <Col lg={6}>
                        <p>
                          Este plato consiste de un plato, es fuerte y suele
                          estar en kg. Esta información claramente se puede
                          cambiar
                        </p>
                      </Col>
                      <Col lg={6} className='align-right'>
                        <p>
                          Teléfono: 55 6892 1923 <br />
                          Correo: roberto@mora.com <br />
                          <br />
                        </p>
                      </Col>
                      <Col lg={6}>
                        <h4>Precio por kg</h4>
                      </Col>
                      <Col lg={6} className='align-right'>
                        <h4>$ 150.00</h4>
                      </Col>
                      <Col lg={12} className='align-right'>
                        <Button variant='primary' size='sm'>
                          Editar producto
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>

          <Col lg={4}>
            <h3>Complementos</h3>
            <Accordion defaultActiveKey='0'>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='0'>
                  <Row>
                    <Col>
                      <h5>Orden de órdenes</h5>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    <Row>
                      <Col lg={12}>
                        <p>
                          Practicamente es una orden de órdenes y contiene
                          multiples órdenes en una sola orden.
                        </p>
                      </Col>
                      <Col lg={8}>
                        <h6>Precio por pz</h6>
                      </Col>
                      <Col lg={4} className='align-right'>
                        <h6>$ 50.00</h6>
                      </Col>

                      <Col lg={12} className='align-right'>
                        <Button variant='primary' size='sm'>
                          Editar complemento
                        </Button>
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
