import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config'; 

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: ""
  });

  const handleChange = e => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const totalAmount = Number(price) * Number(booking.guestSize);

  // Redirect to payment page
  const handleClick = e => {
    e.preventDefault();

    if (!user || user === undefined || user === null) {
      return alert('Please sign in');
    }

    // Store booking details and total amount in localStorage
    localStorage.setItem('bookingDetails', JSON.stringify({ ...booking, totalAmount }));

    // Navigate to payment page
    navigate('/payment');
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          Rs. {price} <span>/ per person</span>
        </h3>
        <span className="tour__rating d-flex justify-content-between">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* Booking Form Start */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              maxLength={10}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-1">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* Booking Form End */}

      {/* Booking Bottom */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              Rs. {price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span> Rs. {price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span> Rs. {totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
