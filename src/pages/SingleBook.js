import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import Error from "./Error";

const SingleBook = () => {
  const { books, myBooks, setMyBooks } = useGlobalContext();
  const [book, setBook] = useState(null);
  //ID of current book
  const { id } = useParams();
  //Find a book with this ID to display
  useEffect(() => {
    setBook(books.find((book) => book.id === id));
  }, [books, id]);

  //Add book to myBooks and assign it's mybooks prop value equal to clicked button's ID
  const addToMyBooks = (e) => {
    const buttonID = e.target.id;
    if (myBooks.some((book) => book.id === id && book.mybooks === buttonID)) {
      alert("already on the list");
    } else if (
      myBooks.some((book) => book.id === id && book.mybooks !== buttonID)
    ) {
      alert("this book is already on another list");
      return;
    } else {
      const newMyBook = {
        ...books.find((book) => book.id === id),
        mybooks: buttonID,
      };
      const newMyBooks = [...myBooks, newMyBook];
      setMyBooks(newMyBooks);
    }
  };

  //Display error if book doesn't exist
  if (!book) {
    return <Error />;
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
            <button id="wanted" className="btn" onClick={addToMyBooks}>
              want to read
            </button>
            <button id="current" className="btn" onClick={addToMyBooks}>
              currently reading
            </button>
            <button id="read" className="btn" onClick={addToMyBooks}>
              read
            </button>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleBook;
