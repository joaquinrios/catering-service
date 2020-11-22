import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField,  } from 'react-final-form';
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays'
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

  const onSubmitCreateOrder = (values) => {
    console.log('form submitted', values);
  }
  return (
    <>
      <Navbar />
      <Container>
        <h1>Nuevo pedido</h1>
        <hr/>
        
          
          <FinalForm onSubmit={onSubmitCreateOrder} initialValues={{ newUser: true, products: [undefined] }} mutators={{ ...arrayMutators }}>
            {({ handleSubmit, submitting, values, form }) => (
              <Form>
                <Row>
                  <Col lg={12}><h2>Información del evento</h2></Col>
                  <Col lg={7}>
                    <Form.Group>
                      <Form.Label>Nombre del evento</Form.Label>
                      <FinalFormField name='eventName'>
                        {({ input }) => <Form.Control {...input} type='text' size='lg'/>}
                      </FinalFormField>
                    </Form.Group>

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
                  </Col>

                  <Col lg={5}>
                    <Form.Group>
                      <Form.Label>Personas</Form.Label>
                      <FinalFormField name='persons'>
                        {({ input }) => <Form.Control {...input} type='number' size='lg' />}
                      </FinalFormField>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Notas:</Form.Label>
                      <FinalFormField name='eventNotes'>
                        {({ input }) => <Form.Control {...input} type='textarea' size='lg'/>}
                      </FinalFormField>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>¿El evento es recurrente?</Form.Label>
                      <FinalFormField name='frequent' type='checkbox'>
                        {({ input }) => <Row><Col><Toggle {...input} /></Col></Row>}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={12}><h2>Cliente</h2></Col>
                  
                  <Col lg={8} className='mb-3'>  
                    <Form.Group>
                      <Form.Label>¿Es nuevo cliente? [TODO - no jala unu]</Form.Label>
                      <FinalFormField name='newUser' type='checkbox'>
                        {({ input }) => <Row><Col><Toggle {...input} /></Col></Row>}
                      </FinalFormField>
                    </Form.Group>
                  </Col>
                    { values.newUser ? (<>
                    <Col lg={6}>
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
                    </Col>
                    <Col lg={6}>
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
                      <h3>Dirección [TODO - Bobby]</h3>
                      <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <FinalFormField name='address'>
                          {({ input }) => <Form.Control {...input} type='text' size='lg'/>}
                        </FinalFormField>
                      </Form.Group>
                    </Col>
                    </>) : (<>
                    {console.log(values)}
                    <Col lg={8}>
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
                      </Col>
                    </>)}

                  <Col lg={6} className='mt-5'><h2>Datos del pedido</h2></Col>
                  <Col lg={6} className='align-right mt-5'>
                    <Button variant='success' onClick={() => form.mutators.push('products', undefined)}>Añadir producto</Button> {' '}
                    <Button variant='danger' onClick={(() => form.mutators.pop('products'))}>Borrar último producto</Button>
                  </Col>

                  <FinalFormFieldArray name='products'>
                    {({ fields }) => fields.map((name, index) => (<>
                        <Col lg={8}>
                          <Form.Group>
                            <Form.Label>Producto [TODO - Bobby - Adjust col lengths]</Form.Label>
                            <FinalFormField name={`${name}.name`}>
                              {({ input }) => <Form.Control {...input} type='text' size='lg'/>}
                            </FinalFormField>
                          </Form.Group>
                        </Col>

                        <Col lg={4}>
                          <Form.Group>
                            <Form.Label>Cantidad [TODO - Bobby - col medida]</Form.Label>
                            <FinalFormField name={`${name}.measurement`}>
                              {({ input }) => <Form.Control {...input} type='number' size='lg'/>}
                            </FinalFormField>
                          </Form.Group>
                        </Col>
                    </>))}
                  </FinalFormFieldArray>

                  <Col lg={8} className='align-right'>
                    <h4>Total: </h4>
                  </Col>
                  <Col lg={4} className='align-right'>
                    <h4>$ 1500.00</h4>
                  </Col>

                  <Col lg={12} className='mb-5 mt-4 align-right'>
                    {/* is it handleSubmit? */}
                    <Button variant='primary' size='lg' onClick={handleSubmit}>Guardar pedido</Button>
                  </Col>
                
                </Row>
              </Form>
            )}
          </FinalForm>
        
      </Container>
    </>
  );
};
