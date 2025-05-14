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

// --- Load Data ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "load_csv",
    message0: "load CSV file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "data.csv",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a CSV file",
  },
  {
    type: "load_shapefile",
    message0: "load shapefile %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "map.shp",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a shapefile with st_read()",
  },
  {
    type: "load_raster",
    message0: "load raster file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "raster.tif",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a raster file using stars",
  },
  {
    type: "load_builtin_dataset",
    message0: "load built-in dataset %1",
    args0: [
      {
        type: "field_dropdown",
        name: "DATASET",
        options: [["iris", "iris"], ["mtcars", "mtcars"], ["airquality", "airquality"]]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FFA726",
    tooltip: "Load a built-in dataset like iris",
  },
  {
    type: "get_dataset",
    message0: "use dataset %1",
    args0: [
      {
        type: "field_dropdown",
        name: "DATASET",
        options: [["iris", "iris"], ["mtcars", "mtcars"], ["airquality", "airquality"]]
      }
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Reference a built-in dataset"
  }
]);

// --- Transformations ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "filter_rows",
    message0: "filter rows with condition %1",
    args0: [{ type: "field_input", name: "CONDITION", text: "value > 10" }],
    output: null,
    colour: "#FFD54F",
    tooltip: "Filter rows from a dataframe",
  },
  {
    type: "select_columns",
    message0: "select columns %1",
    args0: [{ type: "field_input", name: "COLUMNS", text: "col1, col2" }],
    output: null,
    colour: "#FFD54F",
    tooltip: "Select specific columns from a dataframe",
  },
  {
    type: "group_by_summarise",
    message0: "group by %1 and summarise %2",
    args0: [
      { type: "field_input", name: "GROUP_COL", text: "group" },
      { type: "field_input", name: "SUMMARISE", text: "mean(value)" }
    ],
    output: null,
    colour: "#FFD54F",
    tooltip: "Group and summarise a dataset",
  },
  {
    type: "subset_rows",
    message0: "subset %1 from row %2 to %3",
    args0: [
      { type: "input_value", name: "DATA", check: "DataFrame" },
      { type: "field_number", name: "START", value: 1 },
      { type: "field_number", name: "END", value: 10 },
    ],
    output: "DataFrame",
    previousStatement: null,
    nextStatement: null,
    colour: "#FFD54F",
    tooltip: "Subset rows of a dataset",
  },
  {
    type: "subset_column_range",
    message0: "column %1 of %2 from row %3 to %4",
    args0: [
      { type: "field_input", name: "COLUMN", text: "Sepal.Length" },
      { type: "field_dropdown", name: "DATASET", options: [["iris", "iris"]] },
      { type: "field_number", name: "START", value: 40 },
      { type: "field_number", name: "END", value: 60 }
    ],
    output: "Vector",
    colour: "#FFD54F",
    tooltip: "Access a column range from a dataframe"
  }
]);

// --- Math ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "sum_vector",
    message0: "sum of %1",
    args0: [{ type: "input_value", name: "VECTOR" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Sum of all elements in a vector",
  },
  {
    type: "vector_minus_scalar",
    message0: "%1 minus %2",
    args0: [
      { type: "input_value", name: "VECTOR" },
      { type: "input_value", name: "SCALAR" }
    ],
    output: null,
    colour: "#FF8A65",
    tooltip: "Subtract scalar from each element of the vector"
  },
  {
    type: "square_vector",
    message0: "%1 squared",
    args0: [{ type: "input_value", name: "VECTOR" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Square each element in the vector",
  },
  {
    type: "sqrt_vector",
    message0: "sqrt of %1",
    args0: [{ type: "input_value", name: "INPUT" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Square root of a value or expression",
  },
  {
    type: "divide_values",
    message0: "%1 divided by %2",
    args0: [
      { type: "input_value", name: "NUMERATOR" },
      { type: "input_value", name: "DENOMINATOR" }
    ],
    output: null,
    colour: "#FF8A65",
    tooltip: "Divide one value by another",
    helpUrl: ""
  }
]);

// --- Statistics ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "calculate_mean",
    message0: "mean of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    previousStatement: null,
    nextStatement: null,
    colour: "#BA68C8",
    tooltip: "Calculate mean of a column",
  },
  {
    type: "calculate_sd",
    message0: "standard deviation of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Calculate standard deviation",
  },
  {
    type: "summary_statistics",
    message0: "summary of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Show summary statistics",
  },
  {
    type: "quantile_column",
    message0: "quantile of %1 at %2",
    args0: [
      { type: "input_value", name: "VECTOR" },
      { type: "field_input", name: "VALUES", text: "0.1, 0.5, 0.9" }
    ],
    output: null,
    colour: "#BA68C8",
    tooltip: "Compute quantiles at given probabilities",
  },
  {
    type: "sorted_element_at",
    message0: "sorted element of %1 at position %2",
    args0: [
      { type: "input_value", name: "VECTOR" },
      { type: "field_number", name: "INDEX", value: 1 }
    ],
    output: null,
    colour: "#BA68C8",
    tooltip: "Access an element from sorted vector",
  }
]);

