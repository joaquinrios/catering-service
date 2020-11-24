import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays';
import axios from 'axios';
import arrayMutators from 'final-form-arrays';
import Toggle from 'react-toggle';
// import Autosuggest from 'react-autosuggest';
import { BsFillPeopleFill, BsX } from 'react-icons/bs';

import { Navbar } from '../components/navbar';

export const NewCustomerOrder = ({props}) => {
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const getProductsSum = (selectedProducts) => {
    const ids = selectedProducts.map((product) => {
      if (product !== undefined && product.hasOwnProperty('id')) {
        return product.id;
      }
    });
    let total = 0
    
    ids.forEach(id => {
      let currentProduct = products.find(p =>  p.product_id == id);
      total += currentProduct != undefined ? parseFloat(currentProduct.price) : 0
    });
    return total
  }

  // TODO: Bobby
  const onSubmitCreateCustomerOrder = (values) => {
    console.log('form submitted', values);
    setModalShow(true);
  };

  useEffect(() => {
    const optionsProducts = {
      url: '/api/products',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    axios(optionsProducts).then((response) => {
      const _products = response.data.products;
      setProducts(_products);
    }).catch((error) => { });
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
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">¡Listo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col lg={8}>
                <h5>Hemos recibido la información sobre tu pedido.</h5>
                <p>
                  En Cocina Mary, darles a nuestros clientes la mejor
                  experiencia es lo que hacemos mejor, y para ti no será la
                  excepción.
                </p>
                <p>
                  Te llamaremos pronto para confirmar tu orden y platicar
                  detalles adicionales.
                </p>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" href='/' onClick={() => setModalShow(false)}>
            De acuerdo
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
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
                            <Form.Control
                              {...input}
                              type="textarea"
                              size="lg"
                            />
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
                    </Col>

                    <Col lg={6} className='mt-5'><h2>Datos del pedido</h2></Col>
                  <Col lg={6} className='align-right mt-5'>
                    <Button variant='success' onClick={() => form.mutators.push('products', undefined)}>Añadir producto</Button> {' '}
                    <Button variant='danger' onClick={(() => form.mutators.pop('products'))}>Borrar último producto</Button>
                  </Col>

                  <FinalFormFieldArray name='products'>
                    {({ fields }) => fields.map((field, index) => (<>
                        <Col lg={6} >
                          <Form.Group>
                            <Form.Label>Producto</Form.Label>
                            <FinalFormField name={`${field}.id`} component='select'>
                              {({ input }) => (
                                <Form.Control {...input} as='select' size='lg' custom>
                                  <option/>
                                  { products.map((product, index) => {
                                    return ( <option key={`${index}`} value={`${product.product_id}`}>{product.product_name} </option>
                                  )})}
                                </Form.Control>
                              )}
                            </FinalFormField>
                          </Form.Group>
                        </Col>

                        <Col lg={2}>
                          <Form.Group>
                            <Form.Label>Cantidad</Form.Label>
                            <FinalFormField name={`${field}.quantity`} initialValue={1}>
                              {({ input }) => <Form.Control {...input} type='number' size='lg'/>}
                            </FinalFormField>
                          </Form.Group>
                        </Col>

                        <Col lg={1} className='mt-4'>
                          <BsX size={32} className='text-danger cursor' onClick={() => {fields.remove(index)}}/>
                        </Col>

                        <Col lg={3} className='align-right'>
                          <Form.Group>
                            <Form.Label></Form.Label>
                            { values.products[index] && values.products[index].id && (<h4>{parseFloat(values.products[index].quantity)} * {products.find(p => p.product_id == values.products[index].id).price} = $ {parseFloat(products.find(p => p.product_id == values.products[index].id).price) * parseFloat(values.products[index].quantity)}</h4>) }
                          </Form.Group>
                        </Col>
                    </>))}
                  </FinalFormFieldArray>

                  <Col lg={8} className='align-right'>
                  { values.products && values.products.length > 0 && (<h4>Total: </h4>)}
                  </Col>
                  <Col lg={4} className='align-right'>
                    { values.products && values.products.length > 0 && (<h4> $ { getProductsSum(values.products)}</h4>)}
                  </Col>




                    <Col>
                      <h4>
                        <BsFillPeopleFill />
                        &nbsp; Para [x] personas, recomendamos [x] kilos.
                      </h4>
                    </Col>

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

                    <Col lg={12}>
                      <h2>Forma de pago:</h2>
                    </Col>

                    <Col lg={12}>
                      <Form.Group>
                        <Form.Label>Selecciona tu método de pago</Form.Label>
                        <FinalFormField name="paymentMethod" component='select'>
                          {({ input }) => (
                            <Form.Control {...input} as="select" custom>
                              <option />
                              <option>Tarjeta de débito/crédito</option>
                              <option>PayPal</option>
                              <option>Transferencia</option>
                            </Form.Control>
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>
                    <br />
                    <Col lg={6}>
                      <Button variant="secondary" size="lg">
                        Cancelar
                      </Button>
                    </Col>
                    <Col lg={6} className="align-right">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                      >
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
      </Container>
    </>
  );
};
