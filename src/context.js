import React, { useState, useContext, useEffect } from "react";
import defaultImage from "./assets/defaultImage.png";
import axios from "axios";

const AppContext = React.createContext();

const getLocalStorage = () => {
  let myBooks = localStorage.getItem("myBooks");
  if (myBooks) {
    return JSON.parse(localStorage.getItem("myBooks"));
  } else {
    return [];
  }
};

const AppProvider = ({ children }) => {
  //loading state
  const [loading, setLoading] = useState(true);
  //the search input state value
  const [searchValue, setSearchValue] = useState("inauthor:murakami");

  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState(getLocalStorage());

  //Type of display of Book component in a list
  const [bookDisplayType, setBookDisplayType] = useState("");

  const fetchBooks = () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "http://localhost:8000/books",
      params: {
        q: searchValue,
        maxResults: 40,
      }
    }
    axios
      .request(options)
      .then((response) => {
        console.log(response.data)
        const {items} = response.data;
        console.log(items)
        if (items) {
          //create an array of fetched books (search results)
          const fetchedBooks = items.map((item) => {
            //destructure an object containing book info from a book object
            const { id, volumeInfo } = item;
            //chack if cover image exists
            const imageURL = volumeInfo.imageLinks
              ? volumeInfo.imageLinks.thumbnail
              : defaultImage;
            //for each book return an object with title, author, cover...
            return {
              id,
              title: volumeInfo.title,
              authors: volumeInfo.authors,
              img: imageURL,
              desc: volumeInfo.description,
              category: volumeInfo.categories,
              mybooks: "",
              rate: 0,
            };
          });
          //set books state array to fetched books
          setBooks(fetchedBooks);
        }
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetching books depending on search value
  // const fetchBooks = async () => {
  //   //display loading animation
  //   setLoading(true);
  //   try {
  //     //fetch data
  //     const response = await fetch(
  //       `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=40&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
  //     );
  //     const data = await response.json();
  //     //destructure items (books) from data
  //     const { items } = data;
  //     //make sure items array exists
  //     if (items) {
  //       //create an array of fetched books (search results)
  //       const fetchedBooks = items.map((item) => {
  //         //destructure an object containing book info from a book object
  //         const { id, volumeInfo } = item;
  //         //chack if cover image exists
  //         const imageURL = volumeInfo.imageLinks
  //           ? volumeInfo.imageLinks.thumbnail
  //           : defaultImage;
  //         //for each book return an object with title, author, cover...
  //         return {
  //           id,
  //           title: volumeInfo.title,
  //           authors: volumeInfo.authors,
  //           img: imageURL,
  //           desc: volumeInfo.description,
  //           category: volumeInfo.categories,
  //           mybooks: "",
  //           rate: 0,
  //         };
  //       });
  //       //set books state array to fetched books
  //       setBooks(fetchedBooks);
  //     } else {
  //       //if items array doesn't exist set books state to an empty array
  //       setBooks([]);
  //       setLoading(false);
  //     }
  //     //finish loading
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  //start fetching books for every search input change
  useEffect(() => {
    fetchBooks();
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem("myBooks", JSON.stringify(myBooks));
  }, [myBooks]);

  //pass loading state, searched value state and books array in a context
  return (
    <AppContext.Provider
      value={{
        loading,
        searchValue,
        setSearchValue,
        books,
        setBooks,
        myBooks,
        setMyBooks,
        bookDisplayType,
        setBookDisplayType,
      }}
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
