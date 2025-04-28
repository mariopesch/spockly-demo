import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import GenerateButton from "./GenerateButton";
import "./blockly/customGenerator"; // Import custom generator first
import "./blockly/customBlocks"; // Import custom blocks
import "./blockly/rBlocks"; // Import R blocks
import WebRRunner from "./WebRRunner";

const BlocklyComponent = ({ setCode }) => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (!blocklyDiv.current) {
      console.error("blocklyDiv is not available.");
      return;
    }

    // Initialize Blockly workspace
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "Examples",
            colour: "#5C81A6",
            contents: [
              { kind: "block", type: "controls_if" },
              { kind: "block", type: "logic_compare" },
              { kind: "block", type: "math_number" },
              { kind: "block", type: "math_arithmetic" },
              { kind: "block", type: "text" },
              { kind: "block", type: "text_print" },
            ],
          },
          {
            kind: "category",
            name: "Custom Blocks",
            colour: "#5C81A6",
            contents: [
              { kind: "block", type: "print_hello" },
              { kind: "block", type: "math_square" },
              { kind: "block", type: "text_greeting" },
              { kind: "block", type: "repeat_times" },
              { kind: "block", type: "dropdown_color" },
            ],
          },
          {
            kind: "category",
            name: "R-Example",
            colour: "#5CA65C",
            contents: [
              { kind: "block", type: "create_vector" },
              { kind: "block", type: "plot_vector" },
              { kind: "block", type: "rnorm_block" },
              { kind: "block", type: "histogram_block" }, // New histogram block
            ],
          },
          {
            kind: "category",
            name: "Variables",
            colour: "#A65E2E",
            custom: "VARIABLE",
          },
        ],
      },
    });

    return () => {
      workspaceRef.current?.dispose();
    };
  }, []);

  const generateCodeR = () => {
    if (!workspaceRef.current) {
      console.error("Blockly workspace is not initialized.");
      return;
    }

    const rCode = Blockly.Generator.R.workspaceToCode(workspaceRef.current);
    setCode(rCode);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div ref={blocklyDiv} style={{ flex: 1, width: "100%" }} />
      <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
        <GenerateButton onClick={generateCodeR} label="Generate R Code" />
      </div>
    </div>
  );
};

export default BlocklyComponent;
