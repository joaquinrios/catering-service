import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Form,
} from 'react-bootstrap';

import { Navbar } from '../components/navbar';

// import { IconName } from 'react-icons/bs';
// import { BsBatteryFull } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';

const imgUrl =
  'https://s.itl.cat/pngfile/s/13-134823_ipad-windows-xp-wallpaper-1080p.jpg';
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
              <Card.Img variant="top" src={imgUrl} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <center>
                  <Button variant="primary">Ver más...</Button>
                </center>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" src={imgUrl} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <center>
                  <Button variant="primary">Ver más...</Button>
                </center>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" src={imgUrl} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <center>
                  <Button variant="primary">Ver más...</Button>
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
              fuga? Nisi, quasi iste praesentium dolores voluptatem ipsa? Earum
              ipsa porro quas. In saepe eaque quaerat alias praesentium odio
              veritatis dicta!
            </p>
          </Col>
          <Col lg={4}>
            <Button>
              <BsArrowRight />
            </Button>
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
            <Image src={imgUrl} thumbnail />
          </Col>
        </Row>
        <hr />
        <center>
          <h1>Nosotros</h1>
        </center>
        <Row>
          <Col>
            <h3>[some image with some card in the overlay]</h3>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Card style={{ width: '20rem' }}>
              <center>
                {/* <Card.Img variant="top" src={imgUrl} /> */}
                <Image src={imgUrl} roundedCircle fluid />
                <Card.Body>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </center>
            </Card>
          </Col>
          <Col lg={4}>
            <Card style={{ width: '20rem' }}>
              <center>
                {/* <Card.Img variant="top" src={imgUrl} /> */}
                <Image src={imgUrl} roundedCircle fluid />
                <Card.Body>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </center>
            </Card>
          </Col>
          <Col lg={4}>
            <Card style={{ width: '20rem' }}>
              <center>
                {/* <Card.Img variant="top" src={imgUrl} /> */}
                <Image src={imgUrl} roundedCircle fluid />
                <Card.Body>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </center>
            </Card>
          </Col>
        </Row>
        <hr />
        <center>
          <h1>Contacto</h1>
        </center>
        <Row>
          <Col>
            <h3>El form ese</h3>
            <center>
              <Button>[arrow icon i guess]</Button>
            </center>
          </Col>
          <Col>
            <h3>Mapita</h3>
          </Col>
        </Row>
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
};
