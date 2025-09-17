// components/WebRRunner.js
import React, { useState, useEffect } from "react";
import { WebR } from "@r-wasm/webr"; // Correct import

const webR = new WebR();

const WebRRunner = ({ code }) => {
  const [output, setOutput] = useState("Loading WebR...");

  // Initialize WebR only once when the component mounts
  useEffect(() => {
    const initWebR = async () => {
      try {
        // Initialize WebR environment
        await webR.init();
        console.log("WebR initialized");
      } catch (err) {
        console.error("WebR initialization failed:", err);
        setOutput(`Error initializing WebR: ${err.message}`);
      }
    };
    initWebR();
  }, []); // Empty dependency array means this runs once on mount

  // Function to run R code
  const runCode = async () => {
    try {
      // Evaluate R code
      const result = await webR.evalR(code);

      // Get the result as an array or another format
      const values = await result.toArray();

      // Update the output state with the result
      setOutput(values.join("\n"));
    } catch (err) {
      // Handle errors gracefully
      setOutput(`Error: ${err.message}`);
      console.error("WebR Error:", err);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        onClick={runCode}
        style={{
          marginBottom: "1rem",
          padding: "10px",
          cursor: "pointer",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Run R Code
      </button>
      <div
        style={{
          whiteSpace: "pre-wrap",
          background: "#e8f5e9",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        <strong>Output:</strong>
        <div>{output}</div>
      </div>
    </div>
  );
};

export default WebRRunner;
