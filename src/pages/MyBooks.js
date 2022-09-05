import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import BookList from "../components/BookList";

const categories = [
  { displayMode: "wanted", buttonText: "Want to read" },
  { displayMode: "current", buttonText: "Currently reading" },
  { displayMode: "read", buttonText: "Read" },
];

const MyBooks = () => {
  const { myBooks } = useGlobalContext();

  const [category, setCategory] = useState({ displayMode: "wanted", buttonText: "Want to read" });
  const [displayedBooks, setDisplayedBooks] = useState(myBooks);

  //get all 'want to read' books to display them by default
  useEffect(() => {
    const wantedBooks = myBooks.filter((book) => book.mybooks === "wanted");
    setDisplayedBooks(wantedBooks);
  }, []);

  const changeCategory = (cat) => [setCategory(cat)];

  //filter displayed books
  const filterBooks = () => {
    const booksToDisplay = myBooks.filter((book) => book.mybooks === category.displayMode);
    setDisplayedBooks(booksToDisplay);
  };

  //refresh display if myBooks array changes
  useEffect(() => {
    filterBooks();
  }, [category,myBooks]);
  

  return (
    <section className="section">
      <div className="btn-container">
        {categories.map((cat, index) => {
          return (
            <button
              className={`btn ${cat.displayMode === category.displayMode && "btn-active"}`}
              key={index}
              onClick={() => changeCategory(cat)}
            >
              {cat.buttonText}
            </button>
          );
        })}
      </div>

      <BookList books={displayedBooks} mode={category} />
    </section>
  );
};

export default MyBooks;
