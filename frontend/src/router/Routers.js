import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './../pages/Home';
import About from './../pages/About';
import Tours from './../pages/Tours';
import TourDetails from './../pages/TourDetails';
import Login from './../pages/Login';
import Register from './../pages/Register';
import ResetPassword from './../pages/ResetPassword';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from "./../pages/ThankYou";
import Payment from "./../components/Payment/CheckoutForm";

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='thank-you' element={<ThankYou />} />
      <Route path='/tours/search' element={<SearchResultList />} />
      <Route path='/payment' element={<Payment />} />
    </Routes>
  );
}

export default Routers;
