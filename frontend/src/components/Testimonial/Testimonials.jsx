import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'
import ava04 from '../../assets/images/ava-4.jpg'

const Testimonials = () => {
    
    const settings= {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        
        responsive:[
            {
                breakpoint: 992, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    }
  
    return (
    <Slider { ...settings}>
    <div className="testimonial py-4 px-3">
        <h5>A Great Food Journey!!!</h5>
        <p>Going on a trip with ‘GourmetTrek’ was like reading a book full of tasty stories from all over the world. Every place in Rome had its own special taste, and ‘GourmetTrek’ made sure I tried them all. It’s not just about eating; it’s a journey that makes you happy.</p>        
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
            <div>
                <h6 className="mb-0 mt-3">Raj Kulkarni</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className="testimonial py-4 px-3">
        <h5>Tastes I never knew</h5>
        <p>I didn’t know a website could take me to try food made by the best cooks in the world. ‘GourmetTrek’ showed me so many new tastes. I learned a lot and had fun eating.</p>        
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
            <div>
                <h6 className="mb-0 mt-3">Lia Franklin</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className="testimonial py-4 px-3">
        <h5>Finding Good Food</h5>
        <p>‘GourmetTrek’ was like a map that showed me where to find good food. From small snacks on the street to fancy meals, every place they told me about was great. This service is like a ticket to a place full of good food.</p>        
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
            <div>
                <h6 className="mb-0 mt-3">Alex John</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className="testimonial py-4 px-3">
        <h5>Delicious Discoveries</h5>
        <p>Using ‘GourmetTrek’ was like finding a treasure map of tastes. Every food place they suggested was a new discovery and made me love trying different foods even more. It’s like having a friend who knows all the best food spots.</p>        
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava04} className="w-25 h-25 rounded-2" alt="" />
            <div>
                <h6 className="mb-0 mt-3">Rita Malhotra</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    

    </Slider>
  );    
};

export default Testimonials;