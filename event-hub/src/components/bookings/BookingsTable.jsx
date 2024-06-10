import React, { useState, useEffect } from "react";
import { getAllEvents } from "../utils/ApiFunctions";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter bookings based on event name
    const filterBookingsByEventName = (eventName) => {
        const filtered = bookingInfo.filter((booking) => {
            // Ensure booking.event and booking.event.event_name are defined
            if (booking.event && booking.event.event_name) {
                return booking.event.event_name.toLowerCase().includes(eventName.toLowerCase());
            }
            return false;
        });
        setFilteredBookings(filtered);
    };

    useEffect(() => {
        setFilteredBookings(bookingInfo);
    }, [bookingInfo]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        filterBookingsByEventName(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setFilteredBookings(bookingInfo); // Reset filtered bookings to show all bookings
    };

    return (
        <section className="p-4">
            <div className="mb-3 d-flex">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by event name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-hotel ml-2" onClick={clearSearch}>
                    Clear
                </button>
            </div>

            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking ID</th>
                        <th>Event ID</th>
                        <th>Event Name</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>No of Tickets</th>
                        <th>Confirmation Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.booking_id}>
                            <td>{index + 1}</td>
                            <td>{booking.booking_id}</td>
                            <td>{booking.event.event_id}</td>
                            <td>{booking.event.event_name}</td>
                            <td>{booking.booking_user_name}</td>
                            <td>{booking.booking_user_email}</td>
                            <td>{booking.booking_no_of_tickets}</td>
                            <td>{booking.booking_confirmation_code}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleBookingCancellation(booking.booking_id)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredBookings.length === 0 && <p>No booking found for the selected event name</p>}
        </section>
    );
};

export default BookingsTable;
