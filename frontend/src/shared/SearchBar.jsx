import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';

import { BASE_URL } from './../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  
  const cuisineRef = useRef('');
  const navigate = useNavigate();

  const searchHandler = async() => {
    const cuisine = cuisineRef.current.value;
    
    if(cuisine === "") {
      return alert("This field is required");
    }

    const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?cuisine=${cuisine}`)

    if(!res.ok) alert('Something went wrong')

    const result = await res.json()

    navigate(`/tours/search?cuisine=${cuisine}`, {state: result.data})

  };

  return (
  <Col lg='12'>
    <h5 className="services__subtitle">Look up your destination</h5> 
    <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
            <FormGroup className="d-flex gap-2 form__group form__group-fast">
                <span><i className="ri-map-pin-line"></i></span>
                <div>
                  <h6>Cuisine</h6>
                  <input type="text" placeholder="Which Cuisine Do You Want To Explore" size={35} ref={cuisineRef}/>
                </div>
            </FormGroup>
                    
            <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
            </span>
        </Form>
    </div>
  </Col>
  )
};

export default SearchBar;
