import * as Blockly from "blockly";

Blockly.Generator.R.forBlock["math_number"] = function (block) {
  const code = Number(block.getFieldValue("NUM"));
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};