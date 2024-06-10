import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192"
});

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

/* This function adds a new event to the database */
export async function addEvent(event_photo, event_name, event_date, event_description, event_time, event_venue, event_ticket_price, event_max_of_tickets) {
    const formData = new FormData();
    formData.append("event_photo", event_photo);
    formData.append("event_name", event_name);
    formData.append("event_date", event_date); // Fixed typo
    formData.append("event_description", event_description);
    formData.append("event_time", event_time);
    formData.append("event_venue", event_venue);
    formData.append("event_ticket_price", event_ticket_price);
    formData.append("event_max_of_tickets", event_max_of_tickets);

    try {
        const response = await api.post("/events/add/new-event", formData, {
			headers: {
                'Content-Type': 'multipart/form-data'
            }
		});
        if (response.status === 201) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error adding new event:", error);
        throw error;
    }
}
/*
export async function addEvent(event_photo, event_name, event_date, event_description, event_time, event_venue, event_ticket_price, event_max_of_tickets) {
    const formData = new FormData();
    formData.append("event_photo", event_photo);
    formData.append("event_name", event_name);
    formData.append("event_date", event_date);
    formData.append("event_description", event_description);
    formData.append("event_time", event_time);
    formData.append("event_venue", event_venue);
    formData.append("event_ticket_price", event_ticket_price);
    formData.append("event_max_of_tickets", event_max_of_tickets);

    try {
        const response = await api.post("/events/add/new-event", formData, {
            headers: {
                ...getHeader() // Assuming getHeader() returns other necessary headers, e.g., Authorization
                // Note: Do not include 'Content-Type' header here
            }
        });
        if (response.status === 201) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error adding new event:", error);
        throw error;
    }
}*/


// This function gets all event names from the database 
export async function getEventName() {
    try {
        const response = await api.get("/events/event/name");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching event names");
    }
}
//This function get all events from database
export async function getAllEvents(){
    try{
            const result = await api.get("/events/all-events")
            return result.data
    }catch(error){
        throw new Error("Error fetching events")
    }
}
//This function delete event by id
export async function deleteEvent(eventId) {
    try {
        const result = await api.delete(`/events/delete/event/${eventId}`,{
			headers: getHeader()
		})
        return result.data
    } catch (error) {
        throw new Error(`Error deleting event ${error.message}`)
    }
}

//This function update the event details
export const updateEvent = async (eventId, formData) => {
    try {
        const response = await api.put(`/events/update/${eventId}`, formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') // if you use JWT for authentication
            }
        });
        return response;
    } catch (error) {
        throw new Error(`Error updating event: ${error.message}`);
    }
};



//This function fetch event by the id

export async function getEventById(eventId){
    try{
        const result = await api.get(`/events/event/${eventId}`)
        return result.data
    }catch(error){
        throw new Error(`Error fetching event ${error.message}`)
    }
}

//This function save the new booking to the database
export async function bookEvent(event_id,booking){
    try{
        const response = await api.post(`/bookings/event/${event_id}/booking`,booking)
        return response.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error booking event : ${error.message}`)
        }
    }
}

//This function fetch all booking details from database
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings",{
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

//This function fetch the confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

//This function cancel the booking
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}


/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}


/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
try {
		const response = await api.get(`/users/${userId}`, {headers: getHeader()})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}




