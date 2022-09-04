import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

const SingleBook = () => {
  const { books } = useGlobalContext();
  const { id } = useParams();
  const [book, setbook] = useState(null);

  useEffect(() => {
    const singleBook = books.find((book) => book.id === id);
    setbook(singleBook);
  }, [books, id]);

  if (!book) {
    return <h2>Oooops! Something went wrong...</h2>;
  } else {
    const { title, authors, img, category, desc } = book;
    return (
      <section className="section book-section">
        <Link to="/" className="btn">
          Go Back
        </Link>
        <div className="book-container">
          <div className="img-container">
            <img src={img} alt={title} />
          </div>

          <div className="book-info">
            <h2 className="book-title">{title}</h2>
            <p className="book-author">{authors}</p>
            <p className="book-category">{category}</p>
            <p className="book-desc">{desc}</p>
          </div>
          <div className="btn-container">
            <button className="btn">want to read</button>
            <button className="btn">currently reading</button>
            <button className="btn">read</button>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleBook;
