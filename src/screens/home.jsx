import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import events from '../assets/events'

import { Navbar } from '../components/navbar';

require('moment/locale/es.js');

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map(k => Views[k]);

export const Home = () => {
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
          <Col lg={9} className='cs-calendar'>
            <Calendar
              onNavigate={(date) => console.log(date)}
              onView={(view) => console.log(view)}
              events={events}
              startAccessor="start"
              endAccessor="end"
              localizer={localizer}
              messages={{
                next: '>',
                previous: '<',
                today: 'Hoy',
                month: 'Mes',
                week: 'Semana',
                day: 'Día'
              }}
            />
          </Col>

          <Col lg={3}>
          <h4> Esta semana: </h4>
          </Col>
        </Row>
      </Container>
    </>
  )
}