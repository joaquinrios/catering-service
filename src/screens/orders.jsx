import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import axios from 'axios';

import { Navbar } from '../components/navbar';



const onSubmitDeleteOrder = (id) => {
  const options = {
    url: `/api/orders/${id}`,
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };

  axios(options).then(response => {
    setTimeout(() => window.location.reload(), 200);
  }).catch(error => {
    setTimeout(() => window.location.reload(), 200);
  });
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const Orders = (props) => {
  const [ready, setReady] = useState(false);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const options = {
      url: '/api/orders/',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };

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
            <Button variant='primary' size='lg' href='/order/new'>Nuevo pedido</Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col lg={8}>
            <Accordion defaultActiveKey="0">
              { orders && orders.map((order, index) => {
                const date = new Date(order.order_date.replace(' ', 'T'))
                return (
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                    <Row>
                      <Col>
                        <h4>Pedido # {order.order_id} - {order.order_event}</h4>
                        <p>{order.first_name} {order.last_name}</p>
                        <p>
                          {order.street} <br/>
                          {order.county}, {order.city} <br/>
                          {order.zip_code}, {order.state} <br/>
                        </p>
                      </Col>
                      <Col className='align-right'>
                        <h4>{date.toLocaleDateString('default', {month: 'long'})} {date.getDate()}, {formatAMPM(date)}</h4>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${index}`}>
                    <Card.Body>
                    <Row>               
                        <Col lg={6}>
                          <p>
                            {order.products.map((product, index) => (
                             <> {product.product_name} <br/></>
                            ))}
                          </p>
                          <h4>Total:</h4>
                        </Col>
                        <Col lg={6} className='align-right'>
                          <p>
                          {order.products.map((product, index) => (
                             <> $ {product.price}.00 <br/></>
                            ))}
                          </p>
                          <h4>$ {order.total_price}</h4>
                        </Col>
                        <Col lg={12} className='align-right'>
                          <Button variant='danger' size='sm' onClick={() => onSubmitDeleteOrder(order.order_id)}>Cancelar pedido</Button> {' '}
                          <Button variant='primary' size='sm' href={`/order/${order.order_id}`}>Editar pedido</Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )})}
            </Accordion>
          </Col>
        </Row>

        <hr />
          <Row className='pt-1 pb-5'>
            <Col >
              {' '}
            </Col>
          </Row>
      </Container>
    </>
  );
};
