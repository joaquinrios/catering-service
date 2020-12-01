import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import axios from 'axios';

import { Navbar } from '../components/navbar';

require('moment/locale/es.js');

const localizer = momentLocalizer(moment);

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
  const [formStart, setFormStart] = useState('');
  const [formEnd, setFormEnd] = useState('');
  
  const [currentWeek, setCurrentWeek] = useState(new Date(Date.now()).getWeek());
  const [currentMonth, setCurrentMonth] = useState(new Date(Date.now()).getMonth());
  const [today, setToday] = useState(new Date());

  const onClickReset = () => {
    setFilteredEvents(events);
    setFilteredStart('');
    setFilteredEnd('');
    setFormStart('');
    setFormEnd('');
  }

  const endDateOnChange = (event) => {
    const end = new Date(event.target.value);
    setFilteredEnd(end);
    setFormEnd(event.target.value);
    let _filteredEvents = filteredStart ? events.filter(event => event.start >= filteredStart  && event.end <= end) : events.filter(event => event.end <= end);
    setFilteredEvents(_filteredEvents);
  };
  
  const startDateOnChange = (event) => {
    const start = new Date(event.target.value);
    setFilteredStart(start);
    setFormStart(event.target.value);
    let _filteredEvents = filteredEnd ? events.filter(event => event.start >= start && event.end <= filteredEnd) : events.filter(event => event.start >= start);
    setFilteredEvents(_filteredEvents);
  };

  const onNavigateUpdateDates = (date) => {
    setCurrentMonth(date.getMonth());
    setCurrentWeek(date.getWeek());
    setToday(date);
  }

  const filterEvents = (orders) => {
    const _eM = [];
    const _eT = [];
    const _eW = [];
    const _events = [];
    const _cM = {};
    const _cT = {};
    const _cW = {};

    orders.forEach(order => {
      let startTime = new Date(order.order_date.replace(' ', 'T'));
      let endTime = new Date(order.order_date.replace(' ', 'T')).addHours(4);
      let event = {
        id: order.order_id,
        title: order.order_event,
        start: startTime,
        end: endTime,
        notes: order.order_notes,
      }
      if (startTime.getWeek() == currentWeek && today.getFullYear() == startTime.getFullYear()){
        _eW.push(event);
        order.products.forEach(product => {
          let productName = product.product_name;
          if (_cW.hasOwnProperty(productName)) {
            _cW[productName].amount += parseInt(product.amount);
          } else {
            _cW[productName] = {};
            _cW[productName].amount = parseInt(product.amount);
            _cW[productName].measure = product.product_measure;
            _cW[productName].price = product.price;
          }
        })
      }
      if (startTime.getMonth() == currentMonth && today.getFullYear() == startTime.getFullYear()){
        _eM.push(event);
        order.products.forEach(product => {
          var productName = product.product_name;
          if (_cM.hasOwnProperty(productName)){
            _cM[productName].amount += parseInt(product.amount);
          } else {
            _cM[productName] = {};
            _cM[productName].amount = parseInt(product.amount);
            _cM[productName].measure = product.product_measure;
            _cM[productName].price = product.price;
          }
        })
      }
      if (startTime.getDay() == today.getDay() && startTime.getWeek() == currentWeek && today.getFullYear() == startTime.getFullYear()){
        _eT.push(event);
        order.products.forEach(product => {
          let productName = product.product_name;
          if (_cT.hasOwnProperty(productName)){
            _cT[productName].amount += parseInt(product.amount);
          } else {
            _cT[productName] = {};
            _cT[productName].amount = parseInt(product.amount);
            _cT[productName].measure =  product.product_measure;
            _cT[productName].price = product.price;
          }
        })
      }
      _events.push(event);
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
  }

  useEffect(() => {
    if (!orders) {
      axios(options).then(response => {
        const _orders = response.data.message;
        setOrders(_orders);
        filterEvents(_orders);
        setReady(true);
      }).catch(error => {
        console.log(error);
      });  
    } else {
      filterEvents(orders);
    }  
  }, [today, currentMonth, currentWeek])

  return ready && (
    <>
      <Navbar/>
      <Container>
        <Row>
          <Col lg={6} md={6}>
            <h1>Dashboard</h1>
          </Col>
          <Col lg={6} md={6} className='align-right'> 
            <Button variant='primary' size='lg' href='/order/new'>Nuevo pedido</Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col lg={9} className='cs-calendar'>
            <Row>
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Desde:</Form.Label>
                  <Form.Control type='date' value={formStart} onChange={startDateOnChange} />
                </Form.Group>
              </Col>
              
              <Col lg={4}>
                <Form.Group>
                  <Form.Label>Hasta:</Form.Label>
                  <Form.Control type='date' value={formEnd} onChange={endDateOnChange}/>
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
              onNavigate={(date) => onNavigateUpdateDates(date)}
              onView={(view) => setCurrentView(view)}
              onSelectSlot={(event, e) => console.log(event)}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={(event, e) => console.log(event)}
              localizer={localizer}
              messages={{ next: '>', previous: '<', today: 'Hoy', month: 'Mes', week: 'Semana', day: 'Día'
              }}
            />
          </Col>

          { true && (<Col lg={3}>
            {
              currentView == 'month' && ( <>
                <h4># Eventos: {cookMonth.length}</h4>
                <h4>Por cocinar: </h4>
                { cookMonth && cookMonth.map(product => (
                  <div> <b>{product.amount} {product.measure}</b> - {product.name} </div>)
                )}
                <hr/>
                <h4>Total venta: <br/> $ { cookMonth && cookMonth.reduce((total, product) => {return total + parseFloat(product.price)}, 0).toFixed(2) }</h4>
                <hr/>
                <h4> Este mes:</h4>
                { eventsMonth && eventsMonth.map((event, index) => (
                  <p><b>Evento {index+1}: {event.title}</b><br/>Notas: {event.notes}</p>)
                )}
                </>)
              }
            
              {
                currentView == 'week' && ( <>
                  <h4># Eventos: {cookWeek.length}</h4>
                  <h4>Por cocinar: </h4>
                  { cookWeek && cookWeek.map(product => (
                   <div> <b>{product.amount} {product.measure}</b> - {product.name} </div>)
                  )}
                  <hr/>
                  <h4>Total venta: <br/> $ { cookWeek && cookWeek.reduce((total, product) => {return total + parseFloat(product.price)}, 0).toFixed(2) }</h4>
                  <hr/>
                  <h4> Esta semana:</h4>
                  { eventsWeek && eventsWeek.map((event, index) => (
                    <p><b>Evento {index+1}: {event.title}</b><br/>Notas: {event.notes}</p>)
                  )}
                </>)
              }
            
              {
                currentView == 'day' &&  ( <>
                  <h4># Eventos: {cookToday.length}</h4>
                  <h4>Por cocinar: </h4>
                  { cookToday && cookToday.map(product => (
                   <div> <b>{product.amount} {product.measure}</b> - {product.name} </div>)
                  )}
                  <hr/>
                  <h4>Total venta: <br/> $ { cookToday && cookToday.reduce((total, product) => {console.log(product); return total + parseFloat(product.price)}, 0).toFixed(2) }</h4>
                  <hr/>
                  <h4> Hoy:</h4>
                  { eventsToday && eventsToday.map((event, index) => (
                    <p><b>Evento {index+1}: {event.title}</b><br/>Notas: {event.notes}</p>)
                  )}
                </>)
              }
            
          </Col>)}
        </Row>
      </Container>
    </>
  )
}