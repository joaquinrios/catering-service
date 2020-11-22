import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import { BsFillPeopleFill } from 'react-icons/bs';

import { Navbar } from '../components/navbar';

export const NewCustomerOrder = () => {
  const [modalShow, setModalShow] = useState(false);
  
  // TODO: Bobby
  const onSubmitForm = (values) => {
    console.log('form submitted', values);
  };
  return (
    <>
      <Navbar />
      <Modal
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>¡Listo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col lg={8}>
                <h5>Hemos recibido la información sobre tu pedido.</h5>
                <p>
                  En Cocina Mary, darles a nuestros clientes la mejor
                  experiencia es lo que hacemos mejor, y para ti no será la excepción.
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
            <Button variant='info' onClick={() => setModalShow(false)}>
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
              onSubmit={onSubmitForm}
              initialValues={{ newUser: true }}
            >
              {({ handleSubmit, submitting, values }) => (
                <Form>
                  <Col lg={8}>
                    <h2>Información del evento</h2>
                    <Form.Group>
                      <Form.Label>Fecha</Form.Label>
                      <FinalFormField name='date'>
                        {({ input }) => (
                          <Form.Control {...input} type='date' size='lg' />
                        )}
                      </FinalFormField>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Hora de llegada</Form.Label>
                      <FinalFormField name='time'>
                        {({ input }) => (
                          <Form.Control {...input} type='time' size='lg' />
                        )}
                      </FinalFormField>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Personas</Form.Label>
                      <FinalFormField name='persons'>
                        {({ input }) => (
                          <Form.Control {...input} type='number' size='lg' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <h2>Qué quieren ordenar:</h2>
                  <h2>TODO: logica añadir/borrar items</h2>
                  <Row>
                    <Col>
                      <p>[autosuggest platillo]</p>
                    </Col>
                    <Col>
                      <p>[toggle kg, lt, unidades]</p>
                    </Col>
                    <Col>
                      <p>[precio (calculated programatically)]</p>
                    </Col>
                    <Col>
                      <p>boton borrar item</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3>Total:</h3>
                    </Col>
                    <Col>
                      <h3>$00.00 (calculated)</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Indicaciones adicionales:</Form.Label>
                        <FinalFormField name='orderNotes'>
                          {({ input }) => (
                            <Form.Control {...input} type='textarea' />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>
                        <BsFillPeopleFill />
                        &nbsp; 'Para [x] personas, recomendamos [x] kilos.'
                      </h4>
                    </Col>
                  </Row>
                  <hr />
                  <h2>Tu información:</h2>
                  <Row>
                    <Col lg={8}>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <FinalFormField name='customerName'>
                          {({ input }) => (
                            <Form.Control {...input} type='text' size='lg' />
                          )}
                        </FinalFormField>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Apellidos</Form.Label>
                        <FinalFormField name='customerName'>
                          {({ input }) => (
                            <Form.Control {...input} type='text' size='lg' />
                          )}
                        </FinalFormField>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <FinalFormField name='phone'>
                          {({ input }) => (
                            <Form.Control {...input} type='text' size='lg' />
                          )}
                        </FinalFormField>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Correo electrónico</Form.Label>
                        <FinalFormField name='email'>
                          {({ input }) => (
                            <Form.Control {...input} type='text' size='lg' />
                          )}
                        </FinalFormField>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Nombre del evento:</Form.Label>
                        <FinalFormField name='eventName'>
                          {({ input }) => (
                            <Form.Control {...input} type='text' size='lg' />
                          )}
                        </FinalFormField>
                      </Form.Group>

                      <h3>Dirección:</h3>
                      <Form.Group>
                        <Form.Label>Calle</Form.Label>
                        <FinalFormField name='street'>
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type='text'
                              size='lg'
                              placeholder='i.e. C Dr Mora 9'
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Colonia</Form.Label>
                        <FinalFormField name='neighborhood'>
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type='text'
                              size='lg'
                              placeholder='i.e. Centro'
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Alcaldía / Municipio</Form.Label>
                        <FinalFormField name='city'>
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type='text'
                              size='lg'
                              placeholder='i.e. Cuauhtémoc'
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Código postal</Form.Label>
                        <FinalFormField name='zipcode'>
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type='text'
                              size='lg'
                              placeholder='i.e. 06000'
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Estado</Form.Label>
                        <FinalFormField name='state'>
                          {({ input }) => (
                            <Form.Control
                              {...input}
                              type='text'
                              size='lg'
                              placeholder='i.e. Ciudad de México'
                            />
                          )}
                        </FinalFormField>
                      </Form.Group>

                    </Col>
                  </Row>

                  <h2>Forma de pago:</h2>
                  <Form.Group>
                    <Form.Label>Selecciona tu método de pago</Form.Label>
                    <FinalFormField name='paymentMethod'>
                      {({ input }) => (
                        <Form.Control as='select'>
                          <option />
                          <option>Tarjeta de débito/crédito</option>
                          <option>PayPal</option>
                          <option>Transferencia</option>
                        </Form.Control>
                      )}
                    </FinalFormField>
                  </Form.Group>

                  <Row>
                    <Col lg={4} md={8}>
                      <Button variant='primary'>Cancelar</Button>
                    </Col>
                    <Col lg={8} md={4}>
                      <Button variant='primary' onClick={handleSubmit}>
                        Guardar pedido
                      </Button>
                    </Col>
                  </Row>
                  {/* TODO: mover logica para mostrar modal y quitar esto */}
                  <Row>
                    <Col>
                      <Button onClick={() => setModalShow(true)}>
                        prueba modal
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </FinalForm>
          </Row>
        </Container>
      </Container>
    </>
  );
};
