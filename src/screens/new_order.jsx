import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';

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
                  <FinalFormField name="number">
                    {({ input }) => <Form.Control {...input} type="number" />}
                  </FinalFormField>
                </Form.Group>

                <h2>Datos del cliente</h2>
                <h3>[dropdown cliente nuevo]</h3>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <FinalFormField name="firstName">
                    {({ input }) => <Form.Control {...input} type="text" />}
                  </FinalFormField>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <FinalFormField name="firstName">
                    {({ input }) => <Form.Control {...input} type="text" />}
                  </FinalFormField>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Correo electrónico</Form.Label>
                  <FinalFormField name="firstName">
                    {({ input }) => <Form.Control {...input} type="text" />}
                  </FinalFormField>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Evento:</Form.Label>
                  <FinalFormField name="firstName">
                    {({ input }) => <Form.Control {...input} type="text" />}
                  </FinalFormField>
                </Form.Group>
                <h3>[Recurrente: checkbox]</h3>
                <h3>[Notas: textarea]</h3>
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
