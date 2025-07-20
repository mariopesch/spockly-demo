import React from "react";

const Impressum = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Impressum</h1>
      <p style={styles.placeholder}>
        This legal notice will be added soon.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "system-ui, sans-serif"
  },
  title: {
    fontSize: "2rem",
    color: "var(--color-primary)",
    marginBottom: "1rem"
  },
  placeholder: {
    fontSize: "1rem",
    color: "var(--color-text-muted)"
  }
};

export default Impressum;
