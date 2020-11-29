import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import axios from 'axios';

import { Navbar } from '../components/navbar';

require('moment/locale/es.js');

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map(k => Views[k]);

Date.prototype.getWeek = function(int) {
  var dt = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - dt) / 86400000) + dt.getDay()+1)/7);
};

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const measureA = a.measure.toUpperCase();
  const measureB = b.measure.toUpperCase();

  let comparison = 0;
  if (measureA > measureB) {
    comparison = 1;
  } else if (measureA < measureB) {
    comparison = -1;
  }
  return comparison;
}

function toArrayOfObjects(a){
  var list = []
  var i = 0;
  Object.keys(a).map(function(key){
    list.push(a[key]);
    list[i].name = key;
    i++;
  });
  return list;
}
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
  const [events, setEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [orders, setOrders] = useState(null);
  const [eventsWeek, setEventsWeek] = useState(null);
  const [eventsMonth, setEventsMonth] = useState(null);
  const [eventsToday, setEventsToday] = useState(null);
  const [cookWeek, setCookWeek] = useState(null);
  const [cookMonth, setCookMonth] = useState(null);
  const [cookToday, setCookToday] = useState(null);
  const [cook, setCook] = useState(null);
  const [currentView, setCurrentView] = useState('month');
  const [filteredStart, setFilteredStart] = useState(null);
  const [filteredEnd, setFilteredEnd] = useState(null);
  
  const currentWeek = new Date(Date.now()).getWeek();
  const currentMonth =  new Date(Date.now()).getMonth();
  const today = new Date();

  const onClickReset = () => {
    setFilteredEvents(events);
    // clear start date form field
    // clear end date form field
    // de-render button
    //  boolean variable?
    //  is useState easier or overkill?
  }

  const endDateOnChange = (event) => {
    const end = new Date(event.target.value);
    setFilteredEnd(end);
    let _filteredEvents = filteredStart ? events.filter(event => event.start >= filteredStart  && event.end <= end) : events.filter(event => event.end <= end);
    setFilteredEvents(_filteredEvents);
  };
  
  const startDateOnChange = (event) => {
    const start = new Date(event.target.value);
    setFilteredStart(start);
    let _filteredEvents = filteredEnd ? events.filter(event => event.start >= start && event.end <= filteredEnd) : events.filter(event => event.start >= start);
    setFilteredEvents(_filteredEvents);
  };

  useEffect(() => {
    axios(options).then(response => {
      const _orders = response.data.message;
      const _eM = [];
      const _eT = [];
      const _eW = [];
      const _events = [];
      const _cM = {};
      const _cT = {};
      const _cW = {};
      setOrders(_orders);

      _orders.forEach(event => {
        let startTime = new Date(event.order_date.replace(' ', 'T'));
        let endTime = new Date(event.order_date.replace(' ', 'T')).addHours(4);
        let e = {
          id: event.order_id,
          title: event.order_event,
          start: startTime,
          end: endTime,
          notes: event.order_notes,
        }
        if (startTime.getWeek() == currentWeek && today.getFullYear() == startTime.getFullYear()){
          _eW.push(e);
          event.products.forEach(product => {
            let productName = product.product_name;
            if (_cW.hasOwnProperty(productName)) {
              _cW[productName].amount += parseInt(product.amount);
            } else {
              _cW[productName] = {};
              _cW[productName].amount = parseInt(product.amount);
              _cW[productName].measure = product.product_measure;
            }
          })
        }
        if (startTime.getMonth() == currentMonth && today.getFullYear() == startTime.getFullYear()){
          _eM.push(e);
          event.products.forEach(product => {
            var productName = product.product_name;
            if (_cM.hasOwnProperty(productName)){
              _cM[productName].amount += parseInt(product.amount);
            } else {
              _cM[productName] = {};
              _cM[productName].amount = parseInt(product.amount);
              _cM[productName].measure = product.product_measure;
            }
          })
        }
        if (startTime.getDay() == today.getDay() && startTime.getWeek() == currentWeek && today.getFullYear() == startTime.getFullYear()){
          _eT.push(e);
          event.products.forEach(product => {
            let productName = product.product_name;
            if (_cT.hasOwnProperty(productName)){
              _cT[productName].amount += parseInt(product.amount);
            } else {
              _cT[productName] = {};
              _cT[productName].amount = parseInt(product.amount);
              _cT[productName].measure =  product.product_measure;
            }
          })
        }
        _events.push(e);
      });
      let _cMList = toArrayOfObjects(_cM);
      let _cWList = toArrayOfObjects(_cW);
      let _cTList = toArrayOfObjects(_cT);
      _cMList.sort(compare);
      _cWList.sort(compare);
      _cTList.sort(compare);
      
      setEvents(_events);
      setFilteredEvents(_events);
      setEventsMonth(_eM);
      setEventsWeek(_eW);
      setEventsToday(_eT);
      setCookMonth(_cMList);
      setCookWeek(_cWList);
      setCookToday(_cTList);
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
            <Row>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Desde:</Form.Label>
                  <Form.Control type='date' onChange={startDateOnChange} />
                </Form.Group>
              </Col>
              
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Hasta:</Form.Label>
                  <Form.Control type='date' onChange={endDateOnChange}/>
                </Form.Group>
              </Col>

              {(filteredStart || filteredEnd) && (
                <Col lg={4} className='mt-4 align-right'>
                  <Button className='mt-2' onClick={onClickReset}>
                  Limpiar campos
                  </Button>
                </Col>
              )}
            </Row>
            <Calendar
              onNavigate={(date) => console.log("Navigate" + date)}
              onView={(view) => setCurrentView(view)}
              events={filteredEvents}
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

          { true && (<Col lg={3}>
            {
              currentView == 'month' && ( <>
                <h4>Por cocinar: </h4>
                { cookMonth && cookMonth.map( (product, index) => {
                  return(
                  <div>
                    {index}
                    {product.name}: {product.amount} {product.measure}
                  </div>)
                })
                }

                <h4> Este mes:</h4>
                { eventsMonth && eventsMonth.map( (event, index) => (
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
                  { cookWeek && cookWeek.map( (product, index) => {
                  return(
                  <div>
                    {index}
                    {product.name}: {product.amount} {product.measure}
                  </div>)
                })
                }
                  
                  <h4> Esta semana:</h4>
                  { eventsWeek && eventsWeek.map(function (event, index){
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
                  { Object.keys(cookToday).map(function(key) {
                    return(
                      <div>
                      {key}: {cookToday[key].amount} {cookToday[key].measure}
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
            
          </Col>)}
        </Row>
      </Container>
    </>
  )
}