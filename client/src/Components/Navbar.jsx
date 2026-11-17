import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/inTownLogo.png";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Hide while scrolling down, reveal while scrolling up (and at the very top).
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y < 10 || y < lastY.current) {
        setHidden(false);
      } else if (y > lastY.current) {
        setHidden(true);
      }
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="navbar" className={hidden ? "navbar-hidden" : ""}>
      <div className="brand">
      <img
        className="navbarImage"
        src={logo}
        // src = "../assets/events.jpg"
      />
      <span className="brandName"><h1>Town</h1><h5>Events</h5></span>
      </div>
      
      <nav id="navlinks">
        <NavLink className="links" to="/">
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink className="links" to="/my-events">
              My Events
            </NavLink>
            <NavLink className="links" to="/orders">
              My Tickets
            </NavLink>
            <NavLink className="links" to="/account">
              Profile
            </NavLink>
            <a id="logout" href="#" onClick={() => logout()}>
              Log out
            </a>
          </>
        ) : (
          <>
            <NavLink className="links" to="/register">
              Register
            </NavLink>
            <NavLink className="links" to="/login">
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
