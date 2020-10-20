import React from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const Home = (props) => {
  return (
    <>
      <Navbar/>
      <Container>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>

        <Row>
          <Col lg={4} md={8}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ipsum, adipisci id, voluptates fuga doloremque dolorem consequatur tenetur reprehenderit, sapiente sint eaque dolore enim nulla officia omnis laboriosam consequuntur minus.
          </Col>

          <Col lg={8} md={4}>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis cupiditate fuga maiores! Sequi temporibus pariatur, facilis tempora quae est consectetur labore, libero corporis expedita voluptas sint cum cumque maxime optio?
          </Col>
        </Row>
      </Container>
    </>
  )
}