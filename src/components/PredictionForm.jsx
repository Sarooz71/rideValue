import { useState } from "react";
import { Zap } from "lucide-react";
import {
  brands, catalog, findModel, locations, conditions,
  ownerships, fuelTypes, transmissions, emptyForm,
} from "../data/bikes";
import { CURRENT_YEAR } from "../services/predictor";
import "./PredictionForm.css";

function validate(v) {
  const errors = {};
  if (!v.brand) errors.brand = "Please select a brand.";
  if (!v.model) errors.model = "Please select a model.";

  const year = Number(v.year);
  if (!v.year) errors.year = "Enter the manufacturing year.";
  else if (!Number.isInteger(year) || year < 1995 || year > CURRENT_YEAR)
    errors.year = `Year must be between 1995 and ${CURRENT_YEAR}.`;

  const mileage = Number(v.mileage);
  if (v.mileage === "") errors.mileage = "Enter the distance travelled.";
  else if (!Number.isFinite(mileage) || mileage < 0 || mileage > 300000)
    errors.mileage = "Mileage must be between 0 and 3,00,000 km.";

  const cc = Number(v.engineCC);
  if (!v.engineCC) errors.engineCC = "Enter the engine size.";
  else if (!Number.isFinite(cc) || cc < 50 || cc > 1500)
    errors.engineCC = "Engine size must be between 50 and 1500 cc.";

  if (v.askingPrice !== "" && !(Number(v.askingPrice) > 0))
    errors.askingPrice = "Enter a valid price or leave this empty.";

  return errors;
}

function Field({ id, label, error, hint, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <span className="hint">{hint}</span>}
      {error && <span className="error-text" id={`${id}-error`}>{error}</span>}
    </div>
  );
}

function Select({ id, value, onChange, options, error, placeholder, disabled }) {
  return (
    <select
      id={id}
      name={id}
      className={`input ${error ? "input--error" : ""}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function PredictionForm({ initialValues, onSubmit, loading = false }) {
  const [values, setValues] = useState({ ...emptyForm, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "brand") {
        next.model = "";
        next.engineCC = "";
      }
      if (name === "model") {
        const found = findModel(prev.brand, value);
        if (found) next.engineCC = String(found.cc);
      }
      return next;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  };

  const modelOptions = values.brand ? catalog[values.brand].map((m) => m.model) : [];
  const bind = (id) => ({ id, value: values[id], onChange: handleChange, error: errors[id] });

  return (
    <form className="pform card" onSubmit={handleSubmit} noValidate>
      <fieldset className="pform__section" disabled={loading}>
        <legend>Bike details</legend>
        <div className="pform__grid">
          <Field id="brand" label="Brand" error={errors.brand}>
            <Select {...bind("brand")} options={brands} placeholder="Select brand" />
          </Field>

          <Field id="model" label="Model" error={errors.model}>
            <Select
              {...bind("model")}
              options={modelOptions}
              placeholder={values.brand ? "Select model" : "Select a brand first"}
              disabled={!values.brand}
            />
          </Field>

          <Field id="year" label="Manufacturing year" error={errors.year}>
            <input
              {...bind("year")}
              name="year"
              type="number"
              inputMode="numeric"
              className={`input ${errors.year ? "input--error" : ""}`}
              placeholder="e.g. 2022"
              aria-invalid={Boolean(errors.year)}
            />
          </Field>

          <Field id="mileage" label="Mileage (km)" error={errors.mileage}>
            <input
              {...bind("mileage")}
              name="mileage"
              type="number"
              inputMode="numeric"
              className={`input ${errors.mileage ? "input--error" : ""}`}
              placeholder="e.g. 18500"
              aria-invalid={Boolean(errors.mileage)}
            />
          </Field>

          <Field id="engineCC" label="Engine CC" error={errors.engineCC} hint="Filled in automatically from the model">
            <input
              {...bind("engineCC")}
              name="engineCC"
              type="number"
              inputMode="numeric"
              className={`input ${errors.engineCC ? "input--error" : ""}`}
              placeholder="e.g. 155"
              aria-invalid={Boolean(errors.engineCC)}
            />
          </Field>

          <Field id="location" label="Location">
            <Select {...bind("location")} options={locations} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="pform__section" disabled={loading}>
        <legend>Condition &amp; history</legend>
        <div className="pform__grid">
          <Field id="condition" label="Condition">
            <Select {...bind("condition")} options={conditions} />
          </Field>
          <Field id="ownership" label="Ownership">
            <Select {...bind("ownership")} options={ownerships} />
          </Field>
          <Field id="fuelType" label="Fuel type">
            <Select {...bind("fuelType")} options={fuelTypes} />
          </Field>
          <Field id="transmission" label="Transmission">
            <Select {...bind("transmission")} options={transmissions} />
          </Field>
        </div>

        <div className="pform__checks">
          <label className="pform__check">
            <input type="checkbox" name="hasServiceHistory" checked={values.hasServiceHistory} onChange={handleChange} />
            Complete service history available
          </label>
          <label className="pform__check">
            <input type="checkbox" name="hasDamage" checked={values.hasDamage} onChange={handleChange} />
            Has had accident / major damage
          </label>
        </div>
      </fieldset>

      <fieldset className="pform__section" disabled={loading}>
        <legend>Deal check (optional)</legend>
        <Field
          id="askingPrice"
          label="Seller's asking price (Rs.)"
          error={errors.askingPrice}
          hint="Add this to find out if the bike is a good deal or overpriced."
        >
          <input
            {...bind("askingPrice")}
            name="askingPrice"
            type="number"
            inputMode="numeric"
            className={`input ${errors.askingPrice ? "input--error" : ""}`}
            placeholder="e.g. 350000"
          />
        </Field>
      </fieldset>

      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
        <Zap size={18} />
        {loading ? "Analysing..." : "Predict Price"}
      </button>
    </form>
  );
}

export default PredictionForm;
