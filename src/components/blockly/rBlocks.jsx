import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "create_vector",
    message0: "vector with %1",
    args0: [
      {
        type: "field_input",
        name: "ELEMENTS",
        text: "1, 2, 3",
      },
    ],
    output: null,
    colour: 230,
    tooltip: "Create a numeric vector",
    helpUrl: "",
  },
]);

Blockly.Generator.R.forBlock["create_vector"] = function (block) {
  const elements = block.getFieldValue("ELEMENTS");
  return [`c(${elements})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "plot_vector",
    message0: "plot %1",
    args0: [
      {
        type: "input_value",
        name: "VECTOR",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 200,
    tooltip: "Plot a vector using plot()",
    helpUrl: "",
  },
]);

Blockly.Generator.R.forBlock["plot_vector"] = function (block, generator) {
  const vector =
    generator.valueToCode(block, "VECTOR", Blockly.Generator.R.ORDER_NONE) ||
    "c()";
  return `plot(${vector})\n`;
};
