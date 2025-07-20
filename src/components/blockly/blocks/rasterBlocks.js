import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "crop_raster",
    message0: "crop raster %1 to extent %2",
    args0: [
      { type: "input_value", name: "RASTER" },
      { type: "field_input", name: "EXTENT", text: "xmin, xmax, ymin, ymax" },
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#64B5F6",
    tooltip: "Crop raster data",
    helpUrl: "https://www.rdocumentation.org/packages/terra/versions/1.7-39/topics/crop"
  },
  {
    type: "aggregate_raster",
    message0: "aggregate raster %1 with factor %2",
    args0: [
      { type: "input_value", name: "RASTER" },
      { type: "field_number", name: "FACTOR", value: 2 },
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#64B5F6",
    tooltip: "Aggregate raster data",
    helpUrl: "https://www.rdocumentation.org/packages/terra/versions/1.7-39/topics/aggregate"
  }
]);
