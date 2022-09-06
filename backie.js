const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors())

app.get("/books", (req, res) => {
  const searchTerm = req.query.q;
  const results = req.query.maxResults;

  const options = {
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?",
    params: {
      q: searchTerm,
      maxResults: results,
    },
    headers: { key: process.env.REACT_APP_GOOGLE_BOOKS_API_KEY },
  };
  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(8000, () => console.log(`server is running on port ${PORT}`));
