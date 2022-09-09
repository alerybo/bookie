import React from "react";
//React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import MyBooks from "./pages/MyBooks";
import SingleBook from "./pages/SingleBook";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
//Components
import Navbar from "./components/Navbar";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/mybooks" element={<MyBooks />} />
          <Route exact path="/book/:id" element={<SingleBook />} />
          <Route exact path="/*" element={<Error />} />
        </Route>
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
