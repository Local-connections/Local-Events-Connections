import { NavLink } from "react-router";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <strong>Town Events</strong>
          <p>Find what's happening near you.</p>
        </div>

        <div className="footer-contact">
          <NavLink to="/about" className="footer-about-link">
            About the Project & Team
          </NavLink>
          <a href="mailto:support@townevents.example">
            support@townevents.example
          </a>
        </div>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Local Events Hub. All rights reserved.
      </p>
    </footer>
  );
}