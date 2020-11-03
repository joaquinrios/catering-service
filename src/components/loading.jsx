import React from 'react'
import { Container, Row } from 'react-bootstrap'

import Lottie from 'react-lottie';
import * as animation from '../assets/animations/117-progress-bar.json'
const flexCenter = 'd-flex flex-fill align-items-center justify-content-center'

export const Loading = () => {
  return (
    <Container fluid className={flexCenter}>
      <Row className={flexCenter} style={{ height: '100vh' }}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animation.default,
          }}
          height={400}
          width={400}
        />
      </Row>
    </Container>
  )
}
