import { useState } from 'react';
import { addEvent } from "../utils/ApiFunctions";
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AddEvent = () => {
    const [newEvent, setNewEvent] = useState({
        event_photo: null,
        event_name: "",
        event_date: "",
        event_description: "",
        event_time: "",
        event_venue: "",
        event_ticket_price: "",
        event_max_of_tickets: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleEventInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewEvent({ ...newEvent, event_photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addEvent(
                newEvent.event_photo,
                newEvent.event_name,
                newEvent.event_date,
                newEvent.event_description,
                newEvent.event_time,
                newEvent.event_venue,
                newEvent.event_ticket_price,
                newEvent.event_max_of_tickets
            );

            if (success) {
                setSuccessMessage("A new event was added successfully");
                setNewEvent({ 
                    event_photo: null, 
                    event_name: "", 
                    event_date: "", 
                    event_description: "", 
                    event_time: "", 
                    event_venue: "", 
                    event_ticket_price: "", 
                    event_max_of_tickets: "" 
                });
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding new event");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
    };

    return (
        <>
            <section className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Add a New Event</h2>
                        
                        <form onSubmit={handleSubmit} >
                            <div className='mb-3'>
                                <label htmlFor="event_name" className='form-label'>
                                    Event Name
                                </label>
                                <input
                                    className='form-control'
                                    required
                                    id="event_name"
                                    type='text'
                                    name="event_name"
                                    value={newEvent.event_name}
                                    onChange={handleEventInputChange} />
                                
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="event_date" className='form-label'>
                                    Event Date
                                </label>
                                <input
                                    className='form-control'
                                    required
                                    id="event_date"
                                    type='date'
                                    name="event_date"
                                    value={newEvent.event_date}
                                    onChange={handleEventInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="event_description" className='form-label'>
                                    Event Description
                                </label>
                                <textarea
                                    className='form-control'
                                    required
                                    id="event_description"
                                    name="event_description"
                                    value={newEvent.event_description}
                                    onChange={handleEventInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="event_time" className='form-label'>
                                    Event Time
                                </label>
                                <input
                                    className='form-control'
                                    required
                                    id="event_time"
                                    type="time"
                                    name="event_time"
                                    value={newEvent.event_time}
                                    onChange={handleEventInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="event_venue" className='form-label'>
                                    Event Venue
                                </label>
                                <input
                                    className='form-control'
                                    required
                                    id="event_venue"
                                    type="text"
                                    name="event_venue"
                                    value={newEvent.event_venue}
                                    onChange={handleEventInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="event_ticket_price" className='form-label'>
                                    Event Ticket Price
                                </label>
                                <input
                                    className='form-control'
                                    required
                                    id="event_ticket_price"
                                    type="number"
                                    name="event_ticket_price"
                                    value={newEvent.event_ticket_price}
                                    onChange={handleEventInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="event_max_of_tickets" className='form-label'>
                                    Total No. of Tickets
                                </label>
                                <input
                                    className='form-control'
                                    required
                                    id="event_max_of_tickets"
                                    type="number"
                                    name="event_max_of_tickets"
                                    value={newEvent.event_max_of_tickets}
                                    onChange={handleEventInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="event_photo" className='form-label'>
                                    Event Image
                                </label>
                                <input
                                    id="event_photo"
                                    name="event_photo"
                                    type='file'
                                    className='form-control'
                                    onChange={handleImageChange} />
                                {imagePreview && (
                                    <img src={imagePreview}
                                        alt="Preview Event Image"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className='mb-3 mt-5' />
                                )}
                            </div>
                            <div className='d-grid gap-2 d-md-flex mt-2'>
                                <Link to={"/existing-events"} className='btn btn-outline-info'>
                                   Back
                                </Link>
                                <button className='btn btn-hotel'>Create Event</button>
                                <div>
                                {successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}
                            </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
