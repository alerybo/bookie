import React, { useEffect } from "react";
import BookList from "../components/BookList";
import SearchForm from "../components/SearchForm";
import { useGlobalContext } from "../context";

const Home = () => {
  const { books } = useGlobalContext();

  return (
    <main>
      <SearchForm />
      <BookList books={books} mode={'home'} />
    </main>
  );
};

export default Home;
