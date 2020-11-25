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
const toCookMonthList = [];
var toCookWeek = {};
const toCookWeekList = [];
var toCookDay = {};
const toCookDayList = [];

Date.prototype.getWeek = function(int) {
  var dt = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - dt) / 86400000) + dt.getDay()+1)/7);
};

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
  const [toDoes, setToDoes] = useState(false);
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
            var str_product_name = product.product_name;
            if (toCookWeek.hasOwnProperty(str_product_name)){
              toCookWeek[str_product_name].amount += parseInt(product.amount);
            }
            else{
              toCookWeek[str_product_name] = {};
              toCookWeek[str_product_name].amount = parseInt(product.amount);
              toCookWeek[str_product_name].measure = product.product_measure;
            }
          })
        }
        if (startTime.getMonth() == currentMonth && today.getFullYear() == startTime.getFullYear()){
          eventsThisMonth.push(e);
          event.products.forEach(product => {
            var str_product_name = product.product_name;
            if (toCookMonth.hasOwnProperty(str_product_name)){
              toCookMonth[str_product_name].amount += parseInt(product.amount);
            }
            else{
              toCookMonth[str_product_name] = {};
              toCookMonth[str_product_name].amount = parseInt(product.amount);
              toCookMonth[str_product_name].measure = product.product_measure;
            }
          })
        }
        if (startTime.getDay() == today.getDay() && startTime.getWeek() == currentWeek && today.getFullYear() == startTime.getFullYear()){
          eventsToday.push(e);
          event.products.forEach(product => {
            console.log(product);
            var str_product_name = product.product_name;
            console.log(str_product_name);
            if (toCookDay.hasOwnProperty(str_product_name)){
              toCookDay[str_product_name].amount += parseInt(product.amount);
            }
            else{
              toCookDay[str_product_name] = {};
              toCookDay[str_product_name].amount = parseInt(product.amount);
              toCookDay[str_product_name].measure =  product.product_measure;
            }
          })
        }
        eventsCalendar.push(e);
      });
      var toCookMonthList = toArrayOfObjects(toCookMonth);
      var toCookWeekList = toArrayOfObjects(toCookWeek);
      toCookMonthList.sort(compare);
      toCookWeekList.sort(compare);
      toCookDayList.sort(compare);
      console.log("toCookMonthList", toCookMonthList);
      console.log("events this month", toCookWeekList)
      setReady(true);
      setToDoes(true);
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
                { toDoes && toCookMonthList.map( (product, index) => {
                  return(
                  <div>
                    {index}
                    {product.name}: {product.amount} {product.measure}
                  </div>)
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
                  { toDoes && toCookWeekList.map( (product, index) => {
                  return(
                  <div>
                    {index}
                    {product.name}: {product.amount} {product.measure}
                  </div>)
                })
                }
                  
                  <h4> Esta semana:</h4>
                  {toDoes && eventsThisWeek.map(function (event, index){
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
                      {key}: {toCookDay[key].amount} {toCookDay[key].measure}
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