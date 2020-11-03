import React, { useState } from 'react';
import { Container, Row, Col, Button, Accordion, Card, Modal, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';

import { Navbar } from '../components/navbar';

export const Customers = (props) => {
  const [modalShow, setModalShow] = useState(false);
  
  const onSubmitCreateCustomer = (values) => {

  }

  return (
    <>
      <Navbar />
      <FinalForm onSubmit={onSubmitCreateCustomer}>
        {({handleSubmit, submitting}) => (
          <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={modalShow} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Añadir un nuevo cliente
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col lg={12}><h3>Información básica</h3></Col>
                  <Col lg={4}>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <FinalFormField name='name'>
                        {({input }) => (
                          <Form.Control {...input} type='text' placeholder='i.e. Juanito' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={8}>
                    <Form.Group>
                      <Form.Label>Apellidos</Form.Label>
                      <FinalFormField name='lastname'>
                        {({input }) => (
                          <Form.Control {...input} type='text' placeholder='i.e. Alimañana' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Correo electrónico</Form.Label>
                      <FinalFormField name='email'>
                        {({input }) => (
                          <Form.Control {...input} type='text' placeholder='i.e. juanito@alimaña.com' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Teléfono</Form.Label>
                      <FinalFormField name='phone'>
                        {({input }) => (
                          <Form.Control {...input} type='text' placeholder='i.e. 55 5495 4928' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={12}>
                    <Form.Group>
                      <Form.Label>Notas / Datos adicionales</Form.Label>
                      <FinalFormField name='notes'>
                        {({input }) => (
                          <Form.Control {...input} type='textarea' placeholder='i.e. Sin mucha maña' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={12}><h3>Dirección</h3></Col>
                  <Col lg={12}>
                    <Form.Group>
                      <Form.Label>Calle</Form.Label>
                      <FinalFormField name='street'>
                        {({input }) => (
                          <Form.Control {...input} type='text' placeholder='i.e. C Dr Mora 9' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Colonia</Form.Label>
                      <FinalFormField name='neighborhood'>
                        {({input }) => (
                          <Form.Control {...input} type='text' placeholder='i.e. Centro' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Alcaldía / Municipio</Form.Label>
                      <FinalFormField name='city'>
                        {({input }) => (
                          <Form.Control {...input} type='text' placeholder='i.e. Cuauhtémoc' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Código postal</Form.Label>
                      <FinalFormField name='zipcode'>
                        {({input }) => (
                          <Form.Control {...input} type='text' placeholder='i.e. 06000' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Estado</Form.Label>
                      <FinalFormField name='state'>
                        {({input }) => (
                          <Form.Control {...input} type='text' placeholder='i.e. Ciudad de México' />
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setModalShow(false)}>Cerrar</Button>
              <Button variant='success'>Crear cliente</Button>
            </Modal.Footer>
          </Modal>
        )}
      </FinalForm>

      <Container>
        <Row>
          <Col lg={6} md={6}>
            <h1>Clientes</h1>
          </Col>
          <Col lg={6} md={6} className='align-right'> 
            <Button variant='primary' size='lg' onClick={() => setModalShow(true)} >Nuevo cliente</Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col lg={8}>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Row>
                    <Col>
                      <h4>Sr. Roberto Perezyera</h4>
                      <p>Último pedido: Oct 11</p>
                      
                    </Col>
                    <Col className='align-right'>
                      <h4>21 años</h4>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  <Row>               
                      <Col lg={6}>
                        <p>
                          C. Dr. Mora 9 <br/>
                          Centro, Cuauhtemoc <br/>
                          06000, Ciuda de México, CDMX <br/>
                        </p>
                        <h4>Último evento</h4>
                        <p>
                          Cena familiar, Oct 11, 7:00 PM
                        </p>
                      </Col>
                      <Col lg={6} className='align-right'>
                        <p>
                          Teléfono: 55 6892 1923 <br/>
                          Correo: roberto@mora.com <br/>
                          <br/>
                        </p>
                      </Col>
                      <Col lg={12} className='align-right'>
                        <Button variant='info' size='sm'>Añadir evento</Button>{' '}
                        <Button variant='primary' size='sm'>Editar información</Button>
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
