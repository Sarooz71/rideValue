import { Bike } from "lucide-react";

// Placeholder visual until real bike photos exist.
// Colour is derived from the brand name so each brand looks different.
function hueFor(text) {
  let hash = 0;
  for (const ch of text) hash = (hash * 31 + ch.charCodeAt(0)) % 360;
  return hash;
}

function BikeImage({ brand, label, height = 170, iconSize = 56 }) {
  const hue = hueFor(brand);
  return (
    <div
      role="img"
      aria-label={`${brand} bike`}
      style={{
        height,
        display: "grid",
        placeItems: "center",
        position: "relative",
        color: `hsl(${hue} 55% 30%)`,
        background: `linear-gradient(135deg, hsl(${hue} 80% 94%), hsl(${(hue + 40) % 360} 70% 86%))`,
      }}
    >
      <Bike size={iconSize} strokeWidth={1.5} />
      {label && (
        <span style={{ position: "absolute", bottom: 10, left: 12, fontSize: "0.75rem", fontWeight: 600 }}>
          {label}
        </span>
      )}
    </div>
  );
}

export default BikeImage;
