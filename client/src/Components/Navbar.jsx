import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header id="navbar">
      <img
        className="navbarImage"
        src="https://cdn-icons-png.flaticon.com/512/871/871976.png"
      />
      <p>Events</p>
      <nav id="navlinks">
        <NavLink className="links" to="/">
          Home
        </NavLink>
        {user ? (
          <>
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
