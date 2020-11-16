import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Form,
  Jumbotron,
  Carousel,
} from 'react-bootstrap';
// import { IconName } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';

import { Navbar } from '../components/navbar';

const imgUrl =
  'https://s.itl.cat/pngfile/s/13-134823_ipad-windows-xp-wallpaper-1080p.jpg';
const headingImage =
  'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?cs=srgb&dl=pexels-fauxels-3184183.jpg&fm=jpg';
const sloganImage =
  'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const carouselImage1 =
  'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const carouselImage2 =
  'https://images.pexels.com/photos/3893682/pexels-photo-3893682.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';
const carouselImage3 =
  'https://images.pexels.com/photos/196643/pexels-photo-196643.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';
const discountsImage =
  'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const staffImage1 =
  'https://images.pexels.com/photos/4253298/pexels-photo-4253298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const staffImage2 =
  'https://images.pexels.com/photos/4057745/pexels-photo-4057745.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';
const staffImage3 =
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h1>Slogan e imagen</h1>
        <hr />
        <Jumbotron fluid>
          <Card className="bg-dark text-white">
            <Card.Img src={sloganImage} alt="Card image" />
            <Card.ImgOverlay>
              <Row>
                <Col>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                  <Card.Text>Last updated 3 mins ago</Card.Text>
                  <Card.Title>
                    <h1>"Slogan chido va aqui"</h1>
                  </Card.Title>
                </Col>
              </Row>
            </Card.ImgOverlay>
          </Card>
        </Jumbotron>
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
          <Col>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={carouselImage1}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h1>Paquetes navideños</h1>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={carouselImage2}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={carouselImage3}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
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
              Ver más
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
            <Button>
              Ver más
              <BsArrowRight />
            </Button>
          </Col>
          <Col>
            <Image src={discountsImage} thumbnail />
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
                {/* <Card.Img variant='top' src={imgUrl} /> */}
                <Container>
                  <Image src={staffImage1} roundedCircle fluid />
                </Container>
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
                {/* <Card.Img variant='top' src={imgUrl} /> */}
                <Container>
                  <Image src={staffImage2} roundedCircle fluid />
                </Container>
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
                {/* <Card.Img variant='top' src={imgUrl} /> */}
                <Container>
                  <Image src={staffImage3} roundedCircle fluid />
                </Container>
                <Card.Body>
                  <Card.Title>Alvaro de goben jajasjdajdsfa</Card.Title>
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
              <Button>
                Ver más
                <BsArrowRight />
              </Button>
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
