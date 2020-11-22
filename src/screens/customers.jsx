import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Accordion, Card, Modal, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import axios from 'axios';

import { Navbar } from '../components/navbar';

const options = {
  url: '/api/customers/',
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};


export const Customers = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [postModalShow, setPostModalShow] = useState(false);
  const [postModalMessage, setPostModalMessage] = useState('');
  const [ready, setReady] = useState(true);
  const [customers, setCustomers] = useState(false);

  // TODO: should be props or something from props, right?
  // for customer events retrieved from database
  const numbers = [1,2,3,4,5];
  const numberItems = numbers.map((number) => <p>{number}</p>);

  const closeModals = () => {
    setPostModalShow(false);
    setModalShow(false);
  };

  const onSubmitCreateCustomer = (values) => {
    // console.log('to submit:', values);
    const customer = {
      first_name: values.name,
      last_name: values.lastname,
      email: values.email,
      phone: values.phone,
      street: values.street,
      city: values.city,
      county: values.neighborhood,
      state: values.state,
      zip_code: values.zipcode
    }
    const options = {
      url: '/api/customers/',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: customer
    };
    
    axios(options)
      .then((response) => {
        setPostModalMessage('El nuevo cliente se ha guardado con éxito.');
        setPostModalShow(true);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setPostModalMessage('Ha habido un error. Por favor, intenta más tarde.');
          setPostModalShow(true);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  useEffect(() => {
    axios(options)
      .then((response) => {
        const _customers = response.data.customers;
        setCustomers(_customers);
        setReady(true);
      })
      .catch((error) => {
        setReady(true);
      });
  }, []);

  return (
    ready && (
      <>
        <Navbar />

        {/* Post success or failure modal */}
        <Modal
          size='sm'
          centered
          show={postModalShow}
          onHide={() => setPostModalShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Aviso</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <p>{postModalMessage}</p>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => closeModals()}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* New customer form modal */}
        <FinalForm onSubmit={onSubmitCreateCustomer}>
          {({ handleSubmit, submitting, values }) => (
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={modalShow}
              onHide={() => setModalShow(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Añadir un nuevo cliente
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col lg={12}>
                      <h3>Información básica</h3>
                    </Col>
                    <Col lg={4}>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <FinalFormField name="name">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="text"
                              placeholder="i.e. Juanito"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={8}>
                      <Form.Group>
                        <Form.Label>Apellidos</Form.Label>
                        <FinalFormField name="lastname">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="text"
                              placeholder="i.e. Alimañana"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Correo electrónico</Form.Label>
                        <FinalFormField name="email">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="text"
                              placeholder="i.e. juanito@alimaña.com"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <FinalFormField name="phone">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="text"
                              placeholder="i.e. 55 5495 4928"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={12}>
                      <Form.Group>
                        <Form.Label>Notas / Datos adicionales</Form.Label>
                        <FinalFormField name="notes">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="textarea"
                              placeholder="i.e. Sin mucha maña"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={12}>
                      <h3>Dirección</h3>
                    </Col>
                    <Col lg={12}>
                      <Form.Group>
                        <Form.Label>Calle</Form.Label>
                        <FinalFormField name="street">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="text"
                              placeholder="i.e. C Dr Mora 9"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Colonia</Form.Label>
                        <FinalFormField name="neighborhood">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="text"
                              placeholder="i.e. Centro"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Alcaldía / Municipio</Form.Label>
                        <FinalFormField name="city">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="text"
                              placeholder="i.e. Cuauhtémoc"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Código postal</Form.Label>
                        <FinalFormField name="zipcode">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="text"
                              placeholder="i.e. 06000"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Estado</Form.Label>
                        <FinalFormField name="state">
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type="text"
                              placeholder="i.e. Ciudad de México"
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalShow(false)}>
                  Cerrar
                </Button>
                <Button
                  variant="success"
                  onClick={handleSubmit}
                >
                  Crear cliente
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </FinalForm>

        <Container>
          <Row>
            <Col lg={6} md={6}>
              <h1>Clientes</h1>
            </Col>
            <Col lg={6} md={6} className="align-right">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setModalShow(true)}
              >
                Nuevo cliente
              </Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg={8}>
              <Accordion defaultActiveKey="0">
                {customers &&
                  customers.map((customer, index) => (
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                        <Row>
                          <Col>
                            <h4>{`${customer.first_name} ${customer.last_name}`}</h4>
                            <p>Último pedido: Oct 11 [TODO / whats missing? the event?]</p>
                          </Col>
                          <Col className="align-right">
                            <h4></h4>
                          </Col>
                        </Row>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body>
                          <Row>
                            <Col lg={6}>
                              <p>
                                {customer.street}
                                <br />
                                {customer.city} <br />
                                {customer.zip_code}, {customer.county} <br />
                              </p>
                              <h4>Últimos eventos</h4>
                              <p>Cena familiar, Oct 11, 7:00 PM</p>
                              <p>{numberItems}</p>
                            </Col>
                            <Col lg={6} className="align-right">
                              <p>
                                Teléfono: {customer.phone} <br />
                                Correo: {customer.email} <br />
                                <br />
                              </p>
                            </Col>
                            <Col lg={12} className="align-right">
                              <Button variant="info" size="sm">
                                Añadir evento
                              </Button>{' '}
                              <Button variant="primary" size="sm">
                                Editar información
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </>
    )
  );
};
