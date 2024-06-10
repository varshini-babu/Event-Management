import React from 'react'
import { useState,useEffect } from 'react'
import { getAllEvents } from '../utils/ApiFunctions'
import {Card, Row,Col,Container,Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import moment from 'moment'

export const EventCarousel = () => {
    const [events, setEvents] = useState([{ event_id: "", event_name: "", event_description: "",event_date:"",event_time:"",event_venue:"", event_photo: "" }])
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		getAllEvents()
			.then((data) => {
				setEvents(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setErrorMessage(error.message)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return <div className="mt-5">Loading events....</div>
	}
	if (errorMessage) {
		return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>
	}

  return (
    <section className="bg-light mb-5 mt-5 shadow">
			<Link to={"/browse-all-events"} className="hote-color text-center">
				Browse all events
			</Link>

			<Container>
				<Carousel indicators={false}>
					{[...Array(Math.ceil(events.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{events.slice(index * 4, index * 4 + 4).map((event) => (
									<Col key={event.event_id} className="mb-4" xs={12} md={6} lg={3}>
										<Card>
											<Link to={`/book-event/${event.event_id}`}>
												<Card.Img
													variant="top"
													src={`data:image/png;base64, ${event.event_photo}`}
													alt="Event Image"
													className="w-100"
													style={{ height: "200px" }}
												/>
											</Link>
											<Card.Body>
                                            <Card.Title className="hotel-color">{event.event_name}</Card.Title>
                                            <Card.Title className='event-detail'>{event.event_description}</Card.Title>
                                            <Card.Title className='event-detail'><b>Date: </b>{moment(event.event_date).subtract(1, "month").format("MMM Do, YYYY")}</Card.Title>
                                            <Card.Title className='event-detail'><b>Time: </b>{event.event_time}</Card.Title>
                                            <Card.Title className='event-detail'><b>Venue: </b>{event.event_venue}</Card.Title>
                                            <Card.Title className='event-detail'><b>Ticket Price: </b>{event.event_ticket_price}</Card.Title>
												<div className="flex-shrink-0">
													<Link to={`/book-event/${event.event_id}`} className="btn btn-hotel btn-sm">
														Book Now
													</Link>
												</div>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
  )
}
