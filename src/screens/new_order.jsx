import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { Form as FinalForm, Field as FinalFormField,  } from 'react-final-form';
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays';
import axios from 'axios';
import arrayMutators from 'final-form-arrays'
import Toggle from 'react-toggle';
import Autosuggest from 'react-autosuggest';

import { Navbar } from '../components/navbar';

export const NewOrder = ({props}) => {
  const [ready, setReady] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [existingUser, setExistingUser] = useState(null);
  const [suggestions, setSuggestions] = useState(customers);
  
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

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : customers.filter(customer => 
      (customer.first_name.toLowerCase().includes(inputValue.toLowerCase())) ||
      (customer.last_name.toLowerCase().includes(inputValue.toLowerCase())));
  }
  const getSuggestionValue = (suggestion) => {
    setExistingUser(suggestion);
    return suggestion.first_name + ' ' + suggestion.last_name
  }; 
  const renderSuggestion = (suggestion) => (
    <Row>
      <Col lg={6}>
        {suggestion.first_name} {suggestion.last_name}
      </Col>
      <Col lg={6} className='align-right'>
        {suggestion.email}
      </Col>
      <Col lg={12}><hr/></Col>
      <Col>
        {suggestion.street} <br />
        {suggestion.city} <br />
        {suggestion.zip_code}, {suggestion.county} <br />
      </Col>
      <Col className='align-right'>
        {suggestion.phone}
      </Col>
    </Row>
  );
  
  const onSuggestionsFetchRequested = ({ value }) => setSuggestions(getSuggestions(value));
  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onSubmitCreateOrder = (values) => {
    console.log(existingUser);
    console.log(values);
    const order = {
      order_date: values.date,
      order_event: values.eventName,
      recurring: values.frequent,
      order_notes: values.eventNotes,
      // TODO
      total_price: '42',
      amount_paid: '42',
      customer_id: existingUser ? existingUser.customer_id : '',
      first_name: values.customerName,
      last_name: values.customerLastName,
      email: values.email,
      phone: values.phone,
      street: values.street,
      city: values.city,
      county: values.county,
      state: values.state,
      zip_code: values.zipcode,
      products: values.products
    };
    const options = {
      url: existingUser ? '/api/orders/' : '/api/orders/newCustomer',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: order
    };

    axios(options).then((response) => {
      // TODO - Bobby ? modal ?
      // setPostModalMessage('El nuevo cliente se ha guardado con éxito.');
      // setPostModalShow(true);
      setTimeout(() => window.location.reload(), 2000);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        // setPostModalMessage('Ha habido un error. Por favor, intenta más tarde.');
        // setPostModalShow(true);
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
  }

  useEffect(() => {
    const optionsCustomers = {
      url: '/api/customers',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    const optionsProducts = {
      url: '/api/products',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    axios(optionsCustomers).then((response) => {
      const _customers = response.data.customers;
      setCustomers(_customers);
    }).catch((error) => { });
    axios(optionsProducts).then((response) => {
      const _products = response.data.products;
      setProducts(_products);
    }).catch((error) => { });
    setReady(true);
  }, []);

  return ready && customers && products && (
    <>
      <Navbar />
      <Container>
        <h1>Nuevo pedido</h1>
        <hr/>
          <FinalForm onSubmit={onSubmitCreateOrder} initialValues={{ newUser: true }} mutators={{ ...arrayMutators }}>
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
                      <Form.Label>¿Es nuevo cliente?</Form.Label>
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
                        <FinalFormField name='customerLastName'>
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
                    </Col>

                    <Col lg={12}>
                      <h4>Dirección:</h4>
                      <Form.Group>
                        <Form.Label>Calle</Form.Label>
                        <FinalFormField name='street'>
                          {({ input }) => ( <Form.Control {...input} type='text' size='lg' placeholder='i.e. C Dr Mora 9' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Colonia</Form.Label>
                        <FinalFormField name='neighborhood'>
                          {({ input }) => ( <Form.Control {...input} type='text' size='lg' placeholder='i.e. Centro' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Alcaldía / Municipio</Form.Label>
                        <FinalFormField name='city'>
                          {({ input }) => ( <Form.Control {...input} type='text' size='lg' placeholder='i.e. Cuauhtémoc' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Código postal</Form.Label>
                        <FinalFormField name='zipcode'>
                          {({ input }) => ( <Form.Control {...input} type='text' size='lg' placeholder='i.e. 06000' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Estado</Form.Label>
                        <FinalFormField name='state'>
                          {({ input }) => ( <Form.Control {...input} type='text' size='lg' placeholder='i.e. Ciudad de México' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>
                    </>) : (<>
                    <Col lg={6}>
                      <Form.Group>
                        <Form.Label>Cliente</Form.Label>
                        <FinalFormField name='customer'>
                          {({ input }) => <>
                          <Autosuggest suggestions={suggestions} 
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested} 
                            onSuggestionsClearRequested={onSuggestionsClearRequested} 
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            onSuggestionSelected={(_, { suggestionValue }) => {
                              input.onChange(suggestionValue);
                            }}
                            inputProps={{name: input.name, value: input.value, onChange: input.onChange, className: 'form-control-lg form-control', placeholder: 'Escriba el nombre del cliente...'}}
                            {...input}/>
                          </>}
                          
                        </FinalFormField>
                      </Form.Group>
                      </Col>

                      <Col lg={6}>
                        <Row>
                        { existingUser && (<>
                          <Col lg={6}>
                            {existingUser.first_name} {existingUser.last_name}
                          </Col>
                          <Col lg={6} className='align-right'>
                            
                          </Col>
                          <Col lg={12}><hr/></Col>
                          <Col>
                            {existingUser.street} <br />
                            {existingUser.city} <br />
                            {existingUser.zip_code}, {existingUser.county} <br />
                          </Col>
                          <Col className='align-right'>
                            {existingUser.phone} <br/>
                            {existingUser.email}
                          </Col>
                        </>)}
                        </Row>
                      </Col>
                    </>)}

                  <Col lg={12} className='mt-5'><h2>Datos del pedido</h2></Col>

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

                  <Col lg={6} className='mb-5 mt-4'>
                    <Button variant='success' size='lg' onClick={() => form.mutators.push('products', undefined)}>Añadir producto</Button> {' '}
                    <Button variant='danger' size='lg' onClick={(() => form.mutators.pop('products'))}>Borrar último producto</Button>
                  </Col>

                  <Col lg={6} className='mb-5 mt-4 align-right'>
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
