import React from 'react'
import { MainHeader } from '../layout/MainHeader'
import { EventCarousel } from '../common/EventCarousel'
import { useLocation } from "react-router-dom"

export const Home = () => {
  const location = useLocation()

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")
  return (
    <section>
      {message && <p className="text-warning px-5">{message}</p>}
			{currentUser && (
				<h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
			)}
			<MainHeader />
      <section className='container'>
      <EventCarousel/>
      </section>
      </section>
  )
}
