import { Link } from "react-router-dom";
import "./Info.css";

function NotFound() {
  return (
    <div className="container notfound">
      <strong>404</strong>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  );
}

export default NotFound;
