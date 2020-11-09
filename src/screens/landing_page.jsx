import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const LandingPage = () => {
    return (
      <>
        <Navbar />
        <Container>
          <h1>Slogan e imagen</h1>
          <hr />
          <h1>Servicios</h1>
          <hr />
          <h1>Descuentos</h1>
          <hr />
          <h1>Nosotros</h1>
          <hr />
          <h1>Contacto</h1>
          <hr />
          <Row>
            <Col>
              <p>footer content</p>
            </Col>
            <Col>
              <p>moar footer content</p>
            </Col>
            <Col>
              <p>even moar footer stuff</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>something</h6>
            </Col>
            <Col>
              <h6>something else</h6>
            </Col>
          </Row>
        </Container>
      </>
    );
}