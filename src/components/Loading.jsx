function Loading({ message = "Loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{ display: "grid", placeItems: "center", gap: 16, padding: "80px 20px", color: "var(--muted)" }}
    >
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}

export default Loading;
