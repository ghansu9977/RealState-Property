import Blog from "./Blog";
import CarCarousel from "./Carosal";
import Contact from "./Contact";
import DummyProperty from "./dummyProperty";
import Footer from "./Footer";
import Services from "./Service";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        // Fetch properties data when component mounts
        axios.get('http://localhost:3000/properties/viewProperties')
          .then(result => {
            setProperties(result.data);
          })
          .catch(err => {
            console.error('Error fetching properties:', err);
          });
      }, []);
    return <>
        <Header setProperties={setProperties}/>
        <CarCarousel />
        <DummyProperty properties={properties}/>
        <Services />
        <Blog />
        {/* <Contact /> */}
        <Footer />
    </>
}