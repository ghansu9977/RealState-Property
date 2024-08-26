import React from 'react';
import './Signup.css';  // Import custom styles for the component

const AboutUs = () => {
  return (
    <div id="about" className="about-us section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="left-image wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
              <img src="as.png" alt="person graphic" />
            </div>
          </div>
          <div className="col-lg-8 align-self-center">
            <div className="services">
              <div className="row">
                {[
                  {
                    icon: 'assets/images/service-icon-01.png',
                    title: 'Data Analysis',
                    description: 'Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter',
                    delay: '0.5s'
                  },
                  {
                    icon: 'assets/images/service-icon-02.png',
                    title: 'Data Reporting',
                    description: 'Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter',
                    delay: '0.7s'
                  },
                  {
                    icon: 'assets/images/service-icon-03.png',
                    title: 'Web Analytics',
                    description: 'Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter',
                    delay: '0.9s'
                  },
                  {
                    icon: 'assets/images/service-icon-04.png',
                    title: 'SEO Suggestions',
                    description: 'Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter',
                    delay: '1.1s'
                  }
                ].map((service, index) => (
                  <div className="col-lg-6" key={index}>
                    <div
                      className="item wow fadeIn"
                      data-wow-duration="1s"
                      data-wow-delay={service.delay}
                    >
                      <div className="icon">
                        <img src={service.icon} alt={service.title} />
                      </div>
                      <div className="right-text">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; // Export component for use in other parts of the application
