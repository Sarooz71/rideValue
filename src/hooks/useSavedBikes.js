import { useState } from "react";
import { getSavedIds, setSavedIds } from "../services/storage";

export default function useSavedBikes() {
  const [savedIds, setIds] = useState(getSavedIds);

  const toggleSaved = (id) => {
    setIds((current) => {
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      setSavedIds(next);
      return next;
    });
  };

  return { savedIds, toggleSaved, isSaved: (id) => savedIds.includes(id) };
}
