import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import Toggle from 'react-toggle';
import Autosuggest from 'react-autosuggest';
import { BsFillPeopleFill } from 'react-icons/bs';

import { Navbar } from '../components/navbar';

export const NewCustomerOrder = () => {
  const onSubmitForm = (values) => {
    console.log('form submitted', values);
  };
  return (
    <>
      <Navbar />
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

                    <Form.Group>
                      <Form.Label>Personas</Form.Label>
                      <FinalFormField name="persons">
                        {({ input }) => (
                          <Form.Control {...input} type="number" size="lg" />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <h2>Qué quieren ordenar:</h2>
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
                        <FinalFormField name="orderNotes">
                          {({ input }) => (
                            <Form.Control {...input} type="textarea" />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>
                        <BsFillPeopleFill />&nbsp;
                        "Para [x] personas, recomendamos [x] kilos."
                      </h4>
                    </Col>
                  </Row>
                  <hr />
                  <h2>Tu información:</h2>
                  <Row>
                    <Col lg={8}>
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
                        <FinalFormField name="customerName">
                          {({ input }) => (
                            <Form.Control {...input} type="text" size="lg" />
                          )}
                        </FinalFormField>
                      </Form.Group>
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
                      <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <FinalFormField name="address">
                          {({ input }) => (
                            <Form.Control {...input} type="text" size="lg" />
                          )}
                        </FinalFormField>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Evento:</Form.Label>
                        <FinalFormField name="eventName">
                          {({ input }) => (
                            <Form.Control {...input} type="text" size="lg" />
                          )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>
                  </Row>

                  <h2>Forma de pago:</h2>
                  <Form.Group>
                    <Form.Label>Selecciona tu método de pago</Form.Label>
                    <FinalFormField name="paymentMethod">
                      {({ input }) => (
                        <Form.Control as="select">
                          <option>Tarjeta de débito/crédito</option>
                          <option>PayPal</option>
                          <option>Transferencia</option>
                        </Form.Control>
                      )}
                    </FinalFormField>
                  </Form.Group>

                  <Row>
                    <Col lg={4} md={8}>
                      <Button variant="primary">Cancelar</Button>
                    </Col>
                    <Col lg={8} md={4}>
                      <Button variant="primary" onClick={handleSubmit}>
                        Guardar pedido
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
