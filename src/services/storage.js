// Thin wrapper around localStorage. Later these functions will call the
// backend API instead, so the pages won't need to change much.

const KEYS = {
  history: "ridevalue:history",
  saved: "ridevalue:savedBikes",
  users: "ridevalue:users",
  session: "ridevalue:session",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: ignore */
  }
}

/* Prediction history */
export const getHistory = () => read(KEYS.history, []);

export function addPrediction(prediction) {
  const next = [prediction, ...getHistory()].slice(0, 50);
  write(KEYS.history, next);
  return next;
}

export function removePrediction(id) {
  const next = getHistory().filter((p) => p.id !== id);
  write(KEYS.history, next);
  return next;
}

export function clearHistory() {
  write(KEYS.history, []);
  return [];
}

/* Saved bikes (array of bike ids) */
export const getSavedIds = () => read(KEYS.saved, []);
export const setSavedIds = (ids) => write(KEYS.saved, ids);

/* Mock auth (frontend only) */
export const getUsers = () => read(KEYS.users, []);
export const setUsers = (users) => write(KEYS.users, users);
export const getSession = () => read(KEYS.session, null);
export const setSession = (user) => write(KEYS.session, user);
export const clearSession = () => {
  try {
    localStorage.removeItem(KEYS.session);
  } catch {
    /* ignore */
  }
};
