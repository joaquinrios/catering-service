import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Accordion, Card, Modal, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import axios from 'axios';

import { Navbar } from '../components/navbar';

const options = {
  url: '/api/products/',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

const createOrderOptions = {
  url: '/api/products/',
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

export const Products = () => {
  const [modalShow, setModalShow] = useState(false);
  const [postModalShow, setPostModalShow] = useState(false);
  const [postModalMessage, setPostModalMessage] = useState('');
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState(null);

  const closeModals = () => {
    setPostModalShow(false);
    setModalShow(false);
  };

  const onSubmitCreateProduct = (values) => {
    console.log('data to submit:', values);
    axios(createOrderOptions)
      .then((response) => {
        setPostModalMessage('El nuevo producto se ha guardado con éxito.');
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
    axios(options).then(response => {
      const _products = response.data.products;
      setProducts(_products)
      setReady(true);
    }).catch(error => {
      setReady(true);
    });

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
            <Button variant="secondary" onClick={() => closeModals()}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

      {/* New product form modal */}
      <FinalForm onSubmit={onSubmitCreateProduct}>
        {({ handleSubmit, submitting, values }) => (
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
                            <option>kilogramos</option>
                            <option>litros</option>
                            <option>órden(es)</option>
                            <option>piezas</option>
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
              <Button variant='success' onClick={() => onSubmitCreateProduct(values)}>Crear producto</Button>
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
            <Button variant='primary' size='lg' onClick={() => setModalShow(true)}>
              Nuevo producto
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={8}>
            <h3>Platos fuertes</h3>
            <Accordion defaultActiveKey='0'>
              { products && products.map((product, index) => (
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                    <Row>
                      <Col>
                        <h4>{product.product_name}</h4>
                      </Col>
                      <Col className='align-right'>
                        <h4>{product.measure}</h4>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${index}`}>
                    <Card.Body>
                      <Row>
                        <Col lg={6}>
                          <p>
                            {product.description}
                          </p>
                        </Col>
                        <Col lg={6} className='align-right'>
                          <p>
                            Categoria: {product.category} <br />
                            <br />
                          </p>
                        </Col>
                        <Col lg={6}>
                          <h4>Precio por {product.measure}</h4>
                        </Col>
                        <Col lg={6} className='align-right'>
                          <h4>$ {product.price}</h4>
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
              ))}
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
