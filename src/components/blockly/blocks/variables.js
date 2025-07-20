import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
	{
	  "type": "variables_set",
	  "message0": "set %1 to %2",
	  "args0": [
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variable": "item"
		},
		{
		  "type": "input_value",
		  "name": "VALUE"
		}
	  ],
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": "#A65C81",
	  "tooltip": "Set a variable to a value.",
	  "helpUrl": ""
	},
	{
	  "type": "variables_change",
	  "message0": "change %1 by %2",
	  "args0": [
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variable": "item"
		},
		{
		  "type": "input_value",
		  "name": "DELTA",
		  "check": "Number"
		}
	  ],
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": "#A65C81",
	  "tooltip": "Change a variable by a value.",
	  "helpUrl": ""
	},
	{
	  "type": "variables_get",
	  "message0": "%1",
	  "args0": [
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variable": "item"
		}
	  ],
	  "output": null,
	  "colour": "#A65C81",
	  "tooltip": "Get the value of a variable.",
	  "helpUrl": ""
	}
  ]);


  Blockly.Generator.R.forBlock['variables_set'] = function(block, generator) {
	const varName = generator.getVariableName(block.getFieldValue('VAR'));
	const value = generator.valueToCode(block, 'VALUE', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
	
	return `${varName} <- ${value}\n`;
  };
  
  Blockly.Generator.R.forBlock['variables_get'] = function(block, generator) {
	const varName = generator.getVariableName(block.getFieldValue('VAR'));
	return [varName, Blockly.Generator.R.ORDER_ATOMIC];
  };
  
  Blockly.Generator.R.forBlock['variables_change'] = function(block, generator) {
	const varName = generator.getVariableName(block.getFieldValue('VAR'));
	const value = generator.valueToCode(block, 'DELTA', Blockly.Generator.R.ORDER_ATOMIC) || '0';
	
	return `${varName} <- ${varName} + ${value}\n`;
  };