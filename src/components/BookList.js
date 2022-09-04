import React from "react";
import { useGlobalContext } from "../context";
import Book from "./Book";
import Loading from "./Loading";

const BookList = ({books}) => {
  const { loading } = useGlobalContext();

  //conditionally display loading if true:
  if (loading) {
    console.log(loading)
    return <Loading />;
  }
  //conditionally render if books array is empty:
  if (books.length < 1) {
    return <h2 className="section-title">No books match your search</h2>;
  }

  //if loading state is false and books array has at least one book display books:
  return (
    <section className="section">
      <div className="books-container">
        {books.map((book) => {
          //pass book's id as a unique key and copy the rest of book's prop
          return <Book key={book.id} {...book} />;
        })}
      </div>
    </section>
  );
};

export default BookList;
