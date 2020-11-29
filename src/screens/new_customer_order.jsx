import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays';
import axios from 'axios';
import arrayMutators from 'final-form-arrays';
import Toggle from 'react-toggle';
import { BsFillPeopleFill, BsX, BsFillInfoCircleFill, BsFillPersonCheckFill } from 'react-icons/bs';

import { Navbar } from '../components/navbar';

export const NewCustomerOrder = ({ props }) => {
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState([]);
  const [postModalShow, setPostModalShow] = useState(false);
  const [postModalMessage, setPostModalMessage] = useState('');
  const [validationModalShow, setValidationModalShow] = useState(true);
  const [userID, setUserID] = useState(null);

  const successMessage = (
    <>
      <h5>Hemos recibido la información sobre tu pedido.</h5>
      <p>
        En Cocina Mary, darles a nuestros clientes la mejor experiencia es lo
        que hacemos mejor, y para ti no será la excepción.
      </p>
      <p>
        Te llamaremos pronto para confirmar tu orden y platicar detalles
        adicionales.
      </p>
    </>
  );

  const failureMessage = (
    <>
      <h5>Algo ha salido mal.</h5>
      <p>Por favor, vuelve a intentar más tarde.</p>
      <h5>Si el problema persiste, no dudes en contactarnos:</h5>
      <h4>(55) 1283 8823</h4>
    </>
  );

  const getProductsSum = (selectedProducts) => {
    const ids = selectedProducts.map((product) => {
      if (product !== undefined && product.hasOwnProperty('id')) {
        return product.id;
      }
    });
    let total = 0;

    ids.forEach((id) => {
      let currentProduct = products.find((p) => p.product_id == id);
      total +=
        currentProduct != undefined ? parseFloat(currentProduct.price) : 0;
    });
    return total;
  };

  const closeValidationModal = () => {
    setUserID(-1);
    setValidationModalShow(false);
  }

  const validateEmail = (values) => {
    const emailToCheck = {
      email: values.email,
    };
    const options = {
      url: `/api/customers/verify/${emailToCheck.email}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      params: emailToCheck,
    };

    axios(options)
      .then((response) => {
        setUserID(response.data.customer_id);
        setValidationModalShow(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setPostModalMessage(failureMessage);
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

  // TODO: Bobby
  const onSubmitCreateCustomerOrder = (values) => {
    // console.log('form submitted', values);
    const order = {
      order_date: values.date,
      order_time: values.time,
      order_event: values.eventName,
      recurring: values.frequent,
      order_notes: values.eventNotes,
      amount_paid: '0',
      customer_id: '',
      first_name: values.customerName,
      last_name: values.customerLastName,
      email: values.email,
      phone: values.phone,
      street: values.street,
      city: values.city,
      county: values.neighborhood,
      state: values.state,
      zip_code: values.zipcode,
      products: values.products,
    };
    const options = {
      url: '/api/orders/newCustomer',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: order,
    };

    axios(options)
      .then((response) => {
        setPostModalMessage(successMessage);
        setPostModalShow(true);
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setPostModalMessage(failureMessage);
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
    const optionsProducts = {
      url: '/api/products',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    axios(optionsProducts)
      .then((response) => {
        const _products = response.data.products;
        setProducts(_products);
      })
      .catch((error) => {});
    setReady(true);
  }, []);

  return (
    <>
      <Navbar />

      {/* Order received modal */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={postModalShow}
        onHide={() => setPostModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <BsFillInfoCircleFill />
            &nbsp;&nbsp;Aviso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col lg={12}>
                <>{postModalMessage}</>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            href="/"
            onClick={() => setPostModalShow(false)}
          >
            De acuerdo
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Email vaidation modal */}
      <FinalForm onSubmit={validateEmail}>
        {({ handleSubmit, submitting, values }) => (
          <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={validationModalShow}
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                <BsFillPersonCheckFill />
                &nbsp;&nbsp;Hola... ¿de nuevo?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col lg={12}>
                    <h5>
                      Antes de continuar, necesitamos validar si estás de
                      regreso o es tu primera vez por aquí.
                    </h5>
                    <Form.Group>
                      <Form.Label>
                        Ingresa tu dirección de correo a continuación:
                      </Form.Label>
                      <FinalFormField name="email">
                        {({ input }) => (
                          <Form.Control
                            {...input}
                            type="text"
                            placeholder="i.e. joaquin@rios.com"
                          />
                        )}
                      </FinalFormField>
                    </Form.Group>
                    <p>
                      Si ya has ordenado con nosotros, con esto validamos que ya
                      no necesitamos pedirte nuevamente datos como tu dirección.
                    </p>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeValidationModal}>
                Nunca he ordenado
              </Button>
              <Button variant="success" onClick={handleSubmit}>
                Validar correo
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </FinalForm>

      <Container>
        <h1>Nuevo pedido</h1>
        <hr />
        <Row>
          <FinalForm
            onSubmit={onSubmitCreateCustomerOrder}
            initialValues={{ newUser: true }}
            mutators={{ ...arrayMutators }}
          >
            {({ handleSubmit, submitting, values, form }) => (
              <Form>
                <Row>
                  <Col lg={12}>
                    <h2>Información del evento</h2>
                  </Col>
                  <Col lg={7}>
                    <Form.Group>
                      <Form.Label>Nombre del evento</Form.Label>
                      <FinalFormField name="eventName">
                        {({ input }) => (
                          <Form.Control {...input} type="text" size="lg" />
                        )}
                      </FinalFormField>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Fecha</Form.Label>
                      <FinalFormField name="date">
                        {({ input }) => (
                          <Form.Control {...input} type="date" size="lg" />
                        )}
                      </FinalFormField>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Hora de llegada</Form.Label>
                      <FinalFormField name="time">
                        {({ input }) => (
                          <Form.Control {...input} type="time" size="lg" />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={5}>
                    <Form.Group>
                      <Form.Label>Personas</Form.Label>
                      <FinalFormField name="persons">
                        {({ input }) => (
                          <Form.Control {...input} type="number" size="lg" />
                        )}
                      </FinalFormField>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Notas:</Form.Label>
                      <FinalFormField name="eventNotes">
                        {({ input }) => (
                          <Form.Control {...input} type="textarea" size="lg" />
                        )}
                      </FinalFormField>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>¿Tu evento es recurrente?</Form.Label>
                      <FinalFormField name="frequent" type="checkbox">
                        {({ input }) => (
                          <Row>
                            <Col>
                              <Toggle {...input} />
                            </Col>
                          </Row>
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <h2>Qué quieren ordenar:</h2>
                    <p>
                      Utiliza los botones para ir agregando o eliminando
                      productos de tu pedido.
                    </p>
                  </Col>
                  <Col lg={12} className="mt-3">
                    <h4>Productos en este pedido:</h4>
                  </Col>

                  <FinalFormFieldArray name="products">
                    {({ fields }) =>
                      fields.map((field, index) => (
                        <>
                          <Col lg={6}>
                            <Form.Group>
                              <Form.Label>Producto</Form.Label>
                              <FinalFormField
                                name={`${field}.id`}
                                component="select"
                              >
                                {({ input }) => (
                                  <Form.Control
                                    {...input}
                                    as="select"
                                    size="lg"
                                    custom
                                  >
                                    <option />
                                    {products.map((product, index) => {
                                      return (
                                        <option
                                          key={`${index}`}
                                          value={`${product.product_id}`}
                                        >
                                          {product.product_name}{' '}
                                        </option>
                                      );
                                    })}
                                  </Form.Control>
                                )}
                              </FinalFormField>
                            </Form.Group>
                          </Col>

                          <Col lg={2}>
                            <Form.Group>
                              <Form.Label>Cantidad</Form.Label>
                              <FinalFormField
                                name={`${field}.quantity`}
                                initialValue={1}
                              >
                                {({ input }) => (
                                  <Form.Control
                                    {...input}
                                    type="number"
                                    size="lg"
                                  />
                                )}
                              </FinalFormField>
                            </Form.Group>
                          </Col>

                          <Col lg={1} className="mt-4">
                            <BsX
                              size={32}
                              className="text-danger cursor"
                              onClick={() => {
                                fields.remove(index);
                              }}
                            />
                          </Col>

                          <Col lg={3} className="align-right">
                            <Form.Group>
                              <Form.Label></Form.Label>
                              {values.products[index] &&
                                values.products[index].id && (
                                  <h4>
                                    {parseFloat(
                                      values.products[index].quantity
                                    )}{' '}
                                    *{' '}
                                    {
                                      products.find(
                                        (p) =>
                                          p.product_id ==
                                          values.products[index].id
                                      ).price
                                    }{' '}
                                    = ${' '}
                                    {parseFloat(
                                      products.find(
                                        (p) =>
                                          p.product_id ==
                                          values.products[index].id
                                      ).price
                                    ) *
                                      parseFloat(
                                        values.products[index].quantity
                                      )}
                                  </h4>
                                )}
                            </Form.Group>
                          </Col>
                        </>
                      ))
                    }
                  </FinalFormFieldArray>
                  <Col lg={12} className="align-right mt-5">
                    <Button
                      variant="success"
                      onClick={() => form.mutators.push('products', undefined)}
                    >
                      Añadir producto
                    </Button>{' '}
                    <Button
                      variant="danger"
                      onClick={() => form.mutators.pop('products')}
                    >
                      Borrar último producto
                    </Button>
                  </Col>

                  <Col lg={8} className="align-right mt-4">
                    {values.products && values.products.length > 0 && (
                      <h4>Total: </h4>
                    )}
                  </Col>
                  <Col lg={4} className="align-right mt-4">
                    {values.products && values.products.length > 0 && (
                      <h4> $ {getProductsSum(values.products)}</h4>
                    )}
                  </Col>

                  <Col className="align-right">
                    <h5 className="mt-3">
                      <BsFillPeopleFill />
                      &nbsp; Para [x] personas, recomendamos [x] kilos.
                    </h5>
                  </Col>

                  {userID < 0 && (
                    <>
                      <Col lg={12}>
                        <h2>Tu información:</h2>
                      </Col>
                      <Col lg={6}>
                        <Form.Group>
                          <Form.Label>Nombre</Form.Label>
                          <FinalFormField name="customerName">
                            {({ input }) => (
                              <Form.Control {...input} type="text" size="lg" />
                            )}
                          </FinalFormField>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Apellidos</Form.Label>
                          <FinalFormField name="customerLastName">
                            {({ input }) => (
                              <Form.Control {...input} type="text" size="lg" />
                            )}
                          </FinalFormField>
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group>
                          <Form.Label>Teléfono</Form.Label>
                          <FinalFormField name="phone">
                            {({ input }) => (
                              <Form.Control {...input} type="text" size="lg" />
                            )}
                          </FinalFormField>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Correo electrónico</Form.Label>
                          <FinalFormField name="email">
                            {({ input }) => (
                              <Form.Control {...input} type="text" size="lg" />
                            )}
                          </FinalFormField>
                        </Form.Group>
                      </Col>

                      <Col lg={12}>
                        <h4>Dirección:</h4>
                        <Form.Group>
                          <Form.Label>Calle</Form.Label>
                          <FinalFormField name="street">
                            {({ input }) => (
                              <Form.Control
                                {...input}
                                type="text"
                                size="lg"
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
                                size="lg"
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
                                size="lg"
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
                                size="lg"
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
                                size="lg"
                                placeholder="i.e. Ciudad de México"
                              />
                            )}
                          </FinalFormField>
                        </Form.Group>
                      </Col>
                    </>
                  )}

                  <Col lg={12}>
                    <h2>Forma de pago:</h2>
                  </Col>

                  <Col lg={12}>
                    <Form.Group>
                      <Form.Label>Selecciona tu método de pago</Form.Label>
                      <FinalFormField name="paymentMethod" component="select">
                        {({ input }) => (
                          <Form.Control {...input} as="select" custom>
                            <option />
                            <option>Tarjeta de débito/crédito</option>
                            <option>PayPal</option>
                            <option>Transferencia bancaria</option>
                          </Form.Control>
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>
                  <br />
                  <Col lg={6}>
                    <Button variant="secondary" size="lg" href="/">
                      Cancelar
                    </Button>
                  </Col>
                  <Col lg={6} className="align-right">
                    <Button variant="primary" size="lg" onClick={handleSubmit}>
                      Guardar pedido
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </FinalForm>
        </Row>
        <hr />
        <Row className="pt-1 pb-5">
          <Col className="bold">Cocina Mary © 2020</Col>
          <Col className="bold align-right">
            Dr Mora 9, Centro, Cuauhtemoc, 06000, Ciudad de México.{' '}
          </Col>
        </Row>
      </Container>
    </>
  );
};
