import React from 'react'
import { Container } from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";

export const Footer = () => {
    let today = new Date();
  return (
   <footer className='by-dark text-light py-3 footer mt-lg-5' style={{backgroundColor:"black"}}>
    <Container>
        <Row>
            <Col xs={12}md={12} className='text-center'>
            <p className='mb-0'>&copy; {today.getFullYear()}  EventHub</p>
            </Col>
        </Row>
    </Container>
    </footer>
  )
}
