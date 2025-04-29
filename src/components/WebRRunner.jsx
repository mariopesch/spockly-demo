import React, { useState, useEffect, useRef } from "react";
import { WebR } from "@r-wasm/webr";

// Initialize the WebR instance
const webR = new WebR();

const WebRRunner = ({ code }) => {
  // State to manage the output messages
  const [output, setOutput] = useState("Loading WebR...");

  // State to manage the initialization status of WebR
  const [initialized, setInitialized] = useState(false);

  // Reference to the canvas element for rendering plots
  const canvasRef = useRef(null);

  // Effect to initialize WebR when the component mounts
  useEffect(() => {
    const initWebR = async () => {
      if (initialized) return;
      try {
        // Initialize the WebR environment
        await webR.init();

        // Set the default graphics device to webr::canvas()
        await webR.evalRVoid(`options(device=webr::canvas())`);

        // Update the initialization status
        setInitialized(true);
        setOutput("WebR ready.");

        // Start listening to WebR output
        startListeningToWebROutput();
      } catch (err) {
        console.error("WebR initialization failed:", err);
        setOutput(`Error: ${err.message}`);
      }
    };
    initWebR();
  }, [initialized]);

  // Function to handle WebR output and render plots
  const startListeningToWebROutput = async () => {
    for (;;) {
      const output = await webR.read();
      if (output.type === "canvas") {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (output.data.event === "canvasNewPage") {
          // Clear the canvas for a new plot
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
        } else if (output.data.event === "canvasImage") {
          // Draw the plot image onto the canvas
          ctx?.drawImage(output.data.image, 0, 0);
        }
      }
    }
  };

  // Function to run the provided R code
  const runCode = async () => {
    if (!initialized) {
      setOutput("WebR not ready.");
      return;
    }

    try {
      // Update the output state to indicate that code is running
      setOutput("Running...");

      // Evaluate the R code
      await webR.evalRVoid(code);

      // Update the output state to indicate that code execution is complete
      setOutput("Code executed.");
    } catch (err) {
      console.error(err);
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {/* Button to trigger the execution of R code */}
      <button
        onClick={runCode}
        style={{
          padding: "10px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Run R Code
      </button>

      {/* Section to display textual output */}
      <div
        style={{
          marginTop: "1rem",
          background: "#f0f0f0",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        <strong>Output:</strong>
        <div style={{ whiteSpace: "pre-wrap" }}>{output}</div>
      </div>

      {/* Section to display graphical output (plots) */}
      <div style={{ marginTop: "1rem" }}>
        <strong>Plot:</strong>
        <canvas
          ref={canvasRef}
          width={1008}
          height={1008}
          style={{ width: "504px", height: "504px", border: "1px solid #ccc" }}
        />
      </div>
    </div>
  );
};

export default WebRRunner;
