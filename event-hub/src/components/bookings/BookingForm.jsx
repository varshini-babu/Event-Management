import React, { useEffect, useState } from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { bookEvent, getEventById } from '../utils/ApiFunctions'
import { BookingSummary } from './BookingSummary'

export const BookingForm = () => {
  const [validated, setValidated] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [eventPrice, setEventPrice] = useState(0)
  const[maxOfTicket,setMaxOfTicket] = useState(0)

  const currentUser = localStorage.getItem("userId")

  const [booking, setBooking] = useState({
    booking_user_name: "",
    booking_user_email: currentUser,
    booking_no_of_tickets: ""
  })


  const { eventId } = useParams()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBooking({ ...booking, [name]: value })
    setErrorMessage("")
  }

  const getEventPriceById = async (eventId) => {
    try {
      const response = await getEventById(eventId)
      setEventPrice(response.event_ticket_price)
   
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getEventPriceById(eventId)
  }, [eventId])


  const getEventTicketPriceById = async (eventId) => {
    try {
      const response = await getEventById(eventId)
      setMaxOfTicket(response.event_max_of_tickets)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getEventTicketPriceById(eventId)
  }, [eventId])

  const calculatePayment = () => {
    const ticketCount = parseInt(booking.booking_no_of_tickets, 10)
    const totalPrice = ticketCount * eventPrice
    return totalPrice
  }

  
  const isTicketAvailable = () => {
    const ticketCount = parseInt(booking.booking_no_of_tickets, 10)
    if (maxOfTicket >= ticketCount) {
      setErrorMessage("")
      return true
    } else {
      setErrorMessage(`Sorry, not enough tickets are available. Only ${maxOfTicket} tickets are available`)
      return false
      
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
 
    if (form.checkValidity() === false || !isTicketAvailable()) {
      //alert(`Sorry, not enough tickets are available. Only ${maxOfTicket} tickets are available`)
      e.stopPropagation()
    } else {
      setIsSubmitted(true)
    }
    setValidated(true)

  }

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookEvent(eventId, booking)
      setIsSubmitted(true)
      navigate("/booking-success", { state: { message: confirmationCode } })
    } catch (error) {
      const errorMessage = error.message
      console.log(errorMessage)
      navigate("/booking-success", { state: { error: errorMessage } })
    }
  }

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card-title">Book Event</h4>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="booking_user_name" className="hotel-color">
                    Fullname
                  </Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="booking_user_name"
                    name="booking_user_name"
                    value={booking.booking_user_name}
                    placeholder="Enter your fullname"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your fullname.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="booking_user_email" className="hotel-color">
                    Email
                  </Form.Label>
                  <FormControl
                    required
                    type="email"
                    id="booking_user_email"
                    name="booking_user_email"
                    value={booking.booking_user_email}
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset style={{ border: "2px" }}>
                  <legend>Number of Tickets</legend>
                  <div>
                    <div>
                      <Form.Label htmlFor="booking_no_of_tickets" className="hotel-color">
                        Tickets
                      </Form.Label>
                      <FormControl
                        required
                        type="number"
                        id="booking_no_of_tickets"
                        name="booking_no_of_tickets"
                        value={booking.booking_no_of_tickets}
                        min={1}
                        placeholder="0"
                        onChange={handleInputChange}
                      />{errorMessage && <div className="alert alert-danger fade show mt-2"> {errorMessage}</div>}
                      <Form.Control.Feedback type="invalid">
                        Please select at least 1 ticket.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </fieldset>

                <div className="form-group mt-2 mb-2">
                  <button type="submit" className="btn btn-hotel">
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>

          <div className="col-md-4">
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                payment={calculatePayment()}
                onConfirm={handleFormSubmit}
                isFormValid={validated}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
