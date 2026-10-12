
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bike, Menu, X } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/predict", label: "Predict" },
  { to: "/bikes", label: "Bikes" },
  { to: "/history", label: "History" },
  { to: "/about", label: "About" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-icon">
            <Bike size={20} />
          </span>

          <span>
            Ride<span className="navbar__logo-accent">Value</span>
          </span>
        </Link>

        <nav
          id="main-menu"
          className={`navbar__menu ${
            isOpen ? "navbar__menu--open" : ""
          }`}
          aria-label="Main navigation"
        >
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "navbar__link navbar__link--active"
                      : "navbar__link"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <Link
              to="/predict"
              className="btn btn-primary"
              onClick={closeMenu}
            >
              Predict My Bike
            </Link>
          </div>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="main-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
