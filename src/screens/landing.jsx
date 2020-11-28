import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Image, Form, Modal } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import { BsArrowRight } from 'react-icons/bs';
import axios from 'axios';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Navbar } from '../components/navbar';

const sloganImage =
  'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const carouselImage1 = 'https://images.pexels.com/photos/2763076/pexels-photo-2763076.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
const carouselImage2 = 'https://images.pexels.com/photos/3642718/pexels-photo-3642718.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const carouselImage3 = 'https://images.pexels.com/photos/5738092/pexels-photo-5738092.jpeg?cs=srgb&dl=pexels-rodnae-productions-5738092.jpg&fm=jpg';
const carouselImage4 = 'https://images.pexels.com/photos/5738079/pexels-photo-5738079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const carouselImage5 = 'https://dam.tvynovelas.com/mx/wp-content/uploads/2018/12/pi%C3%B1ata.jpg';

const discountsImage =
  'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const staffImage1 =
  'https://images.pexels.com/photos/4253298/pexels-photo-4253298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const staffImage2 =
  'https://images.pexels.com/photos/4057745/pexels-photo-4057745.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';
const staffImage3 =
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';


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

export const Landing = () => {
  const [orderModalShow, setOrderModalShow] = useState(false);
  const [discountsModalShow, setDiscountsModalshow] = useState(false);
  const onSubmitForm = (values) => {
    console.log('form submitted', values);
    const options = {
      // TODO: add API URL
      url: '',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: values,
    };
    axios(options)
      .then((response) => {
        console.log(response);
        setOrderModalShow(true);
        // setResponse() ya no va, o sí??
      })
      .catch((error) => {
        if (error.response) {
          // this the right way to do it?
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <>
      <Navbar />

      <Modal
        size='lg'
        centered
        show={orderModalShow}
        onHide={() => setOrderModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {' '}
            <h2>Estamos para ayudarte.</h2>{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col lg={5}>
                <h4>Atención personalizada</h4>
                <p>Llámanos y nos ponemos de acuerdo en minutos.</p>
                <h3 className='text-center'>(55) 1283 8823</h3>
              </Col>
              <Col lg={7}>
                <h4>Hacer mi pedido solo.</h4>
                <p>
                  Ya tienes fecha, lugar, número de personas, y platillos en
                  mente. <br />
                  ¡Manos a la obra!
                </p>
                <Button variant='success' href='/order'>
                  Vamos&nbsp;&nbsp;
                  <BsArrowRight />
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {' '}
          <Button variant='secondary' onClick={() => setOrderModalShow(false)}>
            {' '}
            Cerrar{' '}
          </Button>{' '}
        </Modal.Footer>
      </Modal>

      <Modal
        size='lg'
        centered
        show={discountsModalShow}
        onHide={() => setDiscountsModalshow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {' '}
            <h2>Promociones.</h2>
            {' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col lg={12}>
                <h4>Platillos y promociones de temporada.</h4>
                <p>
                  Tenemos varias cosas preparadas para ti, tus familiares y amigos.<br/>
                  Después de hacer tu primer pedido, espera detalles en la dirección de correo que nos proporcionaste al ordenar.
                </p>
                <hr/>
                <h4>¡También estamos en Facebook!</h4>
                <p>
                  Consulta nuestra <a href='https://www.facebook.com/Cocina-Mary-101557345100936' target='_blank'>página de Facebook</a> para conocer bases y más detalles sobre promociones y nuestro programa de recomendaciones.
                </p>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {' '}
          <Button variant='secondary' onClick={() => setDiscountsModalshow(false)}>
            {' '}
            De acuerdo{' '}
          </Button>{' '}
        </Modal.Footer>
      </Modal>

      <Container>
        <Row>
          <Col lg={8} md={8}>
            <h1 className='bold'>¡Siéntete en casa con Cocina Mary!</h1>
          </Col>
          <Col lg={4} md={4} className='align-right'>
            <Button
              variant='primary'
              size='lg'
              href='/order'
            >
              Hacer mi pedido &nbsp; <BsArrowRight />
            </Button>
          </Col>
          <Col className='align-bottom-right'>
            <br/>
            <h4>Te asistimos en lo que necesites: (55) 1283 8823</h4>
            <hr />
          </Col>
        
        </Row>
        <Card className='text-white'>
          <Card.Img src={sloganImage} width='auto' height='550px' />
          <Card.ImgOverlay className='cs-card-slogan'>
            <Card.Title>
              <h1 className='bold'>
                ¡Porque la familia
                <br /> es lo primero!
              </h1>
            </Card.Title>
          </Card.ImgOverlay>
        </Card>

        <h1 className='text-center mt-3 mb-3 bold p-3' id='services'>
          Servicios
        </h1>
        <hr />
        <Row>
          <Col lg={10}>
            <p>
              Aquí te podríamos platicar qué nos hace un servico de banquetería
              único en la ciudad, pero nosotros siempre nos hemos visto como un
              integrante más en tu mesa, un ser querido cuya compañía hace cada
              evento único y especial.
              <br />
              La calidez y la cercanía son los ingredientes básicos desde que
              empezamos a ponernos de acuerdo contigo hasta que tú y tus
              familiares o amigos hablan de lo singular que fue esta reunión y
              la comida cuando llega la hora de despedirse.
            </p>
          </Col>
        </Row>

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
              customTransition='all .5'
              transitionDuration={500}
              containerClass='carousel-container'
              removeArrowOnDeviceType={['tablet', 'mobile']}
              dotListClass='custom-dot-list-style'
              itemClass='carousel-item-padding-40-px cs-mh'
            >
              <div>
                <Card className='text-center no-border'>
                  <Container>
                    {' '}
                    <Image
                      src={carouselImage1}
                      fluid
                    />{' '}
                  </Container>
                  <Card.Body>
                    <Card.Title>Cumpleaños</Card.Title>
                    <Card.Text>
                      ¡Celebremos tu vida! No nos perderíamos uno más de tus cumpleaños por nada.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className='text-center no-border'>
                  <Container>
                    {' '}
                    <Image
                      src={carouselImage2}
                      fluid
                    />{' '}
                  </Container>
                  <Card.Body>
                    <Card.Title>Aniversario</Card.Title>
                    <Card.Text>
                      <p className='bold'>¿Celebrando desde casa?</p>
                      <p>
                        Elijan la opción de su agrado y permítanos acompañarlos.<br />
                        Disfruten de una grandiosa experiencia sin salir de casa.
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className='text-center no-border'>
                  <Container>
                    {' '}
                    <Image
                      src={carouselImage3}
                      fluid
                    />{' '}
                  </Container>
                  <Card.Body>
                    <Card.Title>Reuniones con familia y amigos</Card.Title>
                    <Card.Text>
                      <p>
                        Muchos o pocos, estaremos más que felices de cocinar para todos.<br/>
                        Nos encantará asesorarte en aspectos como el número de personas que esperas.
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className='text-center no-border'>
                  <Container>
                    {' '}
                    <Image
                      src={carouselImage4}
                      fluid
                    />{' '}
                  </Container>
                  <Card.Body>
                    <Card.Title>Primeras comuniones</Card.Title>
                    <Card.Text>
                      Que el festejo vaya acompañado de la mejor comida.<br />
                      Será un privilegio ser parte una irrepetible ocasión como esta.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className='text-center no-border'>
                  <Container>
                    {' '}
                    <Image
                      src={carouselImage5}
                      fluid
                    />{' '}
                  </Container>
                  <Card.Body>
                    <Card.Title>Posadas</Card.Title>
                    <Card.Text>
                      <p>
                        Porque pocas cosas se comparan con gozar de una buena comida o cena en compañía
                        de la familia esta época de unión y paz.
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Carousel>
          </Col>
        </Row>


        <h1 className='text-center mt-3 mb-3 bold p-3' id='discounts'>
          Promociones
        </h1>
        <hr />
        <Row>
          <Col lg={8}>
            <p>
              Nuestra meta es llevar deleite con nuestro sazón a boca de todos,
              y sabemos que tú y tus acompañantes son clave para alcanzar más y
              más personas. Conoce cómo recomendarnos con tus amigos puede
              traerte beneficios para la siguiente vez que decidas invitarnos a
              tu evento.
            </p>
            <Button size='lg' onClick={() => setDiscountsModalshow(true)}>
              {' '}
              Ver más&nbsp;&nbsp; <BsArrowRight />
            </Button>
          </Col>
          <Col>
            <Image src={discountsImage} thumbnail />
          </Col>
        </Row>

        <h1 className='text-center mt-3 mb-3 bold p-3' id='about-us'>
          Nosotros
        </h1>
        <hr />
        <Row>
          <Col lg={4}>
            <Card className='text-center no-border'>
              <Container>
                {' '}
                <Image
                  src={staffImage1}
                  roundedCircle
                  fluid
                  className='cs-circle-image'
                />{' '}
              </Container>
              <Card.Body>
                <Card.Text>
                  Nuestra cocina está conformada por el más experimentado
                  personal, que entiende que una comida sabrosa es el pilar de
                  toda reunión, en toda ocasión.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className='text-center no-border'>
              <Container>
                {' '}
                <Image
                  src={staffImage2}
                  roundedCircle
                  fluid
                  className='cs-circle-image'
                />{' '}
              </Container>
              <Card.Body>
                <Card.Text>
                  Cuando disfrutas de nuestros platillos, estás disfrutando de
                  nuestra compañía. Desde hace más de quince años, nos hemos
                  posicionado como un valioso integrante más en tus eventos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className='text-center no-border'>
              <Container>
                {' '}
                <Image
                  src={staffImage3}
                  roundedCircle
                  fluid
                  className='cs-circle-image'
                />{' '}
              </Container>
              <Card.Body>
                <Card.Text>
                  Un equipo de atención completamente orientado a ti, apasionado
                  por entender tus necesidades y feliz de orientarte para
                  exceder las expectativas de tus familiares o amigos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        <h2 className='mt-5 bold'>Cotización personalizada</h2>
        <Row>
          <Col lg={8}>
            <p>
              Con más de quince años de trayectoria, nos ajustamos a toda clase
              de evento, prespuesto y paladar. Nuestra satisfacción viene de
              conocerte y ayudarte a encontrar las mejores opciones para que tú
              y tus invitados queden deleitados al final de cada comida en la
              que estemos presentes. ¿Te animas a empezar a explorar?
            </p>
          </Col>
          <Col lg={4} className='align-right'>
            <Button size='lg' onClick={() => setOrderModalShow(true)}>
              {' '}
              Conocer más &nbsp; <BsArrowRight />{' '}
            </Button>
          </Col>
        </Row>

        <h1 className='text-center mt-3 mb-3 bold p-3' id='contact'>
          Contacto
        </h1>
        <hr />
        <Row>
          <Col lg={5}>
            <h3>Pongámonos de acuerdo</h3>
            <h5>¿Se acerca un evento imporante?</h5>
            <p>Permítenos celebrar contigo. Dejarlo en manos de nosotros es como dejarlo en manos de uno de tus seres cercanos.</p>
            <h5>Llámanos o envíanos un mensaje al:</h5>
            <h4>(55) 1283 8823</h4>
            <h5>O comienza por tu cuenta:</h5>
            <p>Dale un vistazo a <a href='/catalog'>nuestro menú.</a></p>
            <Button
                    variant='primary'
                    size='lg'
                    href='/order'
                  >
                    {' '}
                    Crea tu pedido&nbsp;&nbsp; <BsArrowRight />{' '}
                  </Button>
          </Col>

          <Col lg={7}>
            <h3>Ubicación</h3>
            <>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.446371148455!2d-99.14845794847503!3d19.43631244553169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8d59ac21459%3A0x90b4c056728a77cf!2sCalle%20Dr%20Mora%209%2C%20Colonia%20Centro%2C%20Centro%2C%20Cuauht%C3%A9moc%2C%2006000%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1605569892526!5m2!1ses!2smx'
                width='100%'
                height='70%'
                frameBorder='0'
                allowFullScreen=''
                aria-hidden='false'
                tabIndex='0'
              ></iframe>
            </>
          </Col>
        </Row>

        <hr />
        <Row className='pt-1 pb-5'>
          <Col className='bold'>Cocina Mary © 2020</Col>
          <Col className='bold align-right'>
            Dr Mora 9, Centro, Cuauhtemoc, 06000, Ciudad de México.{' '}
          </Col>
        </Row>
      </Container>
    </>
  );
};
