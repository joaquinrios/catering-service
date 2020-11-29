import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Image, Accordion } from 'react-bootstrap';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import axios from 'axios';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Navbar } from '../components/navbar';

const options = {
  url: '/api/products/',
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// TODO: change images and remove these, done testing
const carouselImage2 =
  'https://images.pexels.com/photos/3642718/pexels-photo-3642718.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const carouselImage4 =
  'https://images.pexels.com/photos/5738079/pexels-photo-5738079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const carouselImage5 =
  'https://dam.tvynovelas.com/mx/wp-content/uploads/2018/12/pi%C3%B1ata.jpg';

export const Catalog = () => {
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState(null);
  const [dishes, setDishes] = useState(null);
  const [filteredDishes, setFilteredDishes] = useState(null);
  const [sides, setSides] = useState(null);
  const [seasonal, setSeasonal] = useState(null);

  useEffect(() => {
    axios(options)
      .then((response) => {
        const _products = response.data.products;
        const _dishes = _products.filter((p) => p.category === 'main');
        const _sides = _products.filter((p) => p.category === 'side');
        const _seasonal = _products.filter((p) => p.category === 'seasonal');
        setDishes(_dishes);
        setFilteredDishes(_dishes);
        setSides(_sides);
        setSeasonal(_seasonal);
        setProducts(_products);
        setReady(true);
      })
      .catch((error) => {
        setReady(true);
      });
  }, []);

  return (
    ready && (
      <>
        <Navbar />

        <Container>
          <Row>
            <Col lg={6}>
              <Button size="lg" variant="secondary" href="/">
                {' '}
                <BsArrowLeft />
                &nbsp;De vuelta al inicio
              </Button>
            </Col>
            <Col lg={6} className="align-right">
              <Button variant="primary" size="lg" href="/order">
                Hacer mi pedido &nbsp; <BsArrowRight />
              </Button>
            </Col>

            <Col lg={6}>
              <h4 className="mt-3 mb-3">
                Conoce aquí todas las deliciosas opciones que con gusto
                prepararemos para ustedes:
              </h4>
            </Col>
            <Col lg={6} className="align-bottom-right">
              <br />
              <h5>Te asistimos en lo que necesites: (55) 1283 8823</h5>
            </Col>
          </Row>

          <h1 className="text-center mt-3 mb-3 bold p-3" id="dishes">
            Platillos clásicos
          </h1>
          <hr />
          <p>Los clásicos que a todos nos encantan.</p>
          <p>
            Eso sí, siempre hay uno en particular que a cada quien le dibuja una
            sonrisa en la cara y le hace agua la boca cuando lo ve. ¿Cuál es el
            tuyo?
          </p>
          <Row>
            <Col>
              <Carousel
                additionalTransfrom={0}
                swipeable={false}
                draggable={false}
                showDots
                responsive={responsive}
                ssr={false} // means to render carousel on server-side.
                infinite
                autoPlaySpeed={3000}
                keyBoardControl
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={['tablet', 'mobile']}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px cs-mh cs-card-container cs-card"
              >
                {dishes &&
                  dishes.map((product, index) => (
                    <div>
                      <Container>
                        <Card key={index} className='text-center no-border'>
                          <Container>
                            {' '}
                            <Image src={product.filename} fluid />
                            {' '}
                            <Card.Title>
                              <Row>
                                <Col lg={12}>
                                  <br/>
                                  <h4>{product.product_name}</h4>
                                </Col>
                              </Row>
                            </Card.Title>
                            <Card.Body>
                              <Row>
                                <Col lg={6}>
                                  <h6>Precio por {product.measure}</h6>
                                </Col>
                                <Col lg={6} className="align-right">
                                  <h6>$ {product.price}</h6>
                                </Col>
                                <Col lg={12}>
                                  <hr />
                                </Col>
                                <Col lg={10}>
                                  <p>{product.description}</p>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Container>
                        </Card>
                      </Container>
                    </div>
                  ))}
              </Carousel>
            </Col>
          </Row>
          

          <h1 className="text-center mt-3 mb-3 bold p-3" id="seasonal">
            Platillos de temporada
          </h1>
          <hr />
          <p>
            ¡Que estos esenciales de las fiestas decembrinas no falten en
            ninguna de tus reuiones y posadas!
          </p>
          <p>
            Cada temporada hay algo nuevo y especial para ustedes aquí, y no
            podemos esperar a que lo prueben.
          </p>
          <Row>
            <Col>
              <Carousel
                additionalTransfrom={0}
                swipeable={false}
                draggable={false}
                showDots
                responsive={responsive}
                ssr={false} // means to render carousel on server-side.
                infinite
                autoPlaySpeed={3000}
                keyBoardControl
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={['tablet', 'mobile']}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px cs-mh"
              >
                {seasonal &&
                  seasonal.map((product, index) => (
                    <div>
                      <Container>
                        <Card key={index} className='text-center no-border'>
                          <Container>
                            {' '}
                            <Image src={product.filename} fluid />
                            {' '}
                            <Card.Title>
                              <Row>
                                <Col lg={12}>
                                  <br/>
                                  <h4>{product.product_name}</h4>
                                </Col>
                              </Row>
                            </Card.Title>
                            <Card.Body>
                              <Row>
                                <Col lg={6}>
                                  <h6>Precio por {product.measure}</h6>
                                </Col>
                                <Col lg={6} className="align-right">
                                  <h6>$ {product.price}</h6>
                                </Col>
                                <Col lg={12}>
                                  <hr />
                                </Col>
                                <Col lg={10}>
                                  <p>{product.description}</p>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Container>
                        </Card>
                      </Container>
                    </div>
                  ))}
              </Carousel>
            </Col>
          </Row>

          <h1 className="text-center mt-3 mb-3 bold p-3" id="sides">
            Complementos
          </h1>
          <hr />
          <p>
            Te entendemos, nada puede faltar en la mesa, y esta no será la
            primera vez.
          </p>
          <p>
            No hay tortilla calientita o salsa que haya hecho falta, en ninguna
            de las mesas a las que nos han invitado. Despreocúpate y disfruta.
          </p>
          <Row>
            <Col>
              <Carousel
                additionalTransfrom={0}
                swipeable={false}
                draggable={false}
                showDots
                responsive={responsive}
                ssr={false} // means to render carousel on server-side.
                infinite
                autoPlaySpeed={3000}
                keyBoardControl
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={['tablet', 'mobile']}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px cs-mh"
              >
                {sides &&
                  sides.map((product, index) => (
                    <div>
                      <Container>
                        <Card key={index} className='text-center no-border'>
                          <Container>
                            {' '}
                            <Image src={product.filename} fluid />
                            {' '}
                            <Card.Title>
                              <Row>
                                <Col lg={12}>
                                  <br/>
                                  <h4>{product.product_name}</h4>
                                </Col>
                              </Row>
                            </Card.Title>
                            <Card.Body>
                              <Row>
                                <Col lg={6}>
                                  <h6>Precio por {product.measure}</h6>
                                </Col>
                                <Col lg={6} className="align-right">
                                  <h6>$ {product.price}</h6>
                                </Col>
                                <Col lg={12}>
                                  <hr />
                                </Col>
                                <Col lg={10}>
                                  <p>{product.description}</p>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Container>
                        </Card>
                      </Container>
                    </div>
                  ))}
              </Carousel>
            </Col>
          </Row>

          <hr />
          <Row className="pt-1 pb-5">
            <Col className="bold">Cocina Mary © 2020</Col>
            <Col className="bold align-right">
              Dr Mora 9, Centro, Cuauhtemoc, 06000, Ciudad de México.{' '}
            </Col>
          </Row>
        </Container>
      </>
    )
  );
};
