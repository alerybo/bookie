import React, { useState, useContext, useEffect } from "react";
import defaultImage from "./assets/defaultImage.png";
import axios from "axios";
import { AuthContext } from "./Auth";
import { getMyBooks, updateMyBooks } from "./firebase-config";

const AppContext = React.createContext();

// const getLocalStorage = () => {
//   let myBooks = localStorage.getItem("myBooks");
//   if (myBooks) {
//     return JSON.parse(localStorage.getItem("myBooks"));
//   } else {
//     return [];
//   }
// };

const AppProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  // ====================
  // state values
  // ====================
  //Firebase users
  const [users, setUsers] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  //Book search results
  const [books, setBooks] = useState([]);
  //loading state
  const [loading, setLoading] = useState(true);
  //the search input state value
  const [searchValue, setSearchValue] = useState("inauthor:murakami");
  //Type of display of Book component in a list (home/wanted/current/read)
  const [bookDisplayType, setBookDisplayType] = useState("");

  // ====================
  // Fetching data from backend
  // ====================
  const fetchBooks = () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "http://localhost:8000/books",
      params: {
        q: searchValue,
        maxResults: 40,
      },
    };
    axios
      .request(options)
      .then((response) => {
        const { items } = response.data;
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ====================
  // useEffect hooks
  // ====================
  //start fetching books for every search input change
  useEffect(() => {
    fetchBooks();
  }, [searchValue]);

  //fetching myBooks for curren user
  useEffect(() => {
    if (!currentUser) return;
    setMyBooks(getMyBooks(currentUser.uid));
  }, []);

  //saving to local storage
  useEffect(() => {
    if (currentUser) {
      updateMyBooks(myBooks, currentUser.uid);
    }
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
