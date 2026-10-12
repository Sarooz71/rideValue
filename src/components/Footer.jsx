import { Link } from "react-router-dom";
import { Bike } from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon">
              <Bike size={18} />
            </span>
            RideValue
          </Link>
          <p>Know what your ride is really worth.</p>
        </div>

        <div>
          <h4>Product</h4>
          <ul>
            <li><Link to="/predict">Price Prediction</Link></li>
            <li><Link to="/bikes">Marketplace</Link></li>
            <li><Link to="/history">History</Link></li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} RideValue. Estimates are indicative, not official valuations.</span>
      </div>
    </footer>
  );
}

export default Footer;
