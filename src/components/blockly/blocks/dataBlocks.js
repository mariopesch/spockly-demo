import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
	{
	  type: "access_column",
	  message0: "select column %1 from %2",
	  args0: [
		{ type: "field_input", name: "COLUMN", text: "column_name" },
		{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
	  ],
	  output: "Vector",
	  colour: "#FF7043",
	  tooltip: "Access a specific column from a dataset",
	  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/Extract"
	}
  ]);
  
  Blockly.Generator.R.forBlock['access_column'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const column = block.getFieldValue('COLUMN') || 'column_name';
  
	const cleanColumn = column.replace(/["']/g, '');
  
	const code = `${data}$${cleanColumn}`;
  
	if (block.outputConnection && !block.outputConnection.isConnected()) {
		return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_ATOMIC];
  };

  Blockly.defineBlocksWithJsonArray([
	{
	  type: "rename_column",
	  message0: "rename column number %1 of %2 to %3",
	  args0: [
		{
		  type: "input_value",
		  name: "COLUMN_NUMBER",
		  check: "Number"
		},
		{
		  type: "input_value",
		  name: "DATA",
		  check: ["DataFrame", "Variable"]
		},
		{
		  type: "field_input",
		  name: "NEW_NAME",
		  text: "new_column_name"
		}
	  ],
	  inputsInline: true,
	  previousStatement: null,
	  nextStatement: null,
	  colour: "#FFD54F",
	  tooltip: "Rename a specific column in a dataframe by its index",
	  helpUrl: ""
	}
  ]);
  
  Blockly.Generator.R.forBlock['rename_column'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const columnIndex = generator.valueToCode(block, 'COLUMN_NUMBER', Blockly.Generator.R.ORDER_ATOMIC) || '1';
	const newName = block.getFieldValue('NEW_NAME') || 'new_column_name';
  
	const cleanNewName = newName.replace(/["']/g, '');
  
	const code = `colnames(${data})[${columnIndex}] <- "${cleanNewName}"\n`;
  
	return code;
  };

Blockly.defineBlocksWithJsonArray([
  {
    type: "preview_head_n",
    message0: "preview first %1 rows of %2",
    args0: [
      { type: "field_number", name: "N", value: 5, min: 1 },
      { type: "input_value", name: "DATA", check: "DataFrame" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FF7043",
    tooltip: "Preview the first N rows of a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/SparkR/versions/3.1.2/topics/head"
  },
  {
    type: "structure_overview",
    message0: "get structure of %1",
    args0: [
      { type: "input_value", name: "DATA", check: "DataFrame" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "String",
    colour: "#FF7043",
    tooltip: "Get the structure of a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/str"
  },
  {
    type: "data_summary",
    message0: "summary of %1",
    args0: [
      { type: "input_value", name: "DATA" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF7043",
    tooltip: "Get summary statistics of a dataset.",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/summary"
  },
  {
    type: "length_data",
    message0: "length of %1",
    args0: [
      { type: "input_value", name: "DATA", check: ["Vector", "Array", "DataFrame", "Variable"] }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Number",
    colour: "#FF7043",
    tooltip: "Get the length of a vector or number of rows in a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/length"
  }
]);

Blockly.Generator.R.forBlock["structure_overview"] = function (block, generator) {
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || '""';
  return `str(${data})\n`;
};

Blockly.Generator.R.forBlock["data_summary"] = function (block, generator) {
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || '""';
  return `summary(${data})\n`;
};

Blockly.Generator.R.forBlock["preview_head_n"] = function (block, generator) {
  const n = block.getFieldValue("N");
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || '""';
  return `head(${data}, n = ${n})\n`;
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "data_table",
    message0: "count frequency of %1",
    args0: [
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    output: "String",
    colour: "#FF7043",
    tooltip: "Create a frequency table of a dataset.",
    helpUrl: "",
  },
]);

Blockly.Generator.R.forBlock["data_table"] = function (block, generator) {
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC);
  return [`table(${data})`, 0];
};

Blockly.Generator.R.forBlock['length_data'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';

  const code = `length(${data})`;

  if (block.outputConnection && !block.outputConnection.isConnected()) {
    return code + '\n';
  }
  return [code, 0];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "data_shape",
    message0: "get number of rows and columns of %1",
    args0: [
      { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Vector",
    colour: "#FF7043",
    tooltip: "Get the dimensions (rows, columns) of a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/dim"
  },
  {
    type: "filter_rows",
    message0: "filter %1 where %2",
    args0: [
      { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
      { type: "field_input", name: "CONDITION", text: "column > 10" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FFD54F",
    tooltip: "Filter rows from a dataframe based on a condition",
    helpUrl: "https://dplyr.tidyverse.org/reference/filter.html"
  },
  {
    type: "select_columns",
    message0: "extract columns %1 from %2",
    args0: [
      { type: "field_input", name: "COLUMNS", text: "col1, col2" },
      { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FFD54F",
    tooltip: "Select specific columns from a dataframe",
    helpUrl: "https://dplyr.tidyverse.org/reference/select.html"
  },
  {
	type: "group_by_summarise",
	message0: "group %1 by %2 and calculate %3 of %4",
	args0: [
	  { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
	  { type: "field_input", name: "GROUP_COL", text: "group_column" },
	  { 
		type: "field_dropdown", 
		name: "FUNCTION",
		options: [
		  ["mean (average)", "mean"],
		  ["sum (total)", "sum"],
		  ["count (number of rows)", "n()"],
		  ["median (middle value)", "median"],
		  ["min (minimum)", "min"],
		  ["max (maximum)", "max"],
		  ["standard deviation", "sd"],
		  ["variance", "var"],
		  ["first value", "first"],
		  ["last value", "last"],
		  ["count distinct", "n_distinct"],
		  ["any (logical OR)", "any"],
		  ["all (logical AND)", "all"]
		]
	  },
	  { type: "field_input", name: "COLUMN", text: "value_column" }
	],
	inputsInline: false,
	previousStatement: null,
	nextStatement: null,
	output: "DataFrame",
	colour: "#FF7043",
	tooltip: "Group by a column and calculate summary statistics",
	helpUrl: "https://dplyr.tidyverse.org/reference/summarise.html"
  }
  ,
  {
    type: "subset_rows",
    message0: "subset row %2 to %3 from %1",
    args0: [
      { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
      { type: "field_number", name: "START", value: 1, min: 1 },
      { type: "field_number", name: "END", value: 10, min: 1 }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FFD54F",
    tooltip: "Subset rows of a dataset from START to END",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/subset"
  },
  {
    type: "subset_column_range",
    message0: "column %1 of %2 from row %3 to %4",
    args0: [
      { type: "field_input", name: "COLUMN", text: "column_name" },
      { type: "input_value", name: "DATASET", check: ["DataFrame", "Variable"] },
      { type: "field_number", name: "START", value: 40, min: 1 },
      { type: "field_number", name: "END", value: 60, min: 1 }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Vector",
    colour: "#FFD54F",
    tooltip: "Access a column range from a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/subset"
  },
  {
    type: "mutate_column",
    message0: "add column %1 = %2 to %3",
    args0: [
      { type: "field_input", name: "COLUMN_NAME", text: "new_column" },
      { type: "field_input", name: "EXPRESSION", text: "column1 + column2" },
      { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FF7043",
    tooltip: "Add or modify a column with a calculated expression",
    helpUrl: "https://dplyr.tidyverse.org/reference/mutate.html"
  },
  {
    type: "arrange_data",
    message0: "sort %1 by %2 %3",
    args0: [
      { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
      { type: "field_input", name: "COLUMN", text: "column" },
      { type: "field_dropdown", name: "ORDER", options: [
        ["ascending", "asc"],
        ["descending", "desc"]
      ]}
    ],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FF7043",
    tooltip: "Sort dataframe by a column in ascending or descending order",
    helpUrl: "https://dplyr.tidyverse.org/reference/arrange.html"
  }
]);

Blockly.Generator.R.forBlock['data_shape'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
  const code = `dim(${data})`;

  if (block.outputConnection && !block.outputConnection.isConnected()) {
    return code + '\n';
  }
  return [code, 0];
};

Blockly.Generator.R.forBlock['filter_rows'] = function(block, generator) {
	generator.requirePackage('dplyr');
  
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const condition = block.getFieldValue('CONDITION') || 'TRUE';
  
	const code = `${data} %>% filter(${condition})`;
  
	// Verwenden Sie eine sichere Order-Nummer statt einer Konstante
	return [code, 0]; // 0 entspricht ORDER_ATOMIC
  };

Blockly.Generator.R.forBlock['select_columns'] = function(block, generator) {
  generator.requirePackage('dplyr');

  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
  const columns = block.getFieldValue('COLUMNS') || '';

  const columnList = columns.split(',').map(col => col.trim()).filter(col => col.length > 0);

  let code;
  if (columnList.length > 0) {
    const formattedColumns = columnList.map(col => {
      if ((col.startsWith('"') && col.endsWith('"')) || (col.startsWith("'") && col.endsWith("'"))) {
        return col;
      }
      if (col.includes('(') || col.includes('=') || col.includes(':')) {
        return col;
      }
      return col;
    });

    code = `${data} %>% select(${formattedColumns.join(', ')})`;
  } else {
    code = `${data} %>% select(everything())`;
  }

  if (block.outputConnection && !block.outputConnection.isConnected()) {
    return code + '\n';
  }
  return [code, 0];
};

Blockly.Generator.R.forBlock['group_by_summarise'] = function(block, generator) {
	generator.requirePackage('dplyr');
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const groupCol = block.getFieldValue('GROUP_COL') || 'group_column';
	const func = block.getFieldValue('FUNCTION') || 'mean';
	const column = block.getFieldValue('COLUMN') || 'value_column';
	
	let summariseExpression;
	if (func === 'n()') {
	  summariseExpression = `result = ${func}`;
	} else {
	  summariseExpression = `result = ${func}(${column}, na.rm = TRUE)`;
	}
	
	const code = `${data} %>% group_by(${groupCol}) %>% summarise(${summariseExpression})`;
	
	return [code, 0];
  };

Blockly.Generator.R.forBlock['subset_rows'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
  const start = block.getFieldValue('START');
  const end = block.getFieldValue('END');

  const code = `${data}[${start}:${end}, ]`;

  if (block.outputConnection && !block.outputConnection.isConnected()) {
    return code + '\n';
  }
  return [code, 0];
};

Blockly.Generator.R.forBlock['subset_column_range'] = function(block, generator) {
  const dataset = generator.valueToCode(block, 'DATASET', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
  const column = block.getFieldValue('COLUMN') || 'column';
  const start = block.getFieldValue('START');
  const end = block.getFieldValue('END');

  const cleanColumn = column.replace(/["']/g, '');

  const code = `${dataset}$${cleanColumn}[${start}:${end}]`;

  if (block.outputConnection && !block.outputConnection.isConnected()) {
    return code + '\n';
  }
  return [code, 0];
};

Blockly.Generator.R.forBlock['mutate_column'] = function(block, generator) {
  generator.requirePackage('dplyr');

  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
  const columnName = block.getFieldValue('COLUMN_NAME') || 'new_column';
  const expression = block.getFieldValue('EXPRESSION') || '0';

  const code = `${data} %>% mutate(${columnName} = ${expression})`;

  if (block.outputConnection && !block.outputConnection.isConnected()) {
    return code + '\n';
  }
  return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

Blockly.Generator.R.forBlock['arrange_data'] = function(block, generator) {
  generator.requirePackage('dplyr');

  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
  const column = block.getFieldValue('COLUMN') || 'column';
  const order = block.getFieldValue('ORDER');

  let code;
  if (order === 'desc') {
    code = `${data} %>% arrange(desc(${column}))`;
  } else {
    code = `${data} %>% arrange(${column})`;
  }

  if (block.outputConnection && !block.outputConnection.isConnected()) {
    return code + '\n';
  }
  return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "preview_data",
    message0: "preview dataset(view head and tail) of %1",
    args0: [
      { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF7043",
    tooltip: "Preview the dataset by showing the top and bottom rows",
    helpUrl: ""
  }
]);

Blockly.Generator.R.forBlock["preview_data"] = function (block, generator) {
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || "data";
  return `rbind(head(${data}, 3), tail(${data}, 3))\n`;
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "show_tail",
    message0: "show last %1 rows of %2",
    args0: [
      { type: "field_number", name: "ROWS", value: 5, min: 1, max: 1000 },
      { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF7043",
    tooltip: "Show tail n rows of the loaded dataset",
    helpUrl: ""
  }
]);

Blockly.Generator.R.forBlock["show_tail"] = function (block, generator) {
  const rows = block.getFieldValue("ROWS");
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || "data";
  return `tail(${data}, ${rows})\n`;
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "show_rows",
    message0: "show first %1 rows of %2",
    args0: [
      { type: "field_number", name: "ROWS", value: 5, min: 1, max: 1000 },
      { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF7043",
    tooltip: "Show the first n rows of the loaded dataset",
    helpUrl: ""
  }
]);

Blockly.Generator.R.forBlock["show_rows"] = function (block, generator) {
  const rows = block.getFieldValue("ROWS");
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || "data";
  return `head(${data}, ${rows})\n`;
};
Blockly.defineBlocksWithJsonArray([
  // Data Preview Blocks
  {
  type: "preview_head_n",
  message0: "preview first %1 rows of %2",
  args0: [
    {
    type: "field_number",
    name: "N",
    value: 5,
    min: 1
    },
    {
    type: "input_value",
    name: "DATA",
    check: ["DataFrame", "Array", "Matrix"]
    }
  ],
  output: ["DataFrame", "Array", "Matrix"], // Keep same type as input
  colour: "#FF7043",
  tooltip: "Preview the first N rows of a dataframe or elements of an array/matrix.",
  helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/head"
  },
  {
  type: "structure_overview",
  message0: "get structure of %1",
  args0: [
    {
    type: "input_value",
    name: "DATA",
    check: ["DataFrame", "Array", "Matrix", "Number", "String"]
    }
  ],
  output: "String",
  colour: "#FF7043",
  tooltip: "Get the structure of an object (dataframe, array, matrix, etc.)",
  helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/str"
  },
  {
  type: "data_summary",
  message0: "get summary of %1",
  args0: [
    {
    type: "input_value",
    name: "DATA",
    check: ["DataFrame", "Array", "Matrix", "Number"]
    }
  ],
  output: "String",
  colour: "#FF7043",
  tooltip: "Get summary statistics of an object",
  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/summary"
  },
  
  // Improved Array Creation Block with Multiple Inputs
  {
  type: "create_array_multiple",
  message0: "create array",
  mutator: "array_mutator",
  output: "Array",
  colour: "#FF7043",
  tooltip: "Create an array with multiple elements. Click the gear icon to add more elements.",
  helpUrl: ""
  },
  
  // Simple Vector Creation (keeping the original for backward compatibility)
  {
  type: "create_vector",
  message0: "vector [ %1 ]",
  args0: [
    {
    type: "input_value",
    name: "ELEMENTS",
    check: ["Number", "String", "Boolean"]
    }
  ],
  output: "Array",
  colour: "#FF7043",
  tooltip: "Create a vector with comma-separated elements",
  helpUrl: ""
  },
  
  // Number sequence block
  {
  type: "create_sequence",
  message0: "sequence from %1 to %2 by %3",
  args0: [
    {
    type: "input_value",
    name: "FROM",
    check: "Number"
    },
    {
    type: "input_value",
    name: "TO",
    check: "Number"
    },
    {
    type: "input_value",
    name: "BY",
    check: "Number"
    }
  ],
  output: "Array",
  colour: "#FF7043",
  tooltip: "Create a sequence of numbers from start to end by step",
  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/seq"
  },
  
  // Data Manipulation Blocks
  {
  type: "data_shape",
  message0: "get dimensions of %1",
  args0: [
    {
    type: "input_value",
    name: "DATA",
    check: ["DataFrame", "Array", "Matrix"]
    }
  ],
  output: "Array", // Returns array of dimensions
  colour: "#FF7043",
  tooltip: "Returns the dimensions of a dataframe, array or matrix",
  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/dim"
  },
  {
  type: "get_length",
  message0: "get length of %1",
  args0: [
    {
    type: "input_value",
    name: "DATA",
    check: ["Array", "String"]
    }
  ],
  output: "Number",
  colour: "#FF7043",
  tooltip: "Returns the length of an array or string",
  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/length"
  },
  {
  type: "sort_array",
  message0: "sort %1 %2",
  args0: [
    {
    type: "input_value",
    name: "DATA",
    check: ["Array", "DataFrame"]
    },
    {
    type: "field_dropdown",
    name: "ORDER",
    options: [
      ["ascending", "FALSE"],
      ["descending", "TRUE"]
    ]
    }
  ],
  output: ["Array", "DataFrame"], // Keep same type as input
  colour: "#FF7043",
  tooltip: "Sort an array in ascending or descending order",
  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/sort"
  },
  {
  type: "combine_arrays",
  message0: "combine %1 and %2",
  args0: [
    {
    type: "input_value",
    name: "ARRAY1",
    check: ["Array", "DataFrame"]
    },
    {
    type: "input_value",
    name: "ARRAY2",
    check: ["Array", "DataFrame"]
    }
  ],
  output: ["Array", "DataFrame"], // Keep same type as inputs
  colour: "#FF7043",
  tooltip: "Combine two arrays or dataframes",
  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/c"
  },
  {
  type: "append_to_array",
  message0: "append %1 to %2",
  args0: [
    {
    type: "input_value",
    name: "ELEMENT",
    check: ["Number", "String", "Array"]
    },
    {
    type: "input_value",
    name: "ARRAY",
    check: "Array"
    }
  ],
  output: "Array",
  colour: "#FF7043",
  tooltip: "Append an element to an array",
  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/append"
  },
  {
  type: "slice_data",
  message0: "slice %1 from %2 to %3",
  args0: [
    {
    type: "input_value",
    name: "DATA",
    check: ["DataFrame", "Array"]
    },
    {
    type: "input_value",
    name: "START",
    check: "Number"
    },
    {
    type: "input_value",
    name: "END",
    check: "Number"
    }
  ],
  output: ["DataFrame", "Array"], // Keep same type as input
  colour: "#FF7043",
  tooltip: "Extract a slice of data between specified indices",
  helpUrl: ""
  },
  {
  type: "get_element",
  message0: "get element %1 from %2",
  args0: [
    {
    type: "input_value",
    name: "INDEX",
    check: "Number"
    },
    {
    type: "input_value",
    name: "ARRAY",
    check: "Array"
    }
  ],
  output: ["Number", "String", "Boolean"], // Element could be any basic type
  colour: "#FF7043",
  tooltip: "Get a specific element from an array by index",
  helpUrl: ""
  }
]);

// Mutator for create_array_multiple block
const arrayMutator = {
  itemCount_: 2,

  mutationToDom: function() {
  const container = Blockly.utils.xml.createElement('mutation');
  container.setAttribute('items', this.itemCount_);
  return container;
  },

  domToMutation: function(xmlElement) {
  const items = parseInt(xmlElement.getAttribute('items'), 10) || 2;
  this.updateShape_(items);
  },

  decompose: function(workspace) {
  const containerBlock = workspace.newBlock('array_container');
  containerBlock.initSvg();
  let connection = containerBlock.getInput('STACK').connection;
  for (let i = 0; i < this.itemCount_; i++) {
    const itemBlock = workspace.newBlock('array_item');
    itemBlock.initSvg();
    connection.connect(itemBlock.previousConnection);
    connection = itemBlock.nextConnection;
  }
  return containerBlock;
  },

  compose: function(containerBlock) {
  let itemBlock = containerBlock.getInputTargetBlock('STACK');
  const connections = [];
  while (itemBlock && !itemBlock.isInsertionMarker()) {
    connections.push(itemBlock.valueConnection_);
    itemBlock = itemBlock.nextConnection &&
      itemBlock.nextConnection.targetBlock();
  }
  for (let i = 0; i < this.itemCount_; i++) {
    const connection = this.getInput('ADD' + i);
    if (connection && connection.connection.targetConnection) {
    connection.connection.targetConnection.getSourceBlock().unplug();
    }
  }
  this.updateShape_(connections.length);
  for (let i = 0; i < connections.length; i++) {
    if (connections[i]) {
    this.getInput('ADD' + i).connection.connect(connections[i]);
    }
  }
  },

  updateShape_: function(itemCount) {
  if (itemCount < 1) itemCount = 1;
  
  // Add new inputs
  for (let i = 0; i < itemCount; i++) {
    if (!this.getInput('ADD' + i)) {
    const input = this.appendValueInput('ADD' + i)
      .setCheck(['Number', 'String', 'Boolean']);
    if (i === 0) {
      input.appendField('items:');
    }
    }
  }
  
  // Remove extra inputs
  for (let i = itemCount; this.getInput('ADD' + i); i++) {
    this.removeInput('ADD' + i);
  }
  
  this.itemCount_ = itemCount;
  }
};

// Define mutator helper blocks
Blockly.defineBlocksWithJsonArray([
  {
  type: 'array_container',
  message0: 'add items %1 %2',
  args0: [
    {
    type: 'input_dummy'
    },
    {
    type: 'input_statement',
    name: 'STACK'
    }
  ],
  colour: "#FF7043",
  tooltip: 'Add, remove, or reorder items in the array.',
  helpUrl: ''
  },
  {
  type: 'array_item',
  message0: 'item',
  previousStatement: null,
  nextStatement: null,
  colour: "#FF7043",
  tooltip: 'Add an item to the array.',
  helpUrl: ''
  }
]);

// Register the mutator
Blockly.Extensions.registerMutator('array_mutator', arrayMutator, null, ['array_item']);

// --- Generator Functions ---

// Initialize R generator if it doesn't exist
if (!Blockly.Generator.R) {
  Blockly.Generator.R = new Blockly.Generator('R');
  
  // Define operator precedence for R
  Blockly.Generator.R.ORDER_ATOMIC = 0;
  Blockly.Generator.R.ORDER_MEMBER = 1;
  Blockly.Generator.R.ORDER_FUNCTION_CALL = 2;
  Blockly.Generator.R.ORDER_NONE = 99;
}

// Data Preview Generators
Blockly.Generator.R.forBlock = Blockly.Generator.R.forBlock || {};


// Array Creation Generators
Blockly.Generator.R.forBlock["create_array_multiple"] = function(block, generator) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
  // If R_ORDER_NONE is also failing, you could try a literal 99 here temporarily
  const element = generator.valueToCode(block, 'ADD' + i, Blockly.Generator.R.ORDER_NONE || 99) || '0'; 
  if (element) {
    elements.push(element);
  }
  }
  const code = elements.length > 0 ? `c(${elements.join(', ')})` : 'c()';
  // Directly use the numeric value, or Blockly.Generator.R.ORDER_FUNCTION_CALL
  return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL || 2]; 
};

Blockly.Generator.R.forBlock["create_vector"] = function(block, generator) {
  const elements = generator.valueToCode(block, 'ELEMENTS', Blockly.Generator.R.ORDER_NONE) || '';
  return [`c(${elements})`, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

Blockly.Generator.R.forBlock["create_sequence"] = function(block, generator) {
  const from = generator.valueToCode(block, 'FROM', Blockly.Generator.R.ORDER_NONE) || '1';
  const to = generator.valueToCode(block, 'TO', Blockly.Generator.R.ORDER_NONE) || '10';
  const by = generator.valueToCode(block, 'BY', Blockly.Generator.R.ORDER_NONE) || '1';
  return [`seq(${from}, ${to}, ${by})`, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

// Data Manipulation Generators
Blockly.Generator.R.forBlock["data_shape"] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  return [`dim(${data})`, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

Blockly.Generator.R.forBlock["get_length"] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  return [`length(${data})`, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

// FIXED: Changed Array to DATA to match the block definition
Blockly.Generator.R.forBlock["sort_array"] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const order = block.getFieldValue('ORDER');
  return [`sort(${data}, decreasing = ${order})`, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

Blockly.Generator.R.forBlock["combine_arrays"] = function(block, generator) {
  const array1 = generator.valueToCode(block, 'ARRAY1', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const array2 = generator.valueToCode(block, 'ARRAY2', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  return [`c(${array1}, ${array2})`, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

Blockly.Generator.R.forBlock["append_to_array"] = function(block, generator) {
  const element = generator.valueToCode(block, 'ELEMENT', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const array = generator.valueToCode(block, 'ARRAY', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  return [`c(${array}, ${element})`, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

Blockly.Generator.R.forBlock["slice_data"] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const start = generator.valueToCode(block, 'START', Blockly.Generator.R.ORDER_NONE) || '1';
  const end = generator.valueToCode(block, 'END', Blockly.Generator.R.ORDER_NONE) || 'length(' + data + ')';
  return [`${data}[${start}:${end}]`, Blockly.Generator.R.ORDER_MEMBER];
};

Blockly.Generator.R.forBlock["get_element"] = function(block, generator) {
  const index = generator.valueToCode(block, 'INDEX', Blockly.Generator.R.ORDER_NONE || 99) || '1';
  const array = generator.valueToCode(block, 'ARRAY', Blockly.Generator.R.ORDER_FUNCTION_CALL || 2) || 'NULL'; 
  return [`${array}[${index}]`, Blockly.Generator.R.ORDER_MEMBER || 1];
};

