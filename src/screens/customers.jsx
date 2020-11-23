import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Accordion, Card, Modal, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import axios from 'axios';

import { Navbar } from '../components/navbar';

const options = {
  url: '/api/customers/orders',
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};


export const Customers = ({ navigate }) => {
  const [modalShow, setModalShow] = useState(false);
  const [postModalShow, setPostModalShow] = useState(false);
  const [postModalMessage, setPostModalMessage] = useState('');

  const [ready, setReady] = useState(true);
  const [customers, setCustomers] = useState(false);
  const [customer, setCustomer] = useState(null);

  const closeModals = () => {
    setPostModalShow(false);
    setModalShow(false);
  };

  const prepareCustomer = (id) => {
    let customer = customers.find(c => c.customer_id === id);
    setCustomer({name: customer.first_name, lastname: customer.last_name, email: customer.email, id: customer.customer_id, phone: customer.phone});
    setModalShow(true);
  }

  const closeFormModal = () => {
    setCustomer(null);
    setModalShow(false);
  }

  const onSubmitCreateCustomer = (values) => {
    const customer = {
      first_name: values.name,
      last_name: values.lastname,
      email: values.email,
      phone: values.phone,
      street: values.street,
      city: values.city,
      county: values.county,
      state: values.state,
      zip_code: values.zipcode
    }
    const options = {
      url: '/api/customers/',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: customer
    };
    
    axios(options).then((response) => {
      setPostModalMessage('El nuevo cliente se ha guardado con éxito.');
      setPostModalShow(true);
      setTimeout(() => window.location.reload(), 2000);
    }).catch((error) => {
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

  const onSubmitDeleteCustomer = (id) => {
    const options = {
      url: `/api/customers/${id}`,
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    axios(options).then((response) => {
      setPostModalMessage('Cliente eliminado con éxito.');
      setPostModalShow(true);
      setTimeout(() => window.location.reload(), 2000);
    }).catch((error) => {
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
  }

  const onSubmitUpdateCustomer = (values) => {
    const customer = { first_name: values.name, last_name: values.lastname, email: values.email, phone: values.phone };
    const options = {
      url: `/api/customers/${values.id}`,
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: customer
    };
    axios(options).then((response) => {
      setModalShow(false);
      setPostModalMessage('Información de cliente modificada con éxito.');
      setPostModalShow(true);
      setTimeout(() => window.location.reload(), 2000);
    }).catch((error) => {
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
  }

  useEffect(() => {
    axios(options).then((response) => {
      const _customers = response.data.customers;
      setCustomers(_customers);
    }).catch((error) => { });
    setReady(true);
  }, []);

  return ready && (
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
            <Button variant='secondary' onClick={() => closeModals()}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* New customer form modal */}
        <FinalForm onSubmit={customer ? onSubmitUpdateCustomer : onSubmitCreateCustomer} initialValues={ customer ? customer : {}}>
          {({ handleSubmit, submitting, values }) => (
            <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered show={modalShow} onHide={() => setModalShow(false)}>
              <Modal.Header closeButton> <Modal.Title id='contained-modal-title-vcenter'> { customer ? 'Editar cliente' : 'Añadir un nuevo cliente'} </Modal.Title> </Modal.Header>
              <Modal.Body>
                <Form> <Row>
                    <Col lg={12}>
                      <h3>Información básica</h3>
                    </Col>
                    <Col lg={4}>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <FinalFormField name='name'>
                          {({ input }) => ( <Form.Control {...input} type='text' placeholder='i.e. Joaquin' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={8}>
                      <Form.Group>
                        <Form.Label>Apellidos</Form.Label>
                        <FinalFormField name='lastname'>
                          {({ input }) => ( <Form.Control {...input} type='text' placeholder='i.e. Rios' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Correo electrónico</Form.Label>
                        <FinalFormField name='email'>
                          {({ input }) => ( <Form.Control {...input} type='text' placeholder='i.e. joaquin@rios.com' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <FinalFormField name='phone'>
                          {({ input }) => (<Form.Control {...input} type='text' placeholder='i.e. 55 5495 4928' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    { !customer && (
                      <>
                        <Col lg={12}>
                          <h3>Dirección</h3>
                        </Col>
                        <Col lg={12}>
                          <Form.Group>
                            <Form.Label>Calle</Form.Label>
                            <FinalFormField name='street'>
                              {({ input }) => (<Form.Control {...input} type='text' placeholder='i.e. Dr. Mora 9' /> )}
                            </FinalFormField>
                          </Form.Group>
                        </Col>

                        <Col lg={6}>
                          <Form.Group>
                            <Form.Label>Colonia / Zona</Form.Label>
                            <FinalFormField name='county'>
                              {({ input }) => (<Form.Control {...input} type='text' placeholder='i.e. Centro' /> )}
                            </FinalFormField>
                          </Form.Group>
                        </Col>

                        <Col lg={6}>
                          <Form.Group>
                            <Form.Label>Alcaldía / Municipio</Form.Label>
                            <FinalFormField name='city'>
                              {({ input }) => (<Form.Control {...input} type='text' placeholder='i.e. Cuauhtemoc' /> )}
                            </FinalFormField>
                          </Form.Group>
                        </Col>

                        <Col lg={6}>
                          <Form.Group>
                            <Form.Label>Código postal</Form.Label>
                            <FinalFormField name='zipcode'>
                              {({ input }) => (<Form.Control {...input} type='text' placeholder='i.e. 06000' /> )}
                            </FinalFormField>
                          </Form.Group>
                        </Col>

                        <Col lg={6}>
                          <Form.Group>
                            <Form.Label>Estado</Form.Label>
                            <FinalFormField name='state'>
                              {({ input }) => (<Form.Control {...input} type='text' placeholder='i.e. Ciudad de México' /> )}
                            </FinalFormField>
                          </Form.Group>
                        </Col>
                      </>
                    )}
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={closeFormModal}> Cerrar </Button>
                { customer && (<Button variant='danger' onClick={() => onSubmitDeleteCustomer(values.id)}> Borrar cliente </Button>)}
                <Button variant='success' onClick={handleSubmit}> {customer ? 'Editar cliente' : 'Crear cliente'} </Button>
              </Modal.Footer>
            </Modal>
          )}
        </FinalForm>

        <Container>
          <Row>
            <Col lg={4} md={4}>
              <h1>Clientes</h1>
            </Col>
            <Col lg={8} md={8} className='align-right'>
              <Button variant='primary' size='lg' onClick={() => setModalShow(true)}> Nuevo cliente </Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg={8}>
              <Accordion defaultActiveKey='0'>
                {customers &&
                  customers.map((customer, index) => (
                    <Card key={`${index}`}>
                      <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                        <Row>
                          <Col>
                            <h4>{`${customer.first_name} ${customer.last_name}`}</h4>
                            <p>{(customer.cust_orders.length > 0) && (<>Últimos pedido: <span className='bold'>{new Date(customer.cust_orders[0].order_date.replace(' ', 'T')).toLocaleDateString()}</span></>) } </p>
                          </Col>
                          <Col className='align-right'>
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
                              <h4>{(customer.cust_orders.length > 0) && 'Últimos 5 eventos' }</h4>
                              { customer.cust_orders.slice(0, 5).map((order, index) => {
                                return (
                                <p className='mb-1'><span className='bold'>{new Date(order.order_date.replace(' ', 'T')).toLocaleDateString()}</span> -  {order.order_event}</p>
                              )})}
                              
                            </Col>
                            <Col lg={6} className='align-right'>
                              <p>
                                Teléfono: {customer.phone} <br />
                                Correo: {customer.email} <br />
                                <br />
                              </p>
                            </Col>
                            <Col lg={12} className='align-right'>
                              <Button variant='info' size='sm'> Añadir pedido </Button>{' '}
                              <Button variant='primary' size='sm' onClick={() => prepareCustomer(customer.customer_id)}> Editar información </Button>
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
  );
};
