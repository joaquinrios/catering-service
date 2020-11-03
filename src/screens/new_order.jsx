import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import Toggle from 'react-toggle';
import Autosuggest from 'react-autosuggest';

import { Navbar } from '../components/navbar';

export const NewOrder = ({props}) => {
  const [clients, setClients] = useState([{ name: 'Roberto', lastname: 'Perezyera', email: 'roberto@mora.com'}, { name: 'Robertito', lastname: 'Perezyera', email: 'robertito@mora.com'}, { name: 'Robertote', lastname: 'Perezyera', email: 'robertote@mora.com'}]);
  const [existingUser, setExistingUser] = useState(null);
  const [suggestions, setSuggestions] = useState(clients);
  
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : clients.filter(client => client.name.toLowerCase().slice(0, inputLength) === inputValue);
  }
  const getSuggestionValue = (suggestion) => {
    setExistingUser(suggestion);
    return suggestion.name + ' ' + suggestion.lastname
  }; 
  const renderSuggestion = (suggestion) => (<div> { suggestion.name} {suggestion.lastname}</div>)
  
  const onSuggestionsFetchRequested = ({ value }) => setSuggestions(getSuggestions(value));
  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onSubmitForm = (values) => {
    console.log('form submitted', values);
  }
  return (
    <>
      <Navbar />
      <Container>
        <h1>Nuevo pedido</h1>
        <hr/>
        <Row>
          
          <FinalForm onSubmit={onSubmitForm} initialValues={{ newUser: true }}>
            {({ handleSubmit, submitting, values }) => (
              <Form>
                <Col lg={8}>
                  <h2>Información del evento</h2>
                  <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <FinalFormField name='date'>
                      {({ input }) => <Form.Control {...input} type='date' size='lg'/>}
                    </FinalFormField>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Hora de llegada</Form.Label>
                    <FinalFormField name='time'>
                      {({ input }) => <Form.Control {...input} type='time' size='lg'/>}
                    </FinalFormField>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Personas</Form.Label>
                    <FinalFormField name='persons'>
                      {({ input }) => <Form.Control {...input} type='number' size='lg' />}
                    </FinalFormField>
                  </Form.Group>
                </Col>

                <Col lg={8}>
                  <h2>Cliente</h2>
                  <Form.Group>
                    <Form.Label>¿Es nuevo cliente?</Form.Label>
                    <FinalFormField name='newUser' type='checkbox'>
                      {({ input }) => <Row><Col><Toggle {...input} /></Col></Row>}
                    </FinalFormField>
                  </Form.Group>
                  
                  { values.newUser ? (<>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <FinalFormField name='customerName'>
                        {({ input }) => <Form.Control {...input} type='text' size='lg'/>}
                      </FinalFormField>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Apellidos</Form.Label>
                      <FinalFormField name='customerName'>
                        {({ input }) => <Form.Control {...input} type='text' size='lg'/>}
                      </FinalFormField>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Teléfono</Form.Label>
                      <FinalFormField name='phone'>
                        {({ input }) => <Form.Control {...input} type='text' size='lg' />}
                      </FinalFormField>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Correo electrónico</Form.Label>
                      <FinalFormField name='email'>
                        {({ input }) => <Form.Control {...input} type='text' size='lg'/>}
                      </FinalFormField>
                    </Form.Group>
                  </>) : (<>
                    <Form.Group>
                      <Form.Label>Cliente</Form.Label>
                      <FinalFormField name='customer'>
                        {({ input }) => <>
                        <Autosuggest
                        suggestions={suggestions} 
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested} 
                        onSuggestionsClearRequested={onSuggestionsClearRequested} 
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        onSuggestionSelected={(_, { suggestionValue }) => {
                          input.onChange(suggestionValue);
                        }}
                        inputProps={{name: input.name, value: input.value, onChange: input.onChange, className: 'form-control-lg form-control', placeholder: 'Escriba el nombre del cliente...'}}/>
        
                        </>}
                      </FinalFormField>
                    </Form.Group>
                  </>)}
                  
                  <Form.Group>
                    <Form.Label>Evento:</Form.Label>
                    <FinalFormField name='eventName'>
                      {({ input }) => <Form.Control {...input} type='text' size='lg'/>}
                    </FinalFormField>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>¿El evento es recurrente?</Form.Label>
                    <FinalFormField name='frequent' type='checkbox'>
                      {({ input }) => <Row><Col><Toggle {...input} /></Col></Row>}
                    </FinalFormField>
                    
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Notas:</Form.Label>
                    <FinalFormField name='eventNotes'>
                      {({ input }) => <Form.Control {...input} type='textarea' size='lg'/>}
                    </FinalFormField>
                  </Form.Group>
                </Col>

                
                <h2>Datos del pedido</h2>
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
                  <Col lg={4} md={8}>
                    <Button variant="primary">Cancelar</Button>
                  </Col>
                  <Col lg={8} md={4}>
                    <Button variant="primary" onClick={handleSubmit }>Guardar pedido</Button>
                  </Col>
                </Row>
              </Form>
            )}
          </FinalForm>
          
        </Row>

        
      </Container>
    </>
  );
};
