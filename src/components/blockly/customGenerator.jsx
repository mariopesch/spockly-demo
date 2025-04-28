import * as Blockly from "blockly/core";

/**
 * R code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Generator.R = new Blockly.Generator("R");

// R Operator Precedence (approximate)
Blockly.Generator.R.ORDER_ATOMIC = 0; // Numbers, strings...
Blockly.Generator.R.ORDER_UNARY = 1; // -x, !x
Blockly.Generator.R.ORDER_MULTIPLICATIVE = 2; // *, /
Blockly.Generator.R.ORDER_ADDITIVE = 3; // +, -
Blockly.Generator.R.ORDER_RELATIONAL = 4; // <, <=, >, >=
Blockly.Generator.R.ORDER_EQUALITY = 5; // ==, !=
Blockly.Generator.R.ORDER_LOGICAL_AND = 6; // &
Blockly.Generator.R.ORDER_LOGICAL_OR = 7; // |
Blockly.Generator.R.ORDER_NONE = 99;

/**
 * Initialise variable names.
 */
Blockly.Generator.R.init = function (workspace) {
  Blockly.Generator.R.definitions_ = Object.create(null);

  if (!Blockly.Generator.R.nameDB_) {
    Blockly.Generator.R.nameDB_ = new Blockly.Names(
      Blockly.Generator.R.RESERVED_WORDS_
    );
  } else {
    Blockly.Generator.R.nameDB_.reset();
  }

  Blockly.Generator.R.nameDB_.setVariableMap(workspace.getVariableMap());
};

/**
 * Complete the R code.
 */
Blockly.Generator.R.finish = function (code) {
  let commentCode = "";
  let definitionsCode = "";

  for (const name in Blockly.Generator.R.definitions_) {
    definitionsCode += Blockly.Generator.R.definitions_[name] + "\n";
  }

  Blockly.Generator.R.nameDB_.reset();
  delete Blockly.Generator.R.definitions_;

  return commentCode + "\n" + definitionsCode + "\n" + code;
};

/**
 * Format and indent code for R.
 */
Blockly.Generator.R.formatCode = function (code) {
  return code
    .split("\n")
    .map((line) => line.trim())
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n")
    .trim();
};

/**
 * Quote a string for R output.
 */
Blockly.Generator.R.quote_ = function (string) {
  return `"${string.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
};

/**
 * Add semicolon or newline (R doesn't use semicolons by default).
 */
Blockly.Generator.R.scrubNakedValue = function (line) {
  return line + "\n";
};

/**
 * Common generator logic for R.
 */
Blockly.Generator.R.scrub_ = function (block, code) {
  let commentCode = "";
  const comment = block.getCommentText();

  if (comment) {
    commentCode += Blockly.Generator.R.prefixLines("# " + comment + "\n", "");
  }

  for (let i = 0; i < block.inputList.length; i++) {
    if (block.inputList[i].type === Blockly.INPUT_VALUE) {
      const childBlock = block.inputList[i].connection.targetBlock();
      if (childBlock) {
        const nestedComment = Blockly.Generator.R.allNestedComments(childBlock);
        if (nestedComment) {
          commentCode += Blockly.Generator.R.prefixLines(
            "# " + nestedComment,
            ""
          );
        }
      }
    }
  }

  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = Blockly.Generator.R.blockToCode(nextBlock);

  return commentCode + code + nextCode;
};

// Generator for text_print block
Blockly.Generator.R.forBlock["text_print"] = function(block, generator) {
  const text = generator.valueToCode(block, "TEXT", Blockly.Generator.R.ORDER_NONE) || "''";
  return `print(${text})\n`;
};

// Generator for text block
Blockly.Generator.R.forBlock["text"] = function(block) {
  const text = block.getFieldValue("TEXT");
  // Properly quote the string for R
  return [`"${text}"`, Blockly.Generator.R.ORDER_ATOMIC];
};

// Generator for variables_get block
Blockly.Generator.R.forBlock["variables_get"] = function(block) {
  const varName = Blockly.Generator.R.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Names.NameType.VARIABLE);
  return [varName, Blockly.Generator.R.ORDER_ATOMIC];
};

// Generator for variables_set block
Blockly.Generator.R.forBlock["variables_set"] = function(block, generator) {
  const varName = Blockly.Generator.R.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Names.NameType.VARIABLE);
  const value = generator.valueToCode(block, "VALUE", Blockly.Generator.R.ORDER_NONE) || "NULL";
  return `${varName} <- ${value}\n`;
};

// Add generators for logic blocks
Blockly.Generator.R.forBlock["controls_if"] = function(block, generator) {
  // If/elseif/else condition
  let code = '';
  let conditionCode;

  if (block.elseifCount_ === undefined) {
    block.elseifCount_ = 0;
  }
  if (block.elseCount_ === undefined) {
    block.elseCount_ = 0;
  }

  conditionCode = generator.valueToCode(block, 'IF0', Blockly.Generator.R.ORDER_NONE) || 'FALSE';
  let branchCode = generator.statementToCode(block, 'DO0');
  code += `if (${conditionCode}) {\n${branchCode}}\n`;

  // Else-If clauses
  for (let i = 1; i <= block.elseifCount_; i++) {
    conditionCode = generator.valueToCode(block, 'IF' + i, Blockly.Generator.R.ORDER_NONE) || 'FALSE';
    branchCode = generator.statementToCode(block, 'DO' + i);
    code += `else if (${conditionCode}) {\n${branchCode}}\n`;
  }

  // Else clause
  if (block.elseCount_) {
    branchCode = generator.statementToCode(block, 'ELSE');
    code += `else {\n${branchCode}}\n`;
  }

  return code;
};

// Logic compare block
Blockly.Generator.R.forBlock["logic_compare"] = function(block, generator) {
  const OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };

  const operator = OPERATORS[block.getFieldValue('OP')];
  const argument0 = generator.valueToCode(block, 'A', Blockly.Generator.R.ORDER_RELATIONAL) || '0';
  const argument1 = generator.valueToCode(block, 'B', Blockly.Generator.R.ORDER_RELATIONAL) || '0';

  return [`${argument0} ${operator} ${argument1}`, Blockly.Generator.R.ORDER_RELATIONAL];
};

// Math arithmetic block
Blockly.Generator.R.forBlock["math_arithmetic"] = function(block, generator) {
  const OPERATORS = {
    'ADD': ['+', Blockly.Generator.R.ORDER_ADDITIVE],
    'MINUS': ['-', Blockly.Generator.R.ORDER_ADDITIVE],
    'MULTIPLY': ['*', Blockly.Generator.R.ORDER_MULTIPLICATIVE],
    'DIVIDE': ['/', Blockly.Generator.R.ORDER_MULTIPLICATIVE],
    'POWER': ['^', Blockly.Generator.R.ORDER_UNARY]
  };

  const tuple = OPERATORS[block.getFieldValue('OP')];
  const operator = tuple[0];
  const order = tuple[1];

  const argument0 = generator.valueToCode(block, 'A', order) || '0';
  const argument1 = generator.valueToCode(block, 'B', order) || '0';

  return [`${argument0} ${operator} ${argument1}`, order];
};
