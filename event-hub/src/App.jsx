import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ExistingEvents } from './components/event/ExistingEvents';
import { AddEvent } from './components/event/AddEvent';
import { Home } from './components/home/Home';
import { EditEvent } from './components/event/EditEvent';
import { NavBar } from './components/layout/NavBar';
import { Footer } from './components/layout/Footer';
import { EventListing } from './components/event/EventListing';
import { Admin } from './components/admin/Admin';
import { Checkout } from './components/bookings/Checkout';
import { BookingSuccess } from "./components/bookings/BookingSuccess";
import Bookings from "./components/bookings/Bookings";
import {FindBooking} from './components/bookings/FindBooking';
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import { AuthProvider } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-event/:eventId" element={<EditEvent />} />
            <Route path="/existing-events" element={<ExistingEvents />} />
            <Route path="/add-event" element={<AddEvent />} />

            <Route path="/book-event/:eventId"
             element={<RequireAuth><Checkout /></RequireAuth>} />
            <Route path="/browse-all-events" element={<EventListing />} />
            <Route path="/admin" element={<Admin /> } />
            <Route path="/booking-success" element={<BookingSuccess /> } />
            <Route path="/existing-bookings" element={<Bookings />} />
            <Route path="/find-booking" element={<FindBooking />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration/>} />

            <Route path="/profile" element={<Profile/>} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </AuthProvider>
  )
}

export default App;