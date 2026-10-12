import { Link } from "react-router-dom";
import { Heart, Gauge, Calendar, MapPin } from "lucide-react";
import BikeImage from "./BikeImage";
import { formatPrice, formatKm } from "../utils/format";
import "./BikeCard.css";

function BikeCard({ bike, saved = false, onToggleSave }) {
  return (
    <article className="bike-card">
      <div className="bike-card__media">
        <BikeImage brand={bike.brand} />
        {onToggleSave && (
          <button
            className={`bike-card__save ${saved ? "bike-card__save--active" : ""}`}
            onClick={() => onToggleSave(bike.id)}
            aria-label={saved ? `Remove ${bike.brand} ${bike.model} from saved` : `Save ${bike.brand} ${bike.model}`}
            aria-pressed={saved}
          >
            <Heart size={18} fill={saved ? "currentColor" : "none"} />
          </button>
        )}
        <span className="bike-card__condition">{bike.condition}</span>
      </div>

      <div className="bike-card__body">
        <h3>{bike.brand} {bike.model}</h3>
        <ul className="bike-card__meta">
          <li><Calendar size={14} /> {bike.year}</li>
          <li><Gauge size={14} /> {formatKm(bike.mileage)}</li>
          <li>{bike.cc}cc</li>
          <li><MapPin size={14} /> {bike.location}</li>
        </ul>
        <p className="bike-card__price">{formatPrice(bike.price)}</p>
        <Link to={`/bikes/${bike.id}`} className="btn btn-outline btn-block">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default BikeCard;
