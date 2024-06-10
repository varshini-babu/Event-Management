import  { useState, useEffect } from 'react';
import { getAllEvents, deleteEvent } from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import EventSearch from "../common/EventSearch";
import {EventPaginator} from "../common/EventPaginator";
import { FaPlus, FaTrashAlt, FaEye, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from 'moment'

export const ExistingEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const result = await getAllEvents();
      setEvents(result);
      setFilteredEvents(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [events]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (eventId) => {
    try {
      const result = await deleteEvent(eventId);
      if (result === "") {
        setSuccessMessage(`Event Id ${eventId} was deleted`);
        fetchEvents();
      } else {
        console.error(`Error deleting event: ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error deleting event:", error); // Log the full error
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const calculateTotalPages = (filteredEvents, eventsPerPage, events) => {
    const totalEvents = filteredEvents.length > 0 ? filteredEvents.length : events.length;
    return Math.ceil(totalEvents / eventsPerPage);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
        {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
      </div>

      {isLoading ? (
        <p>Loading existing events...</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Existing Events</h2>
              <Link to={"/add-event"}>
                <FaPlus/> Add Event
              </Link>
            </div>

            <Row>
              <Col md={6} className="mb-2 md-mb-0">
                <EventSearch data={events} setFilteredData={setFilteredEvents} />
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>Event ID</th>
                  <th>Event Name</th>
                  <th>Event Description</th>
                  <th>Event Date</th>
                  <th>Event Time</th>
                  <th>Event Venue</th>
                  <th>Event Ticket Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((event) => (
                  <tr key={event.event_id} className="text-center">
                    <td>{event.event_id}</td>
                    <td>{event.event_name}</td>
                    <td>{event.event_description}</td>
                    <td>{moment(event.event_date).subtract(1, "month").format("MMM Do, YYYY")}</td>
                    <td>{event.event_time}</td>
                    <td>{event.event_venue}</td>
                    <td>{event.event_ticket_price}</td>
                    <td className="gap-2">
                      <Link to={`/edit-event/${event.event_id}`}>
                        <span className='btn btn-info gap-2 btn-sm gap-2'><FaEye /></span>
                        <span className='btn btn-warning gap-2 btn-sm gap-2'><FaEdit /></span>
                      </Link>
                      <button className='btn btn-danger gap-2 btn-sm gap-2' onClick={() => handleDelete(event.event_id)}><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <EventPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(filteredEvents, eventsPerPage, events)}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};
