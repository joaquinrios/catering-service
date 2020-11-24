import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import axios from 'axios';

import { Navbar } from '../components/navbar';

require('moment/locale/es.js');

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map(k => Views[k]);
const eventsCalendar = [];
const eventsThisWeek = [];
const eventsThisMonth = [];
const eventsToday = [];
var toCookMonth = {};
var toCookWeek = {};
var toCookDay = {};

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
  var dayOfYear = ((today - onejan + 86400000)/86400000);
  return Math.ceil(dayOfYear/7)
};

const options = {
  url: '/api/order_info/',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

export const Home = (props) => {
  const [ready, setReady] = useState(false);
  const [orders, setEvents] = useState(null);
  const [currentView, setCurrentView] = useState("month");

  useEffect(() => {
    axios(options).then(response => {
      const currentWeek = new Date(Date.now()).getWeek();
      const currentMonth = new Date(Date.now()).getMonth();
      const today = new Date();
      const events = response.data.message;
      events.forEach(event => {
        var startTime = new Date(event.order_date.replace(' ', 'T'));
        var endTime = new Date(startTime.getTime());
        endTime.setHours(endTime.getHours() + 4)
        var e = {
          id: 0,
          title: event.order_event,
          start: startTime,
          end: endTime,
          notes: event.order_notes,
        }
        if (startTime.getWeek() == currentWeek && today.getFullYear() == startTime.getFullYear()){
          eventsThisWeek.push(e);
          event.products.forEach(product => {
            if (!toCookWeek.hasOwnProperty(product.product_name)){
              toCookWeek.product.product_name = parseInt(product.amount);
            }
            else{
              toCookWeek.product.product_name += parseInt(product.amount);
            }
          })
        }
        if (startTime.getMonth() == currentMonth && today.getFullYear() == startTime.getFullYear()){
          eventsThisMonth.push(e);
          event.products.forEach(product => {
            if (!toCookMonth.hasOwnProperty(product.product_name)){
              toCookMonth.product.product_name = parseInt(product.amount);
            }
            else{
              toCookMonth.product.product_name += parseInt(product.amount);
            }
          })
        }
        if (startTime.getDay() == today.getDay() && startTime.getWeek() == currentWeek && today.getFullYear() == startTime.getFullYear()){
          eventsToday.push(e);
          event.products.forEach(product => {
            if (!toCookDay.hasOwnProperty(product.product_name)){
              toCookDay.product.product_name = parseInt(product.amount);
            }
            else{
              toCookDay.product.product_name += parseInt(product.amount);
            }
          })
        }
        eventsCalendar.push(e);
      });
      setEvents(events)
      setReady(true);
    }).catch(error => {
      console.log(error);
      setReady(true);
    });    
  }, [])

  return ready && (
    <>
      <Navbar/>
      <Container>
        <Row>
          <Col lg={6} md={6}>
            <h1>Dashboard</h1>
          </Col>
          <Col lg={6} md={6} className='align-right'> 
            <Button variant='primary' size='lg' href='/new-order'>Nuevo pedido</Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col lg={9} className='cs-calendar'>
            <Calendar
              onNavigate={(date) => console.log("Navigate" + date)}
              onView={(view) => setCurrentView(view)}
              events={eventsCalendar}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={(event, e) => console.log(event)}
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
            {
              currentView == 'month' && ( <>
                <h4>Por cocinar: </h4>
                { Object.keys(toCookMonth).map(function(key) {
                  return(
                    <div>
                    <h4>{key}</h4>
                    <h4>{toCookMonth[key]}</h4>
                  </div>
                  )
                    })
                }
                <h4> Este mes:</h4>
                { eventsThisMonth && eventsThisMonth.map( (event, index) => (
                    <div>
                      <h6>Evento {index+1}: {event.title}</h6>
                      <p>Notas: {event.notes}</p>
                    </div>
                  )
                  )
                }
                </>)
              }
            
              {
                currentView == 'week' && ( <>

                  <h4>Por cocinar: </h4>
                  { Object.keys(toCookWeek).map(function(key) {
                    return(
                      <div>
                      <h4>{key}</h4>
                      <h4>{toCookWeek[key]}</h4>
                    </div>
                    )
                      })
                  }
                  
                  <h4> Esta semana:</h4>
                  {eventsThisWeek && eventsThisWeek.map(function (event, index){
                    return(
                      <div>
                        <h6>Evento {index+1}: {event.title}</h6>
                        <p>Notas: {event.notes}</p>
                      </div>
                    )
                  })}
                </>)
              }
            
              {
                currentView == 'day' &&  ( <>
                  <h4>Por cocinar: </h4>
                  { Object.keys(toCookDay).map(function(key) {
                    return(
                      <div>
                      <h4>{key}</h4>
                      <h4>{toCookDay[key]}</h4>
                    </div>
                    )
                      })
                  }
                  <h4> Hoy:</h4>
                  {eventsToday && eventsToday.map(function (event, index){
                    return(
                      <div>
                        <h6>Evento {index+1}: {event.title}</h6>
                        <p>Notas: {event.notes}</p>
                      </div>
                    )
                  })}
                </>)
              }
            
          </Col>
        </Row>
      </Container>
    </>
  )
}