// --- Modeling ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "linear_regression",
    message0: "linear model: %1 ~ %2",
    args0: [
      { type: "field_input", name: "RESPONSE", text: "y" },
      { type: "field_input", name: "PREDICTOR", text: "x" },
    ],
    output: null,
    colour: "#A1887F",
    tooltip: "Run a linear regression",
  },
  {
    type: "semivariogram",
    message0: "compute semivariogram of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Compute a semivariogram",
  },
  {
    type: "kriging_interpolation",
    message0: "interpolate using kriging on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Perform kriging interpolation",
  }
]);

// --- Geometry ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "st_centroid",
    message0: "calculate centroid of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    output: null,
    colour: "#4DD0E1",
    tooltip: "Calculate centroids of geometries",
  },
  {
    type: "st_transform",
    message0: "transform %1 to CRS %2",
    args0: [
      { type: "input_value", name: "GEOM" },
      { type: "field_input", name: "CRS", text: "4326" },
    ],
    output: null,
    colour: "#4DD0E1",
    tooltip: "Transform coordinate reference system",
  },
  {
    type: "st_buffer",
    message0: "buffer %1 by %2 units",
    args0: [
      { type: "input_value", name: "GEOM" },
      { type: "field_number", name: "DISTANCE", value: 100 },
    ],
    output: null,
    colour: "#4DD0E1",
    tooltip: "Create buffer around geometries",
  }
]);

// --- Raster ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "read_stars",
    message0: "read raster using stars from %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "raster.tif" }],
    output: null,
    colour: "#64B5F6",
    tooltip: "Read raster data using the stars package",
  },
  {
    type: "crop_raster",
    message0: "crop raster %1 to extent %2",
    args0: [
      { type: "input_value", name: "RASTER" },
      { type: "field_input", name: "EXTENT", text: "xmin, xmax, ymin, ymax" },
    ],
    output: null,
    colour: "#64B5F6",
    tooltip: "Crop raster data",
  },
  {
    type: "aggregate_raster",
    message0: "aggregate raster %1 with factor %2",
    args0: [
      { type: "input_value", name: "RASTER" },
      { type: "field_number", name: "FACTOR", value: 2 },
    ],
    output: null,
    colour: "#64B5F6",
    tooltip: "Aggregate raster data",
  }
]);

// --- Maps ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "plot_map",
    message0: "plot map of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Plot spatial data",
  },
  {
    type: "set_map_title",
    message0: "set map title to %1",
    args0: [{ type: "field_input", name: "TITLE", text: "Map Title" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Set the main title of the map",
  },
  {
    type: "color_by_attribute",
    message0: "color map by attribute %1",
    args0: [{ type: "field_input", name: "ATTRIBUTE", text: "value" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Color geometries by attribute",
  }
]);

// --- Visualization ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "print_output",
    message0: "print output %1",
    args0: [{ type: "input_value", name: "TEXT" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Print output to the console",
  },
  {
    type: "preview_data",
    message0: "preview data %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Preview first rows of data",
  },
  {
    type: "show_structure",
    message0: "show structure of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Show structure of an object",
  }
]);