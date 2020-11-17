import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Image, Form, Jumbotron, Carousel, Modal } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import { BsArrowRight, BsX } from 'react-icons/bs';

import { Navbar } from '../components/navbar';


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

export const Landing = () => {
  const [modalShow, setModalShow] = useState(false);
  const onSubmitForm = (values) => {
    console.log('form submitted', values);
  };

  return (
    <>
      <Navbar />

      <Modal size='lg' centered show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title> <h2>Estamos para ayudarte.</h2>  </Modal.Title>
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
                  mente. <br/>¡Manos a la obra!
                </p>
                <Button variant='success'>
                  Vamos&nbsp;&nbsp;
                  <BsArrowRight />
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer> <Button variant='secondary' onClick={() => setModalShow(false)}> Cerrar </Button> </Modal.Footer>
      </Modal>

      <Container>
        <h1 className='bold'>¡Siéntete en casa con Cocina Mary!</h1>
        <hr/>
          <Card className='text-white'>
            <Card.Img src={sloganImage} />
            <Card.ImgOverlay className='cs-card-slogan'>
              <Card.Title><h1 className='bold'>¡Porque la familia<br/> es lo primero!</h1></Card.Title>
            </Card.ImgOverlay>
          </Card>


        <h1 className='text-center mt-3 mb-3 bold p-3' id='services'>Servicios</h1>
        <hr/>
        <Row>
          <Col lg={10}>
            <p>
              Aquí te podríamos platicar qué nos hace un servico de banquetería único en la ciudad,
              pero nosotros siempre nos hemos visto como un integrante más en tu mesa, un ser querido
              cuya compañía hace cada evento único y especial.<br/>
              La calidez y la cercanía son los ingredientes básicos desde que empezamos a ponernos de
              acuerdo contigo hasta que tú y tus familiares o amigos hablan de lo singular que fue
              esta reunión y la comida cuando llega la hora de despedirse.
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Carousel>
              <Carousel.Item>
                <Image src={carouselImage1} className='d-block w-100' />
                <Carousel.Caption>
                  <h1 className='bold'>Paquetes navideños</h1>
                  <p>
                    Porque pocas cosas se comparan con gozar de una buena comida o cena en compañía
                    de la familia esta época decembrina.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image src={carouselImage2} className='d-block w-100' />
                <Carousel.Caption>
                  <h3 className='bold'>Reuniones familiares</h3>
                  <p>
                    Muchos o pocos, estaremos más que felices de cocinar para todos.<br/>
                    Explora o pregunta por las opciones.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image src={carouselImage3} className='d-block w-100' />
                <Carousel.Caption>
                  <h3 className='bold'>¿Celebrando aniversario en casa?</h3>
                  <p>
                    Elijan la opción de su agrado y permítanos acompañarlos.<br/>
                    Una grandiosa experiencia sin tener que salir de casa.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>

        <h2 className='mt-5 bold'>Cotización personalizada</h2>
        <Row>
          <Col lg={8}>
            <p>
              Con más de quince años de trayectoria, nos ajustamos a toda clase de evento, prespuesto y paladar.
              Nuestra satisfacción viene de conocerte y ayudarte a encontrar las mejores opciones para que tú y tus
              invitados queden deleitados al final de cada comida en la que estemos presentes. ¿Te animas a empezar a explorar?
            </p>
          </Col>
          <Col lg={4} className='align-right'>
            <Button size='lg' onClick={() => setModalShow(true)}> Conocer más &nbsp; <BsArrowRight /> </Button>
          </Col>
        </Row>

        <h1 className='text-center mt-3 mb-3 bold p-3' id='discounts'>Descuentos</h1>
        <hr/>
        <Row>
          <Col lg={8}>
            <p>
              Nuestra meta es llevar deleite con nuestro sazón a boca de todos, y sabemos que tú y tus acompañantes
              son clave para alcanzar más y más personas. Conoce cómo recomendarnos con tus amigos puede traerte
              beneficios para la siguiente vez que decidas invitarnos a tu evento.
            </p>
            <Button size='lg'> Ver más&nbsp;&nbsp; <BsArrowRight />
            </Button>
          </Col>
          <Col>
            <Image src={discountsImage} thumbnail />
          </Col>
        </Row>

        <h1 className='text-center mt-3 mb-3 bold p-3' id='about-us'>Nosotros</h1>
        <hr/>
        <Row>
          <Col lg={4}>
            <Card className='text-center no-border'>
              <Container> <Image src={staffImage1} roundedCircle fluid className='cs-circle-image'/> </Container>
              <Card.Body>
                <Card.Text>
                  Nuestra cocina está conformada por el más experimentado personal,
                  que entiende que una comida sabrosa es el pilar de toda reunión,
                  en toda ocasión.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className='text-center no-border'>
              <Container> <Image src={staffImage2} roundedCircle fluid className='cs-circle-image'/> </Container>
              <Card.Body>
                <Card.Text>
                  Cuando disfrutas de nuestros platillos, estás disfrutando de nuestra
                  compañía. Desde hace más de quince años, nos hemos posicionado como un
                  valioso integrante más en tus eventos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className='text-center no-border'>
              <Container> <Image src={staffImage3} roundedCircle fluid className='cs-circle-image'/> </Container>
              <Card.Body>
                <Card.Text>
                  Un equipo de atención completamente orientado a ti, apasionado por entender
                  tus necesidades y feliz de orientarte para exceder las expectativas de tus
                  familiares o amigos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <h1 className='text-center mt-3 mb-3 bold p-3' id='contact'>Contacto</h1>
        <hr/>
        <Row>
          <Col lg={5}>
            <h3>¿Quieres hacer un pedido?</h3>
            <p>Empieza aquí. Nos encantará atenderte.</p>
            <FinalForm onSubmit={onSubmitForm}>
              {({ handleSubmit, submitting, values }) => (
                <Form>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <FinalFormField name='customerName'>
                      {({ input }) => (
                        <Form.Control {...input} type='text' size='lg' />
                      )}
                    </FinalFormField>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <FinalFormField name='email'>
                      {({ input }) => (
                        <Form.Control {...input} type='text' size='lg' />
                      )}
                    </FinalFormField>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Evento:</Form.Label>
                    <FinalFormField name='eventName'>
                      {({ input }) => (
                        <Form.Control {...input} type='text' size='lg' />
                      )}
                    </FinalFormField>
                  </Form.Group>

                  <Button variant='primary' size='lg'> Continuar&nbsp;&nbsp; <BsArrowRight /> </Button>
                </Form>
              )}
            </FinalForm>
          </Col>

          <Col lg={7}>
            <h3>Ubicación</h3>
            <><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.446371148455!2d-99.14845794847503!3d19.43631244553169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8d59ac21459%3A0x90b4c056728a77cf!2sCalle%20Dr%20Mora%209%2C%20Colonia%20Centro%2C%20Centro%2C%20Cuauht%C3%A9moc%2C%2006000%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1605569892526!5m2!1ses!2smx" width='100%' height='70%' frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></>
          </Col>
        </Row>
        <hr />
        <Row className='pt-1 pb-5'>
          <Col className='bold'>Cocina Mary © 2020</Col>
          <Col className='bold align-right'>Dr Mora 9, Centro, Cuauhtemoc, 06000, Ciudad de México. </Col>
        </Row>
        
      </Container>
    </>
  );
};
