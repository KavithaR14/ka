import React from 'react'
import Hero from '../Hero/Hero';
import Testimonials from '../Testimonial/Testimonial';
import Navbar from '../Navbar/Navbar';
import Services from '../Services/Services';

function Home() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <Services/>
            <Testimonials/>
        </>
    )
}

export default Home;