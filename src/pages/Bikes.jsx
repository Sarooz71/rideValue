import { useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import BikeCard from "../components/BikeCard";
import useSavedBikes from "../hooks/useSavedBikes";
import { bikes, brands, locations } from "../data/bikes";
import "./Bikes.css";

const priceOptions = [
  { label: "Any price", max: Infinity },
  { label: "Up to Rs. 2,50,000", max: 250000 },
  { label: "Up to Rs. 3,50,000", max: 350000 },
  { label: "Up to Rs. 4,50,000", max: 450000 },
  { label: "Up to Rs. 6,00,000", max: 600000 },
];
const ccOptions = [
  { label: "Any engine", min: 0, max: Infinity },
  { label: "Up to 160cc", min: 0, max: 160 },
  { label: "161 – 250cc", min: 161, max: 250 },
  { label: "Above 250cc", min: 251, max: Infinity },
];
const yearOptions = [0, 2023, 2022, 2021, 2020, 2019];
const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const defaultFilters = {
  search: "", brand: "", location: "", priceIdx: 0, ccIdx: 0, minYear: 0, sort: "newest",
};

function Bikes() {
  const [filters, setFilters] = useState(defaultFilters);
  const { toggleSaved, isSaved } = useSavedBikes();

  const update = (e) => {
    const { name, value } = e.target;
    const numeric = ["priceIdx", "ccIdx", "minYear"].includes(name);
    setFilters((f) => ({ ...f, [name]: numeric ? Number(value) : value }));
  };

  const results = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const price = priceOptions[filters.priceIdx];
    const cc = ccOptions[filters.ccIdx];

    const list = bikes.filter((b) => {
      if (q && !`${b.brand} ${b.model}`.toLowerCase().includes(q)) return false;
      if (filters.brand && b.brand !== filters.brand) return false;
      if (filters.location && b.location !== filters.location) return false;
      if (b.price > price.max) return false;
      if (b.cc < cc.min || b.cc > cc.max) return false;
      if (b.year < filters.minYear) return false;
      return true;
    });

    const sorters = {
      newest: (a, b) => b.year - a.year || a.mileage - b.mileage,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
    };
    return [...list].sort(sorters[filters.sort]);
  }, [filters]);

  const isFiltered = JSON.stringify(filters) !== JSON.stringify(defaultFilters);

  return (
    <div className="container bikes">
      <header className="page-header">
        <h1>Used bike marketplace</h1>
        <p>Browse used motorcycles and check the fair value of any listing.</p>
      </header>

      <div className="bikes__filters card">
        <div className="bikes__search">
          <Search size={18} />
          <input
            className="input"
            name="search"
            type="search"
            placeholder="Search by brand or model..."
            value={filters.search}
            onChange={update}
            aria-label="Search bikes"
          />
        </div>

        <div className="bikes__selects">
          <select className="input" name="brand" value={filters.brand} onChange={update} aria-label="Brand">
            <option value="">All brands</option>
            {brands.map((b) => <option key={b}>{b}</option>)}
          </select>
          <select className="input" name="location" value={filters.location} onChange={update} aria-label="Location">
            <option value="">All locations</option>
            {locations.filter((l) => l !== "Other").map((l) => <option key={l}>{l}</option>)}
          </select>
          <select className="input" name="priceIdx" value={filters.priceIdx} onChange={update} aria-label="Price">
            {priceOptions.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
          </select>
          <select className="input" name="minYear" value={filters.minYear} onChange={update} aria-label="Minimum year">
            {yearOptions.map((y) => <option key={y} value={y}>{y ? `${y} or newer` : "Any year"}</option>)}
          </select>
          <select className="input" name="ccIdx" value={filters.ccIdx} onChange={update} aria-label="Engine size">
            {ccOptions.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
          </select>
          <select className="input" name="sort" value={filters.sort} onChange={update} aria-label="Sort by">
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="bikes__count">
        <span>{results.length} {results.length === 1 ? "bike" : "bikes"} found</span>
        {isFiltered && (
          <button className="btn btn-ghost" onClick={() => setFilters(defaultFilters)}>
            <X size={16} /> Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="bikes__grid">
          {results.map((bike) => (
            <BikeCard key={bike.id} bike={bike} saved={isSaved(bike.id)} onToggleSave={toggleSaved} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <SearchX size={40} />
          <h3>No bikes match your filters</h3>
          <p>Try widening your search or clearing some filters.</p>
          <button className="btn btn-primary" onClick={() => setFilters(defaultFilters)}>Clear filters</button>
        </div>
      )}
    </div>
  );
}

export default Bikes;
