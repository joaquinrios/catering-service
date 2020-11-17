import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import axios from 'axios';

import { Navbar } from '../components/navbar';

const options = {
  url: '/api/orders/',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

export const Orders = (props) => {
  const [ready, setReady] = useState(false);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axios(options).then(response => {
      const _orders = response.data.orders;
      setOrders(_orders)
      setReady(true);
    }).catch(error => {
      setReady(true);
    });

    setReady(true);
  }, [])

  return ready && (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col lg={6} md={6}>
            <h1>Pedidos</h1>
          </Col>
          <Col lg={6} md={6} className='align-right'> 
            <Button variant='primary' size='lg' href='/new_order'>Nuevo pedido</Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col lg={8}>
            <Accordion defaultActiveKey="0">
              { orders && orders.map((order, index) => (
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                    <Row>
                      <Col>
                        <h4>Pedido # {order.order_id}</h4>
                        <p>{order.first_name} {order.last_name}</p>
                        <p>
                          {order.street} <br/>
                          {order.county}, {order.city} <br/>
                          {order.zip_code}, {order.state} <br/>
                        </p>
                      </Col>
                      <Col className='align-right'>
                        <h4>Oct 11, 7:00 PM</h4>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${index}`}>
                    <Card.Body>
                    <Row>               
                        <Col lg={6}>
                          <p>
                            Producto 1, 5 kg <br/>
                            Producto 2, 2 L, <br/>
                            Producto 3, 2 órdenes
                          </p>
                          <h4>Total:</h4>
                        </Col>
                        <Col lg={6} className='align-right'>
                          <p>
                            $ 700.00 <br/>
                            $ 600.00 <br/>
                            $ 100.00 <br/>
                          </p>
                          <h4>$ {order.total_price}</h4>
                        </Col>
                        <Col lg={12} className='align-right'>
                          <Button variant='primary' size='sm'>Editar pedido</Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};
