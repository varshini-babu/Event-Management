import React from 'react'
import { Container } from 'react-bootstrap'

export const Parallax = () => {
  return (
    <div className='parallax mb-5'>
        <Container className='text-center px-5 py-5 justify-content'>
            <div className='animated-texts bounceIn'>
            <h1>Welcome to <span className='hotel-color'>EventHub</span></h1>
            <h3>We offer best price for the events</h3>
            </div>
        </Container>
    </div>
  )
}
