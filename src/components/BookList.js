import React from "react";
import { useGlobalContext } from "../context";
import Book from "./Book";
import Loading from "./Loading";

const BookList = ({ books, mode }) => {
  const { loading } = useGlobalContext();

  //conditionally display loading if true:
  if (loading) {
    return <Loading />;
  }

  //conditionally render if books array doesn't exist:
  if (!books) {
    return (
      <section className="section">
        <h2 className="error-message">No books to display...</h2>
      </section>
    );
  }
  //conditionally render if books array is empty:
  if (books.length < 1) {
    return (
      <section className="section">
        <h2 className="error-message">No books to display...</h2>
      </section>
    );
  }

  //if loading state is false and books array has at least one book display books:
  return (
    <section className="section">
      <div className="books-container">
        {books.map((book) => {
          //pass book's id as a unique key and copy the rest of book's prop
          return <Book key={book.id} {...book} mode={mode} />;
        })}
      </div>
    </section>
  );
};

export default BookList;
