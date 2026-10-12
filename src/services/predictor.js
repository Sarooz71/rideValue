// TEMPORARY prediction logic for frontend development.
// Later this file will call POST /api/predict instead of calculating locally.

import { findModel } from "../data/bikes";

export const CURRENT_YEAR = new Date().getFullYear();

const conditionFactor = { Excellent: 1.05, Good: 1.0, Fair: 0.9, Poor: 0.75 };
const ownershipFactor = { "1st Owner": 1.0, "2nd Owner": 0.93, "3rd Owner or more": 0.85 };
const locationFactor = {
  Kathmandu: 1.0, Lalitpur: 1.0, Bhaktapur: 0.99, Pokhara: 0.97,
  Chitwan: 0.96, Biratnagar: 0.95, Butwal: 0.95, Other: 0.93,
};

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const roundTo = (n, step) => Math.round(n / step) * step;
const km = (n) => Math.round(n).toLocaleString("en-IN") + " km";

export function predictPrice(input) {
  const year = Number(input.year);
  const mileage = Number(input.mileage);
  const cc = Number(input.engineCC);
  const model = findModel(input.brand, input.model);
  const age = Math.max(0, CURRENT_YEAR - year);

  // 1. Start from the (approximate) new price and apply age depreciation
  const newPrice = model ? model.newPrice : cc * 2400;
  const retention = Math.max(0.25, 0.9 * Math.pow(0.915, age));
  let price = newPrice * retention;

  // 2. Mileage compared with ~6,000 km per year
  const expectedKm = Math.max(age, 1) * 6000;
  const diffK = (mileage - expectedKm) / 1000;
  const mileageAdj = clamp(diffK > 0 ? -diffK * 0.006 : -diffK * 0.004, -0.18, 0.08);

  // 3. Other multipliers
  const condition = conditionFactor[input.condition] ?? 1;
  const ownership = ownershipFactor[input.ownership] ?? 1;
  const service = input.hasServiceHistory ? 1.03 : 1;
  const damage = input.hasDamage ? 0.92 : 1;
  const location = locationFactor[input.location] ?? 0.95;
  const fuel = input.fuelType === "Electric" ? 0.9 : 1;
  const transmission = input.transmission === "Automatic" ? 1.03 : 1;

  const qualityScore = (1 + mileageAdj) * condition * ownership * service * damage;
  price *= qualityScore * location * fuel * transmission;

  const estimate = roundTo(price, 1000);

  // Confidence: starts high, drops for uncertain situations
  let confidence = 90;
  if (!model) confidence -= 10;
  if (age > 8) confidence -= 8;
  if (input.condition === "Poor") confidence -= 5;
  if (Math.abs(mileageAdj) >= 0.15) confidence -= 5;
  if (input.location === "Other") confidence -= 3;
  if (input.hasDamage) confidence -= 3;
  confidence = clamp(confidence, 55, 95);

  const spread = 0.05 + (95 - confidence) * 0.0035;
  const low = roundTo(estimate * (1 - spread), 5000);
  const high = roundTo(estimate * (1 + spread), 5000);

  // Factors shown to the user
  const positives = [];
  const negatives = [];

  if (mileageAdj > 0.01) positives.push(`Low mileage (${km(expectedKm - mileage)} below average for its age)`);
  if (mileageAdj < -0.01) negatives.push(`High mileage (${km(mileage - expectedKm)} above average for its age)`);
  if (age <= 3) positives.push("Recent model year");
  if (age >= 8) negatives.push("Older model year");
  if (input.condition === "Excellent") positives.push("Excellent condition");
  if (input.condition === "Fair" || input.condition === "Poor") negatives.push(`${input.condition} condition`);
  if (model?.popular) positives.push("Popular model with strong resale demand");
  if (input.ownership === "1st Owner") positives.push("First owner");
  else negatives.push(input.ownership);
  if (input.hasServiceHistory) positives.push("Complete service history");
  else negatives.push("No documented service history");
  if (input.hasDamage) negatives.push("Previous accident damage");
  if (["Kathmandu", "Lalitpur"].includes(input.location)) positives.push("High-demand location");

  // Verdict
  let verdict;
  const asking = Number(input.askingPrice);
  if (asking > 0) {
    const ratio = asking / estimate;
    const diff = Math.abs(asking - estimate);
    if (ratio <= 0.95) {
      verdict = { type: "deal", tone: "good", label: "GOOD DEAL", message: `You may save approximately ${formatRs(diff)} compared with the estimated market value.` };
    } else if (ratio <= 1.08) {
      verdict = { type: "deal", tone: "fair", label: "FAIR PRICE", message: "The asking price is close to the estimated market value." };
    } else {
      verdict = { type: "deal", tone: "bad", label: "OVERPRICED", message: `The seller is asking approximately ${formatRs(diff)} above the estimated market value.` };
    }
  } else if (qualityScore >= 1.05) {
    verdict = { type: "value", tone: "good", label: "GOOD VALUE", message: "This bike should hold its value well in the used market." };
  } else if (qualityScore >= 0.92) {
    verdict = { type: "value", tone: "fair", label: "FAIR VALUE", message: "This bike is priced around the market average for its profile." };
  } else {
    verdict = { type: "value", tone: "bad", label: "BELOW AVERAGE", message: "Factors like mileage, condition or history are lowering the resale value." };
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    input: { ...input },
    estimate,
    low,
    high,
    confidence,
    verdict,
    positives,
    negatives,
  };
}

function formatRs(n) {
  return "Rs. " + roundTo(n, 1000).toLocaleString("en-IN");
}
