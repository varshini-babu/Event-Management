import React from 'react'
import {Card, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import moment from 'moment'

export const EventCard = ({event}) => {

  return (
    <Col key = {event.event_id} className='mb-4' xs={12}>
        <Card>
            <Card.Body className="d-flex flex-wrap align-items-center">
                <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
                <Link to={`/book-event/${event.event_id}`}>
                <Card.Img
								variant="top"
								src={`data:image/png;base64, ${event.event_photo}`}
								alt="Event Photo"
								style={{ width: "100%", maxWidth: "200px", height: "auto" }}
							/></Link>
                </div>
                <div className="flex-grow-1 ml-3 px-5">
                
						<Card.Title className="hotel-color">{event.event_name}</Card.Title>
                        <Card.Title className='event-detail'>{event.event_description}</Card.Title>
						<Card.Title className='event-detail'><b>Date: </b>{moment(event.event_date).subtract(1, "month").format("MMM Do, YYYY")}</Card.Title>
                        <Card.Title className='event-detail'><b>Time: </b>{event.event_time}</Card.Title>
                        <Card.Title className='event-detail'><b>Venue: </b>{event.event_venue}</Card.Title>
                        <Card.Title className='event-detail'><b>Ticket Price: </b>{event.event_ticket_price}</Card.Title>
                        
						
					</div>
                    <div className="flex-shrink-0 mt-3">
						<Link to={`/book-event/${event.event_id}`} className="btn btn-hotel btn-sm">
							Book Now
						</Link>
					</div>

            </Card.Body>
        </Card>

    </Col>

  )
}
