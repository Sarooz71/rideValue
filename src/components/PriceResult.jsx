import { Check, TriangleAlert, ShieldCheck } from "lucide-react";
import { formatPrice, formatKm, formatDate } from "../utils/format";
import "./PriceResult.css";

function PriceResult({ result }) {
  const { input, estimate, low, high, confidence, verdict, positives, negatives } = result;
  const bikeName = `${input.brand} ${input.model}`;
  const marker = high > low ? ((estimate - low) / (high - low)) * 100 : 50;

  return (
    <div className="result">
      <section className="result__main card">
        <div className="result__title">
          <div>
            <h2>{bikeName}</h2>
            <p>
              {input.year} · {formatKm(input.mileage)} · {input.engineCC}cc · {input.condition} · {input.location}
            </p>
          </div>
          <span className={`badge badge--${verdict.tone}`}>{verdict.label}</span>
        </div>

        <div className="result__estimate">
          <span className="result__label">Estimated Resale Value</span>
          <strong>{formatPrice(estimate)}</strong>
        </div>

        <div className="result__range">
          <span className="result__label">Expected Market Range</span>
          <div className="result__bar" aria-hidden="true">
            <div className="result__marker" style={{ left: `${marker}%` }} />
          </div>
          <div className="result__range-values">
            <span>{formatPrice(low)}</span>
            <span>{formatPrice(high)}</span>
          </div>
        </div>

        <div className="result__stats">
          <div>
            <span className="result__label">Prediction Confidence</span>
            <div className="result__confidence">
              <ShieldCheck size={18} />
              <strong>{confidence}%</strong>
            </div>
            <div className="result__meter" aria-hidden="true">
              <div style={{ width: `${confidence}%` }} />
            </div>
          </div>
          <div>
            <span className="result__label">
              {verdict.type === "deal" ? "Deal Verdict" : "Price Verdict"}
            </span>
            <p className="result__message">{verdict.message}</p>
            {verdict.type === "deal" && (
              <p className="result__asking">Asking price: {formatPrice(input.askingPrice)}</p>
            )}
          </div>
        </div>
      </section>

      <div className="result__factors">
        <section className="card">
          <h3>Positive factors</h3>
          {positives.length ? (
            <ul>
              {positives.map((p) => (
                <li key={p} className="factor factor--good"><Check size={16} /> {p}</li>
              ))}
            </ul>
          ) : (
            <p className="result__none">No strong positive factors found.</p>
          )}
        </section>
        <section className="card">
          <h3>Price-reducing factors</h3>
          {negatives.length ? (
            <ul>
              {negatives.map((n) => (
                <li key={n} className="factor factor--bad"><TriangleAlert size={16} /> {n}</li>
              ))}
            </ul>
          ) : (
            <p className="result__none">Nothing is reducing the value.</p>
          )}
        </section>
      </div>

      <p className="result__footnote">
        Calculated on {formatDate(result.createdAt)} using a temporary estimation formula.
        Real market data and a machine learning model will replace it later.
      </p>
    </div>
  );
}

export default PriceResult;
