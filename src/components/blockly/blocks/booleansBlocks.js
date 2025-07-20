import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "convert_to_bool",
    message0: "convert %1 to boolean",
    args0: [{ type: "input_value", name: "VALUE" }],
    output: "Boolean",
    colour: "#D32F2F",
    tooltip: "Convert a value to TRUE or FALSE using as.logical()",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/logical"
  },
  {
    type: "boolean_true",
    message0: "TRUE",
    output: "Boolean",
    colour: "#D32F2F",
    tooltip: "Logical constant TRUE",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/logical"
  },
  {
    type: "boolean_false",
    message0: "FALSE",
    output: "Boolean",
    colour: "#D32F2F",
    tooltip: "Logical constant FALSE",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/logical"
  }
]);

//
// ─── GENERATOR FUNCTIONS ────────────────────────────────────────────────────────
//

Blockly.Generator.R.forBlock["convert_to_bool"] = function (block, generator) {
  const value = generator.valueToCode(block, "VALUE", Blockly.Generator.R.ORDER_ATOMIC);
  return [`as.logical(${value})`, Blockly.Generator.R.ORDER_FUNCTION_CALL];
}

Blockly.Generator.R.forBlock["boolean_true"] = function (block, generator) {
  return ["TRUE", Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["boolean_false"] = function (block, generator) {
  return ["FALSE", Blockly.Generator.R.ORDER_ATOMIC];
};