import { Link } from "react-router-dom";
import {
  ArrowRight, ClipboardList, Cpu, BadgeCheck, TrendingDown,
  ShieldCheck, Zap, Store, Check,
} from "lucide-react";
import BikeCard from "../components/BikeCard";
import { bikes } from "../data/bikes";
import { formatPrice } from "../utils/format";
import "./Home.css";

const steps = [
  { icon: ClipboardList, title: "Enter your bike details", text: "Brand, model, year, mileage, condition and ownership. It takes under a minute." },
  { icon: Cpu, title: "We analyse the market factors", text: "Age, usage, condition, demand and location are weighed against each other." },
  { icon: BadgeCheck, title: "Get your estimated value", text: "See a price, a likely range, a confidence score and what is driving the number." },
];

const reasons = [
  { icon: Zap, title: "Instant estimates", text: "No sign-up and no waiting. Get a value as soon as you submit the form." },
  { icon: ShieldCheck, title: "Transparent results", text: "Every estimate lists the factors that raised or lowered the price." },
  { icon: TrendingDown, title: "Deal analyzer", text: "Add the seller's asking price to see if it is a good deal or overpriced." },
  { icon: Store, title: "Built-in marketplace", text: "Browse used bikes and check any listing's fair value in one click." },
];

// Real numbers calculated from the sample listings
function getStats() {
  const avgPrice = bikes.reduce((sum, b) => sum + b.price, 0) / bikes.length;
  const brandCount = new Set(bikes.map((b) => b.brand)).size;
  const cities = new Set(bikes.map((b) => b.location)).size;
  return [
    { value: bikes.length, label: "Sample listings" },
    { value: formatPrice(avgPrice), label: "Average asking price" },
    { value: brandCount, label: "Brands covered" },
    { value: cities, label: "Cities covered" },
  ];
}

function Home() {
  const popular = bikes.filter((b) => [1, 2, 3, 5].includes(b.id));
  const stats = getStats();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__text">
            <span className="eyebrow">Used bike valuation</span>
            <h1>
              Know what your bike is <span>really worth.</span>
            </h1>
            <p>
              Get an estimated resale value based on your bike's age, mileage,
              condition and other important market factors.
            </p>
            <div className="hero__actions">
              <Link to="/predict" className="btn btn-primary btn-lg">
                Predict My Bike <ArrowRight size={18} />
              </Link>
              <Link to="/bikes" className="btn btn-outline btn-lg">
                Explore Bikes
              </Link>
            </div>
          </div>

          <aside className="hero__preview card" aria-label="Example prediction">
            <div className="hero__preview-top">
              <div>
                <strong>Yamaha MT-15</strong>
                <span>2022 · 18,500 km · 155cc</span>
              </div>
              <span className="badge badge--good">GOOD VALUE</span>
            </div>
            <span className="hero__preview-label">Estimated Resale Value</span>
            <p className="hero__preview-price">Rs. 3,85,000</p>
            <div className="hero__preview-range">
              <span>Rs. 3,65,000</span>
              <span>Rs. 4,05,000</span>
            </div>
            <ul>
              <li><Check size={16} /> Low mileage</li>
              <li><Check size={16} /> Excellent condition</li>
              <li><Check size={16} /> First owner</li>
            </ul>
            <span className="hero__preview-note">Example result · Confidence 87%</span>
          </aside>
        </div>
      </section>

      {/* How it works */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="eyebrow">How it works</span>
            <h2>From details to a fair price in three steps</h2>
          </div>
          <div className="steps">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div className="step" key={title}>
                <span className="step__number">{i + 1}</span>
                <div className="step__icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular bikes */}
      <section className="section">
        <div className="container">
          <div className="home-head">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Marketplace</span>
              <h2>Popular bikes right now</h2>
            </div>
            <Link to="/bikes" className="btn btn-ghost">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bike-grid">
            {popular.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        </div>
      </section>

      {/* Why RideValue */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="eyebrow">Why RideValue</span>
            <h2>Make better buying and selling decisions</h2>
          </div>
          <div className="reasons">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div className="reason" key={title}>
                <div className="step__icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="cta">
          <h2>Ready to find out what your ride is worth?</h2>
          <p>It's free, instant and needs no account.</p>
          <Link to="/predict" className="btn btn-lg cta__btn">
            Get my estimate <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
