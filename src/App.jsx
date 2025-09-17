import React, { useState } from "react";
import BlocklyComponent from "./components/BlocklyComponent";
import CodeDisplay from "./components/CodeDisplay";
import WebRRunner from "./components/WebRRunner";

function App() {
  const [code, setCode] = useState("");

  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: "center", margin: "0.5rem 0" }}>
        Spockly Demo: Blockly in React
      </h1>
      <div style={{ display: "flex", height: "90vh" }}>
        {/* Blockly Editor */}
        <div style={{ flex: 1 }}>
          <BlocklyComponent setCode={setCode} />
        </div>

        {/* Code Output */}
        <div
          style={{
            flex: 1,
            padding: "1rem",
            overflow: "auto",
            background: "#f8f8f8",
          }}
        >
          <h2>Generated Python Code</h2>
          <CodeDisplay code={code} />
          <WebRRunner code={code} />
        </div>
      </div>
    </div>
  );
}

export default App;
