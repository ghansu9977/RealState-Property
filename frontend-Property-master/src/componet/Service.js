import React from 'react';
import './Signup.css'; // Assuming you have a CSS file for custom styles

const Services = () => {
  return (
    <div id="services" className="our-services section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">
            <div className="left-image">
              <img src="as.png" alt="Services" />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.2s">
            <div className="section-heading">
              <h2>Grow your website with our <em>SEO</em> service &amp; <span>Project</span> Ideas</h2>
              <p>
                Space Dynamic HTML5 template is free to use for your website projects. However, you are not permitted to redistribute the template ZIP file on any CSS template collection websites. Please contact us for more information. Thank you for your kind cooperation.
              </p>
            </div>
            <div className="row">
              {[
                { title: 'Website Analysis', percentage: '84%' },
                { title: 'SEO Reports', percentage: '88%' },
                { title: 'Page Optimizations', percentage: '94%' }
              ].map((skill, index) => (
                <div className="col-lg-12" key={index}>
                  <div className={`progress-skill-bar ${index === 0 ? 'first-bar' : index === 1 ? 'second-bar' : 'third-bar'}`}>
                    <h4>{skill.title}</h4>
                    <span>{skill.percentage}</span>
                    <div className="filled-bar" style={{ width: skill.percentage }}></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
