import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, ClipboardList } from "lucide-react";
import Modal from "../components/Modal";
import PriceResult from "../components/PriceResult";
import { getHistory, removePrediction, clearHistory } from "../services/storage";
import { formatPrice, formatKm, formatDate } from "../utils/format";
import "./History.css";

function History() {
  const [items, setItems] = useState(getHistory);
  const [selected, setSelected] = useState(null);

  const handleClear = () => {
    if (window.confirm("Delete all prediction history?")) setItems(clearHistory());
  };

  return (
    <div className="container history">
      <header className="page-header history__header">
        <div>
          <h1>Prediction history</h1>
          <p>Your previous valuations, saved on this device.</p>
        </div>
        {items.length > 0 && (
          <button className="btn btn-danger-ghost" onClick={handleClear}>
            <Trash2 size={16} /> Clear all
          </button>
        )}
      </header>

      {items.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={40} />
          <h3>No predictions yet</h3>
          <p>Your valuations will appear here after you predict a bike's price.</p>
          <Link to="/predict" className="btn btn-primary">Predict a bike</Link>
        </div>
      ) : (
        <ul className="history__list">
          {items.map((item) => (
            <li key={item.id} className="history__item card">
              <div className="history__info">
                <h3>{item.input.brand} {item.input.model}</h3>
                <p>{item.input.year} | {formatKm(item.input.mileage)} | {item.input.condition}</p>
                <span className="history__date">{formatDate(item.createdAt)}</span>
              </div>
              <div className="history__price">{formatPrice(item.estimate)}</div>
              <div className="history__actions">
                <button className="btn btn-outline" onClick={() => setSelected(item)}>
                  <Eye size={16} /> View
                </button>
                <button
                  className="btn btn-danger-ghost"
                  onClick={() => setItems(removePrediction(item.id))}
                  aria-label={`Delete ${item.input.brand} ${item.input.model} prediction`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <Modal title="Prediction details" onClose={() => setSelected(null)}>
          <PriceResult result={selected} />
        </Modal>
      )}
    </div>
  );
}

export default History;
