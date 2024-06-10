import React, { useState } from "react"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

export const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("")
    const [error, setError] = useState(null)
    const [bookingInfo, setBookingInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
        } catch (error) {
            setBookingInfo(null)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }

        setIsLoading(false)
    }

    const handleBookingCancellation = async () => {
        try {
            await cancelBooking(bookingInfo.booking_id)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setConfirmationCode("")
            setError(null)
        } catch (error) {
            setError(error.message)
        }

        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center mb-4">Find Booking</h2>
                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter the booking confirmation code"
                        />

                        <button type="submit" className="btn btn-hotel input-group-text">
                            Find booking
                        </button>
                    </div>
                </form>

                {isLoading ? (
                    <div>Finding your booking...</div>
                ) : error ? (
                    <div className="text-danger">Error: {error}</div>
                ) : bookingInfo ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p className="text-success">Confirmation Code: {bookingInfo.booking_confirmation_code}</p>
                        <p>Event Id: {bookingInfo.event.event_id}</p>
                        <p>Event Name: {bookingInfo.event.event_name}</p>
                        <p>User Name: {bookingInfo.booking_user_name}</p>
                        <p>Email Address: {bookingInfo.booking_user_email}</p>
                        <p>No. of tickets: {bookingInfo.booking_no_of_tickets}</p>
                        {!isDeleted && (
                            <button
                                onClick={handleBookingCancellation}
                                className="btn btn-danger">
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ) : (
                    <div>Find booking...</div>
                )}

                {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
            </div>
        </>
    )
}
