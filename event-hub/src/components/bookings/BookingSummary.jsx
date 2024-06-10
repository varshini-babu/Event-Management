
import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Button } from 'react-bootstrap'

export const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  
	const numOfTickets = parseInt(booking.booking_no_of_tickets,10)
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()

	const handleConfirmBooking = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsBookingConfirmed(true)
			onConfirm()
		}, 3000)
	}

	useEffect(() => {
		if (isBookingConfirmed) {
			navigate("/booking-success")
		}
	}, [isBookingConfirmed, navigate])
  return (
    <div className="row">
			<div className="col-md-6"></div>
			<div className="card card-body mt-5">
				<h4 className="card-title hotel-color">Reservation Summary</h4>
				<p>
					Name: <strong>{booking.booking_user_name}</strong>
				</p>
				<p>
					Email: <strong>{booking.booking_user_email}</strong>
				</p>
				<p>
					Number of Tickets Booked: <strong>{booking.booking_no_of_tickets}</strong>
				</p>

				

				{payment > 0 ? (
					<>
						<p>
							Total payment: <strong>Rs.{payment}</strong>
						</p>

						{isFormValid && !isBookingConfirmed ? (
							<Button variant="success" onClick={handleConfirmBooking}>
								{isProcessingPayment ? (
									<>
										<span
											className="spinner-border spinner-border-sm mr-2"
											role="status"
											aria-hidden="true"></span>
										Booking Confirmed, redirecting to payment...
									</>
								) : (
									"Confirm Booking & proceed to payment"
								)}
							</Button>
						) : isBookingConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
					</>
				) : null}
			</div>
		</div>
  )
}
