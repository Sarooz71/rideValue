import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pencil, RotateCcw, History as HistoryIcon } from "lucide-react";
import PredictionForm from "../components/PredictionForm";
import PriceResult from "../components/PriceResult";
import Loading from "../components/Loading";
import { predictPrice } from "../services/predictor";
import { addPrediction } from "../services/storage";
import { bikes, emptyForm } from "../data/bikes";
import "./Predict.css";

// /predict?bike=3 pre-fills the form from a marketplace listing
function getInitialValues(bikeId) {
  const bike = bikes.find((b) => b.id === Number(bikeId));
  if (!bike) return emptyForm;
  return {
    ...emptyForm,
    brand: bike.brand,
    model: bike.model,
    year: String(bike.year),
    mileage: String(bike.mileage),
    engineCC: String(bike.cc),
    condition: bike.condition,
    ownership: bike.ownership,
    fuelType: bike.fuelType,
    transmission: bike.transmission,
    location: bike.location,
    askingPrice: String(bike.price),
  };
}

function Predict() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [formValues, setFormValues] = useState(() => getInitialValues(params.get("bike")));
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleSubmit = (values) => {
    setFormValues(values);
    setStatus("loading");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Fake delay so the loading state is visible (a real API call later)
    timer.current = setTimeout(() => {
      try {
        const prediction = predictPrice(values);
        addPrediction(prediction);
        setResult(prediction);
        setStatus("done");
      } catch {
        setStatus("error");
      }
    }, 1200);
  };

  const reset = () => {
    setFormValues(emptyForm);
    setResult(null);
    setStatus("idle");
  };

  return (
    <div className="container predict">
      <header className="page-header">
        <h1>Predict your bike's value</h1>
        <p>Fill in the details below to get an estimated resale price, expected range and confidence score.</p>
      </header>

      {status === "loading" && <Loading message="Analysing market factors..." />}

      {status === "error" && (
        <div className="empty-state">
          <h3>Something went wrong</h3>
          <p>We couldn't calculate the estimate. Please check your details and try again.</p>
          <button className="btn btn-primary" onClick={() => setStatus("idle")}>Try again</button>
        </div>
      )}

      {status === "idle" && (
        <div className="predict__form">
          <PredictionForm initialValues={formValues} onSubmit={handleSubmit} />
        </div>
      )}

      {status === "done" && result && (
        <>
          <div className="predict__actions">
            <button className="btn btn-outline" onClick={() => setStatus("idle")}>
              <Pencil size={16} /> Edit details
            </button>
            <button className="btn btn-outline" onClick={reset}>
              <RotateCcw size={16} /> Predict another bike
            </button>
            <Link to="/history" className="btn btn-ghost">
              <HistoryIcon size={16} /> View history
            </Link>
          </div>
          <PriceResult result={result} />
        </>
      )}
    </div>
  );
}

export default Predict;
