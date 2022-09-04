import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="section about-section">
      <div className="about-content">
        <h1>About Bookie.</h1>
        <p>
          Bookie is a React.js app made for book lovers. <br />
          Project relies on Google Books API which provides information about
          over 10 million books.
          <br />
          You can create lists of books you want to read, you are currently
          reading or you've already read!
        </p>
        <div className="btn-container">
          <Link to="/" className="btn">
            get started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
