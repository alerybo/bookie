import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Rating } from "react-simple-star-rating";

const Book = ({ id, title, authors, img, mode, rate }) => {
  const { myBooks, setMyBooks, books, setBooks } = useGlobalContext();

  const deleteBook = () => {
    const newMyBooks = myBooks.filter((book) => book.id !== id);
    setMyBooks(newMyBooks);
    console.log('hello')
  };

  const handleRating = (rate) => {
    const newMyBooks = myBooks.map((book) => {
      if (book.id === id) {
        return { ...book, rate: rate };
      } else {
        return book;
      }
    });
    setMyBooks(newMyBooks);
  };

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
        {mode.displayMode === "read" && (
          <Rating onClick={handleRating} ratingValue={rate} />
        )}

        <div className="btn-container book-btn-container">
          <Link to={`/book/${id}`} className="btn btn-details">
            DETAILS
          </Link>

          {mode !== "home" && (
            <button className="btn" onClick={deleteBook}>
              DELETE
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Book;
