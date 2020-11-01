import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import Toggle from "react-toggle";

import { Navbar } from '../components/navbar';

export const NewOrder = ({props}) => {

  const onSubmitForm = () => {
    console.log('form submitted');
  }
  return (
    <>
      <Navbar />
      <Container>
        <h1>Nuevo pedido:</h1>

        <Row>
          <FinalForm onSubmit={onSubmitForm}>
            {({ handleSubmit, submitting }) => (
              <Form>
                <Form.Group>
                  <Form.Label>Fecha</Form.Label>
                  <FinalFormField name="date">
                    {({ input }) => <Form.Control {...input} type="date" />}
                  </FinalFormField>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Hora de llegada</Form.Label>
                  <FinalFormField name="time">
                    {({ input }) => <Form.Control {...input} type="time" />}
                  </FinalFormField>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Personas</Form.Label>
                  <FinalFormField name="persons">
                    {({ input }) => <Form.Control {...input} type="number" />}
                  </FinalFormField>
                </Form.Group>

                <h2>Datos del cliente</h2>
                <Form.Group>
                  <FinalFormField name="newUser" type="checkbox">
                    {({ input }) => <Toggle {...input} />}
                  </FinalFormField>
                  <Form.Label>¿Es nuevo cliente?</Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <FinalFormField name="customerName">
                    {({ input }) => <Form.Control {...input} type="text" />}
                  </FinalFormField>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <FinalFormField name="phone">
                    {({ input }) => <Form.Control {...input} type="text" />}
                  </FinalFormField>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Correo electrónico</Form.Label>
                  <FinalFormField name="email">
                    {({ input }) => <Form.Control {...input} type="text" />}
                  </FinalFormField>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Evento:</Form.Label>
                  <FinalFormField name="eventName">
                    {({ input }) => <Form.Control {...input} type="text" />}
                  </FinalFormField>
                </Form.Group>
                <Form.Group>
                  <FinalFormField name="frequent" type="checkbox">
                    {({ input }) => <Toggle {...input} />}
                  </FinalFormField>
                  <Form.Label>¿El evento es recurrente?</Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Notas:</Form.Label>
                  <FinalFormField name="eventNotes">
                    {({ input }) => <Form.Control {...input} type="textarea" />}
                  </FinalFormField>
                </Form.Group>
                <h2>Datos del pedido</h2>
              </Form>
            )}
          </FinalForm>
        </Row>

        <Row>
          <Col lg={4} md={8}>
            <Button variant="primary">Cancelar</Button>
          </Col>
          <Col lg={8} md={4}>
            <Button variant="primary">Guardar pedido</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
