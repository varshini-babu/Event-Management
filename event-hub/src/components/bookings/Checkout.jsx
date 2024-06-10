import React, { useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { BookingForm } from './BookingForm'
import { Card } from 'react-bootstrap'
import {EventCarousel} from '../common/EventCarousel'
import { getEventById } from '../utils/ApiFunctions'

export const Checkout = () => {
  const [eventInfo, setEventInfo] = useState([{
    event_photo: "",
    event_name: "",
    event_date: "",
    event_description: "",
    event_time: "",
    event_venue: "",
    event_ticket_price: "",
    event_max_of_tickets: ""
}]);

const [error, setError] = useState("");
const [isLoading,setIsLoading] = useState(true);

const { eventId } = useParams();

	useEffect(() => {
		setTimeout(() => {
			getEventById(eventId)
				.then((response) => {
					setEventInfo(response)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error)
					setIsLoading(false)
				})
		}, 1000)
	}, [eventId])


  return (
    <div>
			<section className="container">
				<div className="row">
					<div className="col-md-4 mt-5 mb-5">
						{isLoading ? (
							<p>Loading event information...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							<div className="room-info">
							
                <Card.Img
													variant="top"
													src={`data:image/png;base64, ${eventInfo.event_photo}`}
													alt="Event Image"
													className="w-100"
													style={{ height: "200px" }}
												/>
								<table className="table table-bordered">
									<tbody>
										<tr>
											<th>Event Name:</th>
											<td>{eventInfo.event_name}</td>
										</tr>
										<tr>
											<th>Event Price:</th>
											<td>Rs.{eventInfo.event_ticket_price}</td>
										</tr>
										<tr>
                      <th>Event Venue:</th>
                      <td>{eventInfo.event_venue}</td>
										</tr>
                    <tr>
                      <th>Event Time:</th>
                      <td>{eventInfo.event_time}</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
					</div>
					<div className="col-md-8">
						<BookingForm />
					</div>
				</div>
			</section>
			<div className="container">
				<EventCarousel />
			</div>
		</div>
	)
  
}
