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
