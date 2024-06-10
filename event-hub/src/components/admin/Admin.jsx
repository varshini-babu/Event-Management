import React from 'react'
import {Link} from 'react-router-dom'

export const Admin = () => {
  return (
    <section className='container mt-5'>
        <h2>Welcome to Admin Panel</h2>
        <hr/>
        <Link to={"/existing-events"}>
        Manage Events</Link>
        <br/>
        <Link to={"/existing-bookings"}>
        Manage Bookings</Link>
    </section>
  )
}
