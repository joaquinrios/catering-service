import React from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from '../assets/events'

import { Navbar } from '../components/navbar';

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map(k => Views[k]);

export const Home = (props) => {
  return (
    <>
      <Navbar/>
      <Container>
        <Row>
          <Col lg={6} md={6}>
            <h1>Dashboard</h1>
          </Col>
          <Col lg={6} md={6} className='align-right'> 
            <Button variant='primary' size='lg' href='/new_order'>Nuevo pedido</Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col lg={8} className='cs-calendar'>
            <Calendar
              events={events}
              startAccessor="start"
              endAccessor="end"
              localizer={localizer}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}