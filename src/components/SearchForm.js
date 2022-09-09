import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchValue } = useGlobalContext();
  const searchInput = React.useRef("");

  //prevent page refresh if user presses enter
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //on every input value change set searched value for search input's current value
  const searchBook = () => {
    //replace spaces in a string with +
    let searchString = searchInput.current.value.split(" ").join("+");
    //set state value
    setSearchValue(searchString);
  };

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Search your favorite book</label>
          <input
            type="text"
            id="title"
            ref={searchInput}
            placeholder="type here"
            onChange={searchBook}
          ></input>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
