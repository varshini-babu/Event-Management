import { useEffect, useState } from 'react';
import { getEventById, updateEvent } from '../utils/ApiFunctions';
import { useParams, Link } from 'react-router-dom';

export const EditEvent = () => {
    const [event, setEvent] = useState({
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
    const { eventId } = useParams();

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const updatedEvent = { ...event, event_photo: selectedImage };
            setEvent(updatedEvent);
            setImagePreview(URL.createObjectURL(selectedImage));
        }
    };

    const handleEventInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId);
                
                // Ensure the date and time fields are correctly formatted
                const formattedEventData = {
                    ...eventData,
                    event_date: eventData.event_date ? new Date(eventData.event_date).toLocaleDateString('en-CA') : "",
                    event_time: eventData.event_time ? eventData.event_time.substring(0, 5) : ""
                };

                setEvent(formattedEventData);
                if (eventData.event_photo) {
                    setImagePreview(`data:image/png;base64,${eventData.event_photo}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvent();

        return () => {
            if (imagePreview && imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [eventId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let key in event) {
            if (key === 'event_photo' && event.event_photo instanceof File) {
                formData.append(key, event[key]);
            } else if (key !== 'event_photo') {
                formData.append(key, event[key]);
            }
        }

        try {
            const response = await updateEvent(eventId, formData);
            if (response.status === 200) {
                setSuccessMessage("Event updated successfully!");
                const updatedEventData = await getEventById(eventId);
                setEvent(updatedEventData);
                if (updatedEventData.event_photo) {
                    setImagePreview(`data:image/png;base64,${updatedEventData.event_photo}`);
                }
                setErrorMessage("");
            } else {
                setErrorMessage("Error in updating event");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return (
        <section className='container mt-5 mb-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    <h2 className='mt-5 mb-2'>Edit Event</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="event_name" className='form-label'>Event Name</label>
                            <input
                                className='form-control'
                                required
                                id="event_name"
                                type='text'
                                name="event_name"
                                value={event.event_name}
                                onChange={handleEventInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="event_date" className='form-label'>Event Date</label>
                            <input
                                className='form-control'
                                required
                                id="event_date"
                                type='date'
                                name="event_date"
                                value={event.event_date}
                                onChange={handleEventInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="event_time" className='form-label'>Event Time</label>
                            <input
                                className='form-control'
                                required
                                id="event_time"
                                type="time"
                                name="event_time"
                                value={event.event_time}
                                onChange={handleEventInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="event_description" className='form-label'>Event Description</label>
                            <textarea
                                className='form-control'
                                required
                                id="event_description"
                                name="event_description"
                                value={event.event_description}
                                onChange={handleEventInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="event_venue" className='form-label'>Event Venue</label>
                            <input
                                className='form-control'
                                required
                                id="event_venue"
                                type="text"
                                name="event_venue"
                                value={event.event_venue}
                                onChange={handleEventInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="event_ticket_price" className='form-label'>Event Ticket Price</label>
                            <input
                                className='form-control'
                                required
                                id="event_ticket_price"
                                type="number"
                                name="event_ticket_price"
                                value={event.event_ticket_price}
                                onChange={handleEventInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="event_max_of_tickets" className='form-label'>Total No. of Tickets</label>
                            <input
                                className='form-control'
                                required
                                id="event_max_of_tickets"
                                type="number"
                                name="event_max_of_tickets"
                                value={event.event_max_of_tickets}
                                onChange={handleEventInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="event_photo" className='form-label'>Event Image</label>
                            <input
                                id="event_photo"
                                name="event_photo"
                                type='file'
                                className='form-control'
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Event preview"
                                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                                    className="mt-3"
                                />
                            )}
                        </div>
                        <div className='d-grid gap-2 d-md-flex mt-2'>
                            <Link to={"/existing-events"} className='btn btn-outline-info ml-5 gap-2'> Back </Link>
                            <button type="submit" className='btn btn-outline-warning'>Edit Event</button>
                            {successMessage && (
                                <div className="alert alert-success fade show"> {successMessage}</div>
                            )}
                            {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
