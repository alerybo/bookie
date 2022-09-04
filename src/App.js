import React from "react";
//React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import MyBooks from "./pages/MyBooks";
import SingleBook from "./pages/SingleBook";
//Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/mybooks" element={<MyBooks />} />
        <Route exact path="/book/:id" element={<SingleBook />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
