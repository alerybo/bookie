import React,{useContext} from "react";
import { Link } from "react-router-dom";
import app from "../firebase-config";
import { AuthContext } from "../Auth";



const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <nav className={`navbar ${currentUser ? null : 'navbar-hidden'}`}>
      <div className="nav-center">
        <Link to="/" className="logo">
          <h1>Bookie.</h1>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/mybooks">My Books</Link>
          </li>
        </ul>
        <button className="btn" onClick={() => app.auth().signOut()}>
          sign out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
