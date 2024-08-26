import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CarCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="third.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First Slide Label</h3>
          <p>Description for the first slide.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="first.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second Slide Label</h3>
          <p>Description for the second slide.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="second.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third Slide Label</h3>
          <p>Description for the third slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarCarousel;
