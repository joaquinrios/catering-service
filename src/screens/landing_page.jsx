import React from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const LandingPage = () => {
    return (
      <>
        <Navbar />
        <Container>
          <h1>Slogan e imagen</h1>
          <hr />
          <center>
            <h1>Servicios</h1>
          </center>
          <Row>
            <Col lg={10}>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
                recusandae, ipsam veritatis nihil earum sint libero, temporibus
                consequuntur praesentium quibusdam consequatur dicta ullam ea,
                odit a error ratione ipsum soluta.
              </p>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <center>
                    <Button variant="primary">Go somewhere</Button>
                  </center>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <center>
                    <Button variant="primary">Go somewhere</Button>
                  </center>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <center>
                    <Button variant="primary">Go somewhere</Button>
                  </center>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <h2>Cotización personalizada</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est,
                fuga? Nisi, quasi iste praesentium dolores voluptatem ipsa?
                Earum ipsa porro quas. In saepe eaque quaerat alias praesentium
                odio veritatis dicta!
              </p>
            </Col>
            <Col lg={4}>
              <Button>[arrow icon i guess]</Button>
            </Col>
          </Row>
          <hr />
          <center>
            <h1>Descuentos</h1>
          </center>
          <Row>
            <Col lg={8}>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
                recusandae, ipsam veritatis nihil earum sint libero, temporibus
                consequuntur praesentium quibusdam consequatur dicta ullam ea,
                odit a error ratione ipsum soluta.
              </p>
              <Button>[arrow icon i guess]</Button>
            </Col>
            <Col>
              <h3>Add some picture here</h3>
            </Col>
          </Row>
          <hr />
          <center>
            <h1>Nosotros</h1>
          </center>
          <hr />
          <center>
            <h1>Contacto</h1>
          </center>
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