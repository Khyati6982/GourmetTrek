import React from 'react'
import ServiceCard from './ServiceCard';
import { Col } from "reactstrap";

import clocheImg from '../assets/images/cloche.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
    {
        imgUrl: clocheImg,
        title: "Curated Culinary Tours",
        desc: "With expertly guided experiences that promise to delight your palate and enrich your cultural appetite.",
    },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "We ensure that every moment of your journey is as enriching as it is unforgettable.",
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "We craft tailor-made experiences that cater to your unique taste and preferences as unique as you are.",
    }  
]


const ServiceList = () => {
  return (
    <>
        {servicesData.map((item, index) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
                <ServiceCard item={item} />
            </Col>
        ))}
    </>
  );
};

export default ServiceList;