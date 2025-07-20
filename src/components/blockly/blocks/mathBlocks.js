import * as Blockly from "blockly";

// Define the new blocks with appropriate input checks and output types
Blockly.defineBlocksWithJsonArray([
  {
    type: "sum_vector",
    message0: "sum of %1",
    args0: [{ type: "input_value", name: "VECTOR", check: ["Array", "Number"] }],
    output: "Number",
    colour: "#FF8A65",
    tooltip: "Sum of all elements in a vector or a single number.",
  },
  {
    type: "vector_minus_scalar",
    message0: "%1 minus %2",
    args0: [
      { type: "input_value", name: "VECTOR", check: ["Array", "Number"] },
      { type: "input_value", name: "SCALAR", check: "Number" }
    ],
    output: ["Array", "Number"],
    colour: "#FF8A65",
    tooltip: "Subtract a scalar from each element of a vector or from a number.",
  },
  {
    type: "square_vector",
    message0: "%1 squared",
    args0: [{ type: "input_value", name: "VECTOR", check: ["Array", "Number"] }],
    output: ["Array", "Number"],
    colour: "#FF8A65",
    tooltip: "Square each element in a vector or a single number.",
  },
  {
    type: "sqrt_vector",
    message0: "sqrt of %1",
    args0: [{ type: "input_value", name: "INPUT", check: ["Array", "Number"] }],
    output: ["Array", "Number"],
    colour: "#FF8A65",
    tooltip: "Square root of a value or each element in a vector.",
  },
  {
    type: "divide_values",
    message0: "%1 divided by %2",
    args0: [
      { type: "input_value", name: "NUMERATOR", check: ["Array", "Number"] },
      { type: "input_value", name: "DENOMINATOR", check: ["Array", "Number"] }
    ],
    output: ["Array", "Number"],
    colour: "#FF8A65",
    tooltip: "Divide one value/vector by another value/vector.",
  },
  {
    type: "exp_of",
    message0: "exp of %1",
    args0: [{ type: "input_value", name: "VALUE", check: ["Array", "Number"] }],
    output: ["Array", "Number"],
    colour: "#FF8A65",
    tooltip: "Exponential of a value or each element in a vector.",
  },
  {
    type: "log_of",
    message0: "log of %1",
    args0: [{ type: "input_value", name: "VALUE", check: ["Array", "Number"] }],
    output: ["Array", "Number"],
    colour: "#FF8A65",
    tooltip: "Natural logarithm of a value or each element in a vector.",
  },
  {
    type: "sin_of",
    message0: "sin of %1",
    args0: [{ type: "input_value", name: "ANGLE", check: ["Array", "Number"] }],
    output: ["Array", "Number"],
    colour: "#FF8A65",
    tooltip: "Sine of an angle (in radians) or each element in a vector.",
  },
  {
    type: "round_value",
    message0: "round %1",
    args0: [{ type: "input_value", name: "VALUE", check: ["Array", "Number"] }],
    output: ["Array", "Number"],
    colour: "#FF8A65",
    tooltip: "Round a number or each element in a vector to the nearest integer.",
  },
  {
    type: "modulo_values",
    message0: "%1 modulo %2",
    args0: [
      { type: "input_value", name: "DIVIDEND", check: ["Array", "Number"] },
      { type: "input_value", name: "DIVISOR", check: ["Array", "Number"] }
    ],
    output: ["Array", "Number"],
    colour: "#FF8A65",
    tooltip: "Modulo operation (x %% y) for values or element-wise for vectors.",
  }
]);

// Generator functions for the new value-style blocks
// Fixed with correct operator precedence

Blockly.Generator.R.forBlock["sum_vector"] = function(block, generator) {
  const vector = generator.valueToCode(block, 'VECTOR', Blockly.Generator.R.ORDER_NONE) || '0';
  const code = `sum(${vector})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["vector_minus_scalar"] = function(block, generator) {
  const vector = generator.valueToCode(block, 'VECTOR', Blockly.Generator.R.ORDER_ADDITIVE);
  const scalar = generator.valueToCode(block, 'SCALAR', Blockly.Generator.R.ORDER_ADDITIVE);
  const code = `(${vector} - ${scalar})`;
  return [code, Blockly.Generator.R.ORDER_ADDITIVE];
};

Blockly.Generator.R.forBlock["square_vector"] = function(block, generator) {
  const vector = generator.valueToCode(block, 'VECTOR', Blockly.Generator.R.ORDER_UNARY);
  const code = `(${vector})^2`;
  return [code, Blockly.Generator.R.ORDER_UNARY];
};

Blockly.Generator.R.forBlock["sqrt_vector"] = function(block, generator) {
  const input = generator.valueToCode(block, 'INPUT', Blockly.Generator.R.ORDER_NONE) || '0';
  const code = `sqrt(${input})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["divide_values"] = function(block, generator) {
  const numerator = generator.valueToCode(block, 'NUMERATOR', Blockly.Generator.R.ORDER_MULTIPLICATIVE);
  const denominator = generator.valueToCode(block, 'DENOMINATOR', Blockly.Generator.R.ORDER_MULTIPLICATIVE);
  const code = `(${numerator} / ${denominator})`;
  return [code, Blockly.Generator.R.ORDER_MULTIPLICATIVE];
};

Blockly.Generator.R.forBlock["exp_of"] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.Generator.R.ORDER_NONE) || '0';
  const code = `exp(${value})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["log_of"] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.Generator.R.ORDER_NONE) || '0';
  const code = `log(${value})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["sin_of"] = function(block, generator) {
  const angle = generator.valueToCode(block, 'ANGLE', Blockly.Generator.R.ORDER_NONE) || '0';
  const code = `sin(${angle})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["round_value"] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.Generator.R.ORDER_NONE) || '0';
  const code = `round(${value})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["modulo_values"] = function(block, generator) {
  const dividend = generator.valueToCode(block, 'DIVIDEND', Blockly.Generator.R.ORDER_MULTIPLICATIVE);
  const divisor = generator.valueToCode(block, 'DIVISOR', Blockly.Generator.R.ORDER_MULTIPLICATIVE);
  const code = `(${dividend} %% ${divisor})`;
  return [code, Blockly.Generator.R.ORDER_MULTIPLICATIVE];
};