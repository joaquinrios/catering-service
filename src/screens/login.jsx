import React from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form'; 

import { Navbar } from '../components/navbar';

import { auth } from '../fb_app';

export const Login = (props) => {

  const onSubmitLogin = async ({ email, password }) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar/>
      <Container>
        <Row>
          <Col lg={12} className='text-center'><h1>Iniciar Sesión</h1></Col>
          <Col lg={{offset: 4, span: 4}}> 
          <FinalForm onSubmit={onSubmitLogin}>
            {({handleSubmit, submitting}) => (
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <FinalFormField name='email'>
                    {({ input }) => (
                      <Form.Control {...input} type='email' placeholder='i.e. catering@service.com' size='lg' />
                    )}
                  </FinalFormField>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <FinalFormField name='password'>
                    {({ input }) => (
                      <Form.Control {...input} type='password' size='lg' />
                    )}
                  </FinalFormField>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            )} 
          </FinalForm>
            
          </Col>
        </Row>
      </Container>
    </>
  )
}