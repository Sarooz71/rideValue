import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import BikeCard from "../components/BikeCard";
import useAuth from "../hooks/useAuth";
import useSavedBikes from "../hooks/useSavedBikes";
import { bikes } from "../data/bikes";
import { getHistory } from "../services/storage";
import { formatPrice, formatDate } from "../utils/format";
import "./Info.css";

function Profile() {
  const { user, logout } = useAuth();
  const { savedIds, toggleSaved, isSaved } = useSavedBikes();
  const history = getHistory();

  const avg = history.length
    ? history.reduce((sum, p) => sum + p.estimate, 0) / history.length
    : 0;
  const savedBikes = bikes.filter((b) => savedIds.includes(b.id));

  const stats = [
    { label: "Total predictions", value: history.length },
    { label: "Saved bikes", value: savedBikes.length },
    { label: "Listed bikes", value: 0 },
    { label: "Average predicted value", value: history.length ? formatPrice(avg) : "—" },
  ];

  return (
    <div className="container info">
      <div className="page-header profile__top">
        <div className="profile__who">
          <div className="profile__avatar" aria-hidden="true">{user.name[0].toUpperCase()}</div>
          <div>
            <h1>{user.name}</h1>
            <p>{user.email} · {user.role} · Joined {formatDate(user.joinedAt)}</p>
          </div>
        </div>
        <button className="btn btn-outline" onClick={logout}>
          <LogOut size={16} /> Log out
        </button>
      </div>

      <div className="profile__stats">
        {stats.map((s) => (
          <div key={s.label} className="card profile__stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <section className="info__section">
        <h2>Saved bikes</h2>
        {savedBikes.length ? (
          <div className="profile__saved">
            {savedBikes.map((b) => (
              <BikeCard key={b.id} bike={b} saved={isSaved(b.id)} onToggleSave={toggleSaved} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No saved bikes</h3>
            <p>Tap the heart on any bike to save it here.</p>
            <Link to="/bikes" className="btn btn-primary">Browse bikes</Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
