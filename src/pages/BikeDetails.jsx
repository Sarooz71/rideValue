import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Phone, Zap, MapPin } from "lucide-react";
import BikeImage from "../components/BikeImage";
import BikeCard from "../components/BikeCard";
import Modal from "../components/Modal";
import useSavedBikes from "../hooks/useSavedBikes";
import { bikes } from "../data/bikes";
import { predictPrice } from "../services/predictor";
import { formatPrice, formatKm } from "../utils/format";
import "./BikeDetails.css";

const views = ["Front", "Side", "Rear"];

function BikeDetails() {
  const { id } = useParams();
  const bike = bikes.find((b) => b.id === Number(id));
  const [view, setView] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const { toggleSaved, isSaved } = useSavedBikes();

  if (!bike) {
    return (
      <div className="container" style={{ padding: "60px 20px" }}>
        <div className="empty-state">
          <h3>Bike not found</h3>
          <p>This listing may have been removed.</p>
          <Link to="/bikes" className="btn btn-primary">Back to marketplace</Link>
        </div>
      </div>
    );
  }

  // Reuse the predictor to compare asking price with market value
  const estimate = predictPrice({
    brand: bike.brand, model: bike.model, year: bike.year, mileage: bike.mileage,
    engineCC: bike.cc, condition: bike.condition, ownership: bike.ownership,
    fuelType: bike.fuelType, transmission: bike.transmission, location: bike.location,
    askingPrice: bike.price, hasServiceHistory: false, hasDamage: false,
  });

  const specs = [
    ["Year", bike.year],
    ["Mileage", formatKm(bike.mileage)],
    ["Engine", `${bike.cc}cc`],
    ["Fuel", bike.fuelType],
    ["Transmission", bike.transmission],
    ["Ownership", bike.ownership],
    ["Condition", bike.condition],
    ["Location", bike.location],
  ];

  const similar = bikes
    .filter((b) => b.id !== bike.id && (b.brand === bike.brand || Math.abs(b.price - bike.price) < 60000))
    .slice(0, 3);

  const saved = isSaved(bike.id);

  return (
    <div className="container details">
      <Link to="/bikes" className="details__back">
        <ArrowLeft size={16} /> Back to bikes
      </Link>

      <div className="details__grid">
        <div>
          <div className="details__gallery">
            <BikeImage brand={bike.brand} label={`${views[view]} view`} height={380} iconSize={110} />
          </div>
          <div className="details__thumbs">
            {views.map((v, i) => (
              <button
                key={v}
                className={`details__thumb ${i === view ? "details__thumb--active" : ""}`}
                onClick={() => setView(i)}
                aria-label={`Show ${v.toLowerCase()} view`}
                aria-pressed={i === view}
              >
                <BikeImage brand={bike.brand} height={64} iconSize={26} />
              </button>
            ))}
          </div>
        </div>

        <div className="details__info">
          <span className="badge badge--neutral">{bike.year} Model</span>
          <h1>{bike.brand} {bike.model}</h1>
          <p className="details__location"><MapPin size={16} /> {bike.location}</p>
          <p className="details__price">{formatPrice(bike.price)}</p>

          <div className="details__actions">
            <Link to={`/predict?bike=${bike.id}`} className="btn btn-primary">
              <Zap size={16} /> Predict Value
            </Link>
            <button className="btn btn-outline" onClick={() => setShowContact(true)}>
              <Phone size={16} /> Contact Seller
            </button>
            <button
              className={`btn btn-outline ${saved ? "details__saved" : ""}`}
              onClick={() => toggleSaved(bike.id)}
              aria-pressed={saved}
            >
              <Heart size={16} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save Bike"}
            </button>
          </div>

          <div className="card details__verdict">
            <div>
              <span className="details__verdict-label">RideValue estimate</span>
              <strong>{formatPrice(estimate.estimate)}</strong>
              <span className="details__range">
                Range {formatPrice(estimate.low)} – {formatPrice(estimate.high)}
              </span>
            </div>
            <span className={`badge badge--${estimate.verdict.tone}`}>{estimate.verdict.label}</span>
          </div>
        </div>
      </div>

      <div className="details__lower">
        <section className="card">
          <h2>Specifications</h2>
          <dl className="details__specs">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="card">
          <h2>Seller's description</h2>
          <p className="details__desc">{bike.description}</p>
          <p className="details__seller">Listed by <strong>{bike.seller.name}</strong></p>
        </section>
      </div>

      {similar.length > 0 && (
        <section className="details__similar">
          <h2>Similar bikes</h2>
          <div className="details__similar-grid">
            {similar.map((b) => (
              <BikeCard key={b.id} bike={b} saved={isSaved(b.id)} onToggleSave={toggleSaved} />
            ))}
          </div>
        </section>
      )}

      {showContact && (
        <Modal title="Contact seller" onClose={() => setShowContact(false)}>
          <p><strong>{bike.seller.name}</strong></p>
          <p style={{ margin: "6px 0 14px", color: "var(--muted)" }}>
            Phone: {bike.seller.phone} (sample number)
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            Tip: ask for the bluebook, service records and a test ride before making an offer.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default BikeDetails;
