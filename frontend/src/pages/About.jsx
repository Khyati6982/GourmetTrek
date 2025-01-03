import React from 'react'
import CommonSection from '../shared/CommonSection';
import '../styles/about.css';

const About = () => {
    return (
        <>
            <CommonSection title={"About Us"} />
        
            <div className="about__section">
                <h1>Welcome to <b><i>GourmetTrek</i></b></h1>
                <p>Embark on a culinary adventure with GourmetTrek, the ultimate destination for food lovers seeking adventure.</p>
                <p>At GourmetTrek, we believe that every flavor tells a story. We understand that food is the essence of culture, and we are dedicated to connecting you with authentic culinary experiences that resonate with the heart of each locale.</p>
                <p>Our platform is a sanctuary for food lovers to book immersive tours that promise a journey through the rich tapestry of global cuisines exploring the world's flavors one bite at a time.</p>
                <p>We are not just about tasting food; we are about experiencing cultures, traditions, and the stories behind every dish.</p>
                <p>Our commitment to excellence and sustainability means that with every tour, you are not only tasting the best of the world’s kitchens but also supporting the communities that make them thrive.</p>
                <p>Whether you are a seasoned foodie or a curious explorer, GourmetTrek offers a window to the world’s culinary soul, one tour at a time.</p>
                <p>Taste, travel, treasure - <b>GourmetTrek</b> is your gateway to a world of flavors where every dish is a destination!!!!!!</p>
            </div>
        </>
    );
}

export default About;