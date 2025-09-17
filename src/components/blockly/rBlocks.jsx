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

Blockly.defineBlocksWithJsonArray([
  {
    type: "rnorm_block",
    message0: "rnorm %1 values with mean %2 and standard deviation %3",
    args0: [
      {
        type: "input_value",
        name: "N",
        check: "Number",
      },
      {
        type: "input_value",
        name: "MEAN",
        check: "Number",
      },
      {
        type: "input_value",
        name: "SD",
        check: "Number",
      },
    ],
    output: "Array",
    colour: 160,
    tooltip: "Generate random numbers from a normal distribution",
    helpUrl: "",
  },
]);

Blockly.Generator.R.forBlock["rnorm_block"] = function (block, generator) {
  const n =
    generator.valueToCode(block, "N", Blockly.Generator.R.ORDER_ATOMIC) || "20";
  const mean =
    generator.valueToCode(block, "MEAN", Blockly.Generator.R.ORDER_ATOMIC) ||
    "10";
  const sd =
    generator.valueToCode(block, "SD", Blockly.Generator.R.ORDER_ATOMIC) ||
    "10";

  return `rnorm(${n}, ${mean}, ${sd})`;
};

Blockly.Generator.R.forBlock["math_number"] = function (block) {
  const code = Number(block.getFieldValue("NUM"));
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};
