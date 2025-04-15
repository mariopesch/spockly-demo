import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import GenerateButton from "./GenerateButton";
import "./blockly/customBlocks"; // Import custom blocks
import "./blockly/customGenerator"; // Import custom generator
import "./blockly/rBlocks"; // Import R blocks

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
      toolbox: `
        <xml>
          <category name="Examples" colour="#5C81A6">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="math_number"></block>
          <block type="math_arithmetic"></block>
          <block type="text"></block>
          <block type="text_print"></block>
          </category>
          <category name="Custom Blocks" colour="#5C81A6">
            <block type="print_hello"></block>
            <block type="math_square"></block>
            <block type="text_greeting"></block>
            <block type="repeat_times"></block>
            <block type="dropdown_color"></block>
          </category>
          <Category name="R-Example" colour="#5CA65C">
            <block type="create_vector"></block>
            <block type="plot_vector"></block>
          </Category>
          <category name="Variables" colour="#A65E2E" custom="VARIABLE"></category>

        </xml>
      `,
    });

    return () => {
      workspaceRef.current?.dispose();
    };
  }, []);

  const generateCode = () => {
    if (!workspaceRef.current) {
      console.error("Blockly workspace is not initialized.");
      return;
    }

    const pythonCode = pythonGenerator.workspaceToCode(workspaceRef.current);
    setCode(pythonCode);
  };

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
        <GenerateButton onClick={generateCode} label="Generate Python Code" />
      </div>
      <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
        <GenerateButton onClick={generateCodeR} label="Generate R Code" />
      </div>
    </div>
  );
};

export default BlocklyComponent;
