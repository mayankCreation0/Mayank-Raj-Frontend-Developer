import React, { useContext, useState } from "react";
import { ReactComponent as CloseMenu } from "../Assets/logo.svg";
import { ReactComponent as MenuIcon } from "../Assets/menu.svg";
import { ReactComponent as Logo } from "../Assets/spacex.svg";
import "../Styles/Navbar.css";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-scroll";
import { Context } from "../Context/Context";
import Search from "./Search";
import Banner from "./Banner";

const Navbar = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { auth, setAuth } = useContext(Context)
  const handleClick = () => setClick(!click);
  function refreshPage() {
    setAuth(false)
  }
  const navigateto = () => {
    navigate('/login')
  }
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <div className="header">
        <div className="logo-nav">
          <div className="logo-container">
            <Link to="banner">
              <Logo className="logo" />
            </Link>
          </div>
          <ul className={click ? "nav-options active" : "nav-options"}>
            <li className="option" onClick={closeMobileMenu}>
              <Link to="search" style={{ color: "white", textDecoration: "none" }}>SEARCH CAPSULES</Link>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <Link to="about" style={{ color: "white", textDecoration: "none" }} >ABOUT</Link>
            </li>
            {/* <li className="option" onClick={closeMobileMenu}>
            <Link to="/createpage">BLOG</Link>
          </li>
          <li className="option mobile-option" onClick={closeMobileMenu}>
            <Link to="#">Account</Link>
          </li> */}
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <Link to="/login" className="sign-up">
                <button onClick={refreshPage}>Logout</button>
              </Link>
            </li>
          </ul>
        </div>
        <div class="search-container">
          {/* <form>
          <input type="text" placeholder="Search.." name="search" />
          <Link>
            <button
              type="submit"
              id="search-button"
              style={{ backgroundColor: "transparent" }}
            >
              &#128269;
            </button>
          </Link>
        </form> */}
        </div>
        <div className="mobile-menu" onClick={handleClick}>
          {click ? (
            <CloseMenu className="menu-icon" />
          ) : (
            <MenuIcon className="menu-icon" />
          )}
        </div>
        <ul className="signin-up">
          <li className="sign-in" onClick={closeMobileMenu}>
            <Link to="/">
              <img
                src="https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png"
                alt="img"
                style={{ width: "50px", borderRadius: "50%", backgroundColor: 'lightcoral' }}
              />
            </Link>
          </li>
          <li onClick={closeMobileMenu}>
            <Link to="login" >
              <button className="signup-btn" onClick={auth ? refreshPage : navigateto}>{auth ? "Logout" : "Login"}</button>
            </Link>
          </li>
        </ul>
      </div>
      <Banner />
      <Search />
      {/* <About/> */}
    </>
  );
};

export default Navbar;