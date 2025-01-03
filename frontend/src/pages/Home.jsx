import React from 'react'
import '../styles/home.css';

import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';

import Subtitle from './../shared/Subtitle';

import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';

const Home = () => {
  return <>

  {/*    Hero Section Start    */}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center ">
              <Subtitle subtitle={'Know Before You Go'}/>
              <img src={worldImg} alt="" />
            </div>
            <h1>Travelling opens the doors to create <span className="highlight"> memories</span></h1>
            <p>Feast on the world’s wonders, one dish at a time—because the best stories are found between the pages of a passport and the flavors of local cuisine.</p>
          </div>
        </Col>

        <Col lg='2'>
          <div className="hero__img-box">
            <img src={heroImg} alt="" />
          </div>
        </Col>
        <Col lg='2'>
          <div className="hero__img-box hero__video-box mt-4">
            <video src={heroVideo} alt="" autoPlay controls loop muted/>
          </div>
        </Col>
        <Col lg='2'>
          <div className="hero__img-box mt-5">
            <img src={heroImg02} alt="" />
          </div>
        </Col>
      </Row>
    </Container>  
  </section> 
  {/*    Hero Section End    */}

  {/*    Search Box Start    */}
  <section>
    <Container>
      <Row>
        <Col lg ='3'>
          <h5 className="services__subtitle">Search Box</h5>
        </Col>
        <SearchBar />
      </Row>
    </Container>
  </section>
  {/*    Search Box End      */}

  <section>
    <Container>
      <Row>
        <Col lg='3'>
          <h5 className="services__subtitle">What we serve</h5>
          <h2 className="services__title">We offer our best services</h2>
        </Col>
        <ServiceList />
      </Row>
    </Container>
  </section>

  {/*      Featured Tour Section Start       */}
  <section>
    <Container>
      <Row>
        <Col lg="12" className="mb-5">
          <Subtitle subtitle={"Explore"} />
          <h2 className="featured__tour-title">Our featured tours</h2>
        </Col>
        <FeaturedTourList />
      </Row>
    </Container>  
  </section>
  {/*      Featured Tour Section End       */}
  
  {/*      Gallery Section Start       */}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
          <Subtitle subtitle={'Gallery'}/>
          <h2 className="gallery__title">Visit our customer's tour gallery</h2>
        </Col>
        <Col lg='12'>
          <MasonryImagesGallery />
        </Col>
      </Row>
    </Container>
  </section>
  {/*      Gallery Section End       */}

  {/*      Testimonial Section Start       */}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
          <Subtitle subtitle={'Customers Love'} />
          <h2 className="testimonial__title">What our customers say</h2>
        </Col>
        <Col lg="12">
          <Testimonials />
        </Col>
      </Row>
    </Container>
  </section>
  {/*      Testimonial Section End         */}
  <Newsletter />
  </>
};

export default Home