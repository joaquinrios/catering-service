import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { Navbar } from '../components/navbar';

export const LandingPage = () => {
    return (
      <>
        <Navbar />
        <Container>
          <h1>Hello world..!</h1>
        </Container>
      </>
    );
}