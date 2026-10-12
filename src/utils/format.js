// Nepali/Indian digit grouping: 385000 -> "3,85,000"
export function formatPrice(value) {
  return "Rs. " + Math.round(Number(value) || 0).toLocaleString("en-IN");
}

export function formatKm(value) {
  return Number(value).toLocaleString("en-IN") + " km";
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
