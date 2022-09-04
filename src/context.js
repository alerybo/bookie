import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //loading state
  const [loading, setLoading] = useState(true);
  //the search input state value
  const [searchValue, setSearchValue] = useState("unbrok");
  //fetched data
  const [books, setBooks] = useState([]);

  //fetching books depending on search value
  const fetchBooks = async () => {
    //display loading animation
    //setLoading(true);
    try {
      //fetch data
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=AIzaSyDcn_-WfKeuCOEIRWQujrESOwcgSgbD9-Y`
      );
      const data = await response.json();
      //destructure items (books) from data
      const { items } = data;
      //make sure items array exists
      if (items) {
        //create an array of fetched books (search results)
        const fetchedBooks = items.map((item) => {
          //destructure an object containing book info from a book object
          const { id, volumeInfo } = item;
          //for each book return an object with title, author, cover...
          return {
            id,
            title: volumeInfo.title,
            authors: volumeInfo.authors,
            img: volumeInfo.imageLinks.thumbnail,
            desc: volumeInfo.description,
            category: volumeInfo.categories,
          };
        });
        //set books state array to fetched books
        setBooks(fetchedBooks);
      } else {
        //if items array doesn't exist set books state to an empty array
        setBooks([]);
        setLoading(false);
      }
      //finish loading
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //start fetching books for every search input change
  useEffect(() => {
    fetchBooks();
  }, [searchValue]);

  //pass loading state, searched value state and books array in a context
  return (
    <AppContext.Provider
      value={{ loading, searchValue, setSearchValue, books }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
