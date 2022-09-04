import React from "react";
import { Link } from "react-router-dom";

const Book = ({ id, title, authors, img }) => {
  return (
    <article className="book">
      <div className="img-container">
        <img src={img} />
      </div>
      <div className="book-footer">
        <h3>
          {title.split("").length <= 30
            ? title
            : `${title.substring(0, 30)}...`}
        </h3>
        <p>{authors}</p>
        <Link to={`/book/${id}`} className="btn btn-details">
          DETAILS
        </Link>
      </div>
    </article>
  );
};

export default Book;
