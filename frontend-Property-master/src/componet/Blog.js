import React from 'react';
import './Signup.css'; // Assuming you have a CSS file for custom styles

const Blog = () => {
  const blogPosts = [
    {
      date: '24 Mar 2021',
      author: 'TemplateMo',
      category: 'Branding',
      title: 'SEO Agency & Digital Marketing',
      description: 'Lorem ipsum dolor sit amet, consectetur and sed doer ket eismod tempor incididunt ut labore et dolore magna...',
      image: 'a.jpg'
    },
    {
      date: '18 Mar 2021',
      title: 'New Websites & Backlinks',
      description: 'Lorem ipsum dolor sit amsecteturii and sed doer ket eismod...',
      image: 'a.jpg'
    },
    {
      date: '14 Mar 2021',
      title: 'SEO Analysis & Content Ideas',
      description: 'Lorem ipsum dolor sit amsecteturii and sed doer ket eismod...',
      image: 'a.jpg'
    },
    {
      date: '06 Mar 2021',
      title: 'SEO Tips & Digital Marketing',
      description: 'Lorem ipsum dolor sit amsecteturii and sed doer ket eismod...',
      image: 'a.jpg'
    }
  ];

  return (
    <div id="blog" className="our-blog section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.25s">
            <div className="section-heading">
              <h2>Check Out What Is <em>Trending</em> In Our Latest <span>News</span></h2>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.25s">
            <div className="top-dec">
              <img src="c.jpg" alt="Blog Decoration" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.25s">
            <div className="left-image">
              <a href="#"><img src={blogPosts[0].image} alt="Workspace Desktop" /></a>
              <div className="info">
                <div className="inner-content">
                  <ul>
                    <li><i className="fa fa-calendar"></i> {blogPosts[0].date}</li>
                    <li><i className="fa fa-users"></i> {blogPosts[0].author}</li>
                    <li><i className="fa fa-folder"></i> {blogPosts[0].category}</li>
                  </ul>
                  <a href="#"><h4>{blogPosts[0].title}</h4></a>
                  <p>{blogPosts[0].description}</p>
                  <div className="main-blue-button">
                    <a href="#">Discover More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.25s">
            <div className="right-list">
              <ul>
                {blogPosts.slice(1).map((post, index) => (
                  <li key={index}>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> {post.date}</span>
                      <a href="#"><h4>{post.title}</h4></a>
                      <p>{post.description}</p>
                    </div>
                    <div className="right-image">
                      <a href="#"><img src={post.image} alt="Blog Thumbnail" /></a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
