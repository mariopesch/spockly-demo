import React, { useState, useEffect, useRef } from "react";
import { WebR } from "@r-wasm/webr";

const webR = new WebR();
let isInitialized = false;

const WebRRunner = ({ code }) => {
  const [output, setOutput] = useState("Loading WebR...");
  const canvasRef = useRef(null);

  // Initialize WebR
  useEffect(() => {
    const initWebR = async () => {
      if (isInitialized) return;
      try {
        await webR.init();
        await webR.evalRVoid(`options(device=webr::canvas())`);
        isInitialized = true;
        setOutput("WebR ready.");
        startListeningToWebROutput();
      } catch (err) {
        console.error("WebR initialization failed:", err);
        setOutput(`Error: ${err.message}`);
      }
    };
    initWebR();
  }, []);

  const startListeningToWebROutput = async () => {
    for (;;) {
      const output = await webR.read();
      if (output.type === "canvas") {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (output.data.event === "canvasNewPage") {
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
        } else if (output.data.event === "canvasImage") {
          ctx?.drawImage(output.data.image, 0, 0);
        }
      }
    }
  };

  const runCode = async () => {
    if (!isInitialized) {
      setOutput("WebR not ready.");
      return;
    }

    try {
      setOutput("Running...");
      await webR.evalRVoid(code);
      setOutput("Code executed.");
    } catch (err) {
      console.error(err);
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
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
