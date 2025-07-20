import * as Blockly from "blockly";

// Define custom R generator if it doesn't exist
if (!Blockly.Generator.R) {
  Blockly.Generator.R = new Blockly.Generator('R');
  Blockly.Generator.R.ORDER_ATOMIC = 0;
  Blockly.Generator.R.ORDER_NONE = 99;
  // Add a method to track required packages
  Blockly.Generator.R.requiredPackages = new Set();
  Blockly.Generator.R.requirePackage = function(pkg, setupCode) {
    this.requiredPackages.add({pkg, setupCode});
  };
  // Override finish to include package loading and setup
  Blockly.Generator.R.finish = function(code) {
    let packageCode = '';
    for (const {pkg, setupCode} of this.requiredPackages) {
      packageCode += `webr::install("${pkg}")\nlibrary(${pkg})\n`;
      if (setupCode) packageCode += `${setupCode}\n`;
    }
    return packageCode + code;
  };
}

// Package loading and setup blocks
Blockly.defineBlocksWithJsonArray([
  {
    type: "load_sf_package",
    message0: "load sf package",
    previousStatement: null,
    nextStatement: null,
    colour: "#FF6B6B",
    tooltip: "Load the sf package for spatial operations"
  },
  {
    type: "load_packages",
    message0: "load packages: sf, dplyr, ggplot2",
    previousStatement: null,
    nextStatement: null,
    colour: "#FF6B6B",
    tooltip: " UNIQUE_ID: 3c8a2d9e-4f2b-4e8a-9f7d-2b1e5c6d7e8f Load common spatial analysis packages"
  },
  {
    type: "set_udunits_path",
    message0: "set udunits path for units package",
    previousStatement: null,
    nextStatement: null,
    colour: "#FF6B6B",
    tooltip: "Set environment variable for units package"
  }
]);

// Geometry blocks configured as value blocks
Blockly.defineBlocksWithJsonArray([
  {
    type: "st_centroid",
    message0: "centroid of %1",
    args0: [{ type: "input_value", name: "GEOM", check: ["Geometry", "sf"] }],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Calculate centroids of geometries",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/geos_unary"
  },
  {
    type: "st_transform",
    message0: "transform %1 to CRS %2",
    args0: [
      { type: "input_value", name: "GEOM", check: ["Geometry", "sf"] },
      { type: "input_value", name: "CRS", check: ["Number", "Text"] }
    ],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Transform coordinate reference system"
  },
  {
    type: "st_buffer",
    message0: "buffer %1 by %2",
    args0: [
      { type: "input_value", name: "GEOM", check: ["Geometry", "sf"] },
      { type: "input_value", name: "DISTANCE", check: "Number" }
    ],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create buffer around geometries",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/geos_unary"
  },
  {
    type: "st_coords",
    message0: "coordinates of %1",
    args0: [{ type: "input_value", name: "GEOM", check: ["Geometry", "sf"] }],
    output: "Array",
    colour: "#4DD0E1",
    tooltip: "Extract coordinates from geometry using st_coordinates()"
  },
  {
    type: "st_point",
    message0: "point (%1, %2)",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" }
    ],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create a point geometry using st_point()"
  },
  {
    type: "st_linestring",
    message0: "linestring from %1",
    args0: [{ type: "input_value", name: "MATRIX", check: ["Array", "Matrix"] }],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create a linestring from a matrix using st_linestring()"
  },
  {
    type: "st_polygon",
    message0: "polygon from %1",
    args0: [{ type: "input_value", name: "MATRIX", check: ["Array", "Matrix"] }],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create a polygon from coordinates using st_polygon()"
  },
  {
    type: "st_multipolygon",
    message0: "multipolygon from %1",
    args0: [{ type: "input_value", name: "LIST", check: "Array" }],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create a multipolygon from a list of polygons using st_multipolygon()"
  },
  {
    type: "st_distance",
    message0: "distance %1 to %2",
    args0: [
      { type: "input_value", name: "GEOM1", check: ["Geometry", "sf"] },
      { type: "input_value", name: "GEOM2", check: ["Geometry", "sf"] }
    ],
    output: "Number",
    colour: "#4DD0E1",
    tooltip: "Calculate distance between geometries using st_distance()"
  },
  {
    type: "st_area",
    message0: "area of %1",
    args0: [{ type: "input_value", name: "GEOM", check: ["Geometry", "sf"] }],
    output: "Number",
    colour: "#4DD0E1",
    tooltip: "Calculate area using st_area()"
  },
  {
    type: "st_length",
    message0: "length of %1",
    args0: [{ type: "input_value", name: "GEOM", check: ["Geometry", "sf"] }],
    output: "Number",
    colour: "#4DD0E1",
    tooltip: "Calculate perimeter/length using st_length()"
  },
  {
    type: "st_bbox",
    message0: "bbox of %1",
    args0: [{ type: "input_value", name: "GEOM", check: ["Geometry", "sf"] }],
    output: "Array",
    colour: "#4DD0E1",
    tooltip: "Get bounding box using st_bbox()"
  },
  {
    type: "st_crs",
    message0: "CRS of %1",
    args0: [{ type: "input_value", name: "GEOM", check: ["Geometry", "sf"] }],
    output: "Text",
    colour: "#4DD0E1",
    tooltip: "Get coordinate reference system info using st_crs()"
  },
  {
    type: "st_geometry_type",
    message0: "type of %1",
    args0: [{ type: "input_value", name: "GEOM", check: ["Geometry", "sf"] }],
    output: "Text",
    colour: "#4DD0E1",
    tooltip: "Get geometry type using st_geometry_type()"
  },
  {
    type: "st_intersection",
    message0: "intersection of %1 and %2",
    args0: [
      { type: "input_value", name: "GEOM1", check: ["Geometry", "sf"] },
      { type: "input_value", name: "GEOM2", check: ["Geometry", "sf"] }
    ],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Find intersection of two geometries"
  },
  {
    type: "st_union",
    message0: "union of %1 and %2",
    args0: [
      { type: "input_value", name: "GEOM1", check: ["Geometry", "sf"] },
      { type: "input_value", name: "GEOM2", check: ["Geometry", "sf"] }
    ],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create union of two geometries"
  },
  {
    type: "st_difference",
    message0: "difference of %1 and %2",
    args0: [
      { type: "input_value", name: "GEOM1", check: ["Geometry", "sf"] },
      { type: "input_value", name: "GEOM2", check: ["Geometry", "sf"] }
    ],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Find geometric difference"
  },
  {
    type: "st_intersects",
    message0: "%1 intersects %2",
    args0: [
      { type: "input_value", name: "GEOM1", check: ["Geometry", "sf"] },
      { type: "input_value", name: "GEOM2", check: ["Geometry", "sf"] }
    ],
    output: "Boolean",
    colour: "#4DD0E1",
    tooltip: "Test if geometries intersect"
  },
  {
    type: "st_contains",
    message0: "%1 contains %2",
    args0: [
      { type: "input_value", name: "GEOM1", check: ["Geometry", "sf"] },
      { type: "input_value", name: "GEOM2", check: ["Geometry", "sf"] }
    ],
    output: "Boolean",
    colour: "#4DD0E1",
    tooltip: "Test if first geometry contains second"
  },
  {
    type: "st_within",
    message0: "%1 within %2",
    args0: [
      { type: "input_value", name: "GEOM1", check: ["Geometry", "sf"] },
      { type: "input_value", name: "GEOM2", check: ["Geometry", "sf"] }
    ],
    output: "Boolean",
    colour: "#4DD0E1",
    tooltip: "Test if first geometry is within second"
  }
]);

// Additional input blocks
Blockly.defineBlocksWithJsonArray([
  {
    type: "variable_geometry",
    message0: "geometry variable %1",
    args0: [{ type: "field_input", name: "VAR_NAME", text: "my_geom" }],
    output: ["Geometry", "sf"],
    colour: "#81C784",
    tooltip: "Reference a geometry variable"
  },
  {
    type: "read_sf",
    message0: "read shapefile %1",
    args0: [{ type: "field_input", name: "FILEPATH", text: "data/shapefile.shp" }],
    output: ["Geometry", "sf"],
    colour: "#81C784",
    tooltip: "Read spatial data from file using st_read()"
  },
{
  type: "st_sfc",
  message0: "geometry collection %1 with CRS %2",
  args0: [
    { type: "input_value", name: "GEOM_LIST", check: "Array" },
    { type: "input_value", name: "CRS", check: ["Number", "Text"] }
  ],
  output: ["Geometry", "sf"],
  colour: "#4DD0E1",
  tooltip: "Create simple feature geometry collection with CRS"
},
  {
    type: "point_from_coords",
    message0: "point from coordinates (%1, %2)",
    args0: [
      { type: "field_number", name: "X", value: 0 },
      { type: "field_number", name: "Y", value: 0 }
    ],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create a point from literal coordinates"
  },
  {
    type: "linestring_from_coords",
    message0: "linestring from coordinates %1",
    args0: [{ type: "field_input", name: "COORDS", text: "0,0; 1,1; 2,0" }],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create linestring from coordinate pairs (x1,y1; x2,y2; ...)"
  },
  {
    type: "polygon_from_coords",
    message0: "polygon from coordinates %1",
    args0: [{ type: "field_input", name: "COORDS", text: "0,0; 1,0; 1,1; 0,1; 0,0" }],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create polygon from coordinate pairs (must be closed)"
  },
  {
    type: "coord_array_builder",
    message0: "build coordinate array %1",
    args0: [{ type: "input_statement", name: "COORDS" }],
    output: ["Array", "Matrix"],
    colour: "#4DD0E1",
    tooltip: "Build a coordinate matrix from coordinate pairs",
  },
  {
    type: "coord_pair",
    message0: "coordinate pair (x: %1, y: %2)",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#4DD0E1",
    tooltip: "A coordinate pair for building coordinate arrays"
  },
  {
    type: "rbind_matrix",
    message0: "rbind matrices %1 and %2",
    args0: [
      { type: "input_value", name: "MATRIX1", check: ["Array", "Matrix"] },
      { type: "input_value", name: "MATRIX2", check: ["Array", "Matrix"] }
    ],
    output: "Matrix",
    colour: "#4DD0E1",
    tooltip: "Row-bind two matrices together"
  },
  {
    type: "create_matrix",
    message0: "create matrix from array %1 with %2 rows and %3 columns",
    args0: [
      { type: "input_value", name: "ARRAY", check: "Array" },
      { type: "field_number", name: "NROW", value: 2 },
      { type: "field_number", name: "NCOL", value: 2 }
    ],
    output: "Matrix",
    colour: "#4DD0E1",
    tooltip: "Create a matrix from an array with specified dimensions"
  },
  {
    type: "create_list",
    message0: "create list %1",
    args0: [{ type: "input_statement", name: "ITEMS" }],
    output: "Array",
    colour: "#4DD0E1",
    tooltip: "Create an R list from items",
  },
  {
    type: "list_item",
    message0: "item %1",
    args0: [{ type: "input_value", name: "VALUE", check: ["Geometry", "Array", "Matrix"] }],
    previousStatement: null,
    nextStatement: null,
    colour: "#4DD0E1",
    tooltip: "An item in a list"
  },
  {
    type: "geometry_from_wkt",
    message0: "geometry from WKT %1",
    args0: [{ type: "field_input", name: "WKT", text: "POINT(0 0)" }],
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create geometry from Well-Known Text (WKT)"
  },
  {
    type: "epsg_code",
    message0: "EPSG %1",
    args0: [{ type: "field_number", name: "CODE", value: 4326 }],
    output: ["Number", "Text"],
    colour: "#4DD0E1",
    tooltip: "EPSG coordinate reference system code"
  },
  {
    type: "crs_string",
    message0: "CRS %1",
    args0: [{ type: "field_input", name: "CRS", text: "+proj=longlat +datum=WGS84" }],
    output: "Text",
    colour: "#4DD0E1",
    tooltip: "CRS as proj4 string"
  },
  {
    type: "coord_array_container",
    message0: "add coordinates %1 %2",
    args0: [
      { type: "input_dummy" },
      { type: "input_statement", name: "STACK" }
    ],
    colour: "#4DD0E1",
    tooltip: "Container for coordinate pairs"
  },
  {
    type: "list_container",
    message0: "add items %1 %2",
    args0: [
      { type: "input_dummy" },
      { type: "input_statement", name: "STACK" }
    ],
    colour: "#4DD0E1",
    tooltip: "Container for list items"
  },
  {
    type: "r_matrix",
    message0: "matrix( %1 , nrow = %2 , ncol = %3 , byrow = %4 )",
    args0: [
      { type: "input_value", name: "DATA", check: "Array" },
      { type: "field_number", name: "NROW", value: 1 },
      { type: "field_number", name: "NCOL", value: 2 },
      { type: "field_checkbox", name: "BYROW", checked: true }
    ],
    output: "Matrix",
    colour: "#FFAB91",
    tooltip: "Create R matrix"
  },
  {
    type: "r_vector",
    message0: "c( %1 )",
    args0: [{ type: "field_input", name: "VALUES", text: "1, 2, 3" }],
    output: "Array",
    colour: "#FFAB91",
    tooltip: "Create R vector"
  },
  {
    type: "r_list",
    message0: "list( %1 )",
    args0: [{ type: "input_value", name: "ITEMS", check: "Array" }],
    output: "Array",
    colour: "#FFAB91",
    tooltip: "Create R list"
  }
]);

// Mutators
const coordArrayMutator = {
  itemCount_: 1,
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    const items = parseInt(xmlElement.getAttribute('items'), 10) || 1;
    this.updateShape_(items);
  },
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('coord_array_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('coord_pair');
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
      if (itemBlock.type === 'coord_pair') {
        connections.push(itemBlock);
      }
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    this.updateShape_(connections.length);
    const input = this.getInput('COORDS');
    if (input && connections.length > 0) {
      input.connection.setShadowDom(null);
      input.connection.connect(connections[0].previousConnection);
    }
  },
  updateShape_: function(itemCount) {
    this.itemCount_ = Math.max(1, itemCount);
    const input = this.getInput('COORDS');
    if (!input) {
      this.appendStatementInput('COORDS')
          .setCheck('coord_pair');
    }
  }
};

const listMutator = {
  itemCount_: 1,
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    const items = parseInt(xmlElement.getAttribute('items'), 10) || 1;
    this.updateShape_(items);
  },
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('list_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('list_item');
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
      if (itemBlock.type === 'list_item') {
        connections.push(itemBlock);
      }
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    this.updateShape_(connections.length);
    const input = this.getInput('ITEMS');
    if (input && connections.length > 0) {
      input.connection.setShadowDom(null);
      input.connection.connect(connections[0].previousConnection);
    }
  },
  updateShape_: function(itemCount) {
    this.itemCount_ = Math.max(1, itemCount);
    const input = this.getInput('ITEMS');
    if (!input) {
      this.appendStatementInput('ITEMS')
          .setCheck('list_item');
    }
  }
};

Blockly.Extensions.registerMutator('coord_array_mutator', coordArrayMutator, null, ['coord_pair']);
Blockly.Extensions.registerMutator('list_mutator', listMutator, null, ['list_item']);


Blockly.Generator.R.forBlock["st_centroid"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom = generator.valueToCode(block, 'GEOM', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_centroid(${geom})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_transform"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom = generator.valueToCode(block, 'GEOM', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const crs = generator.valueToCode(block, 'CRS', Blockly.Generator.R.ORDER_NONE) || '4326';
  const code = `st_transform(${geom}, ${crs})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_buffer"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom = generator.valueToCode(block, 'GEOM', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const distance = generator.valueToCode(block, 'DISTANCE', Blockly.Generator.R.ORDER_NONE) || '0';
  const code = `st_buffer(${geom}, ${distance})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_coords"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom = generator.valueToCode(block, 'GEOM', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_coordinates(${geom})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_point"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const x = generator.valueToCode(block, 'X', Blockly.Generator.R.ORDER_NONE) || '0';
  const y = generator.valueToCode(block, 'Y', Blockly.Generator.R.ORDER_NONE) || '0';
  const code = `st_point(c(${x}, ${y}))`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_linestring"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const matrix = generator.valueToCode(block, 'MATRIX', Blockly.Generator.R.ORDER_NONE) || 'matrix(c(0,0), nrow=1)';
  const code = `st_linestring(${matrix})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_polygon"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const matrix = generator.valueToCode(block, 'MATRIX', Blockly.Generator.R.ORDER_NONE) || 'matrix(c(0,0,1,0,1,1,0,1,0,0), ncol=2)';
  const code = `st_polygon(list(${matrix}))`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_multipolygon"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const list = generator.valueToCode(block, 'LIST', Blockly.Generator.R.ORDER_NONE) || 'list(matrix(c(0,0,1,0,1,1,0,1,0,0), ncol=2))';
  const code = `st_multipolygon(${list})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_distance"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom1 = generator.valueToCode(block, 'GEOM1', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const geom2 = generator.valueToCode(block, 'GEOM2', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_distance(${geom1}, ${geom2})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_area"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom = generator.valueToCode(block, 'GEOM', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_area(${geom})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_length"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom = generator.valueToCode(block, 'GEOM', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_length(${geom})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_bbox"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom = generator.valueToCode(block, 'GEOM', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_bbox(${geom})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_crs"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom = generator.valueToCode(block, 'GEOM', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_crs(${geom})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_geometry_type"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom = generator.valueToCode(block, 'GEOM', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_geometry_type(${geom})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_intersection"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom1 = generator.valueToCode(block, 'GEOM1', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const geom2 = generator.valueToCode(block, 'GEOM2', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_intersection(${geom1}, ${geom2})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_union"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom1 = generator.valueToCode(block, 'GEOM1', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const geom2 = generator.valueToCode(block, 'GEOM2', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_union(${geom1}, ${geom2})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_difference"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom1 = generator.valueToCode(block, 'GEOM1', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const geom2 = generator.valueToCode(block, 'GEOM2', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_difference(${geom1}, ${geom2})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_intersects"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom1 = generator.valueToCode(block, 'GEOM1', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const geom2 = generator.valueToCode(block, 'GEOM2', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_intersects(${geom1}, ${geom2})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_contains"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom1 = generator.valueToCode(block, 'GEOM1', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const geom2 = generator.valueToCode(block, 'GEOM2', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `st_contains(${geom1}, ${geom2})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_within"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geom1 = generator.valueToCode(block, 'GEOM1', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const geom2 = generator.valueToCode(block, 'GEOM2', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  const code = `as.logical(st_within(${geom1}, ${geom2}))`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};
Blockly.Generator.R.forBlock["variable_geometry"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const varName = block.getFieldValue('VAR_NAME');
  return [varName, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["st_sfc"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geomList = generator.valueToCode(block, 'GEOM_LIST', Blockly.Generator.R.ORDER_NONE) || 'list()';
  const code = `st_sfc(${geomList})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["epsg_code"] = function(block, generator) {
  const code = block.getFieldValue('CODE');
  return [code.toString(), Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["crs_string"] = function(block, generator) {
  const crs = block.getFieldValue('CRS');
  return [`"${crs}"`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["point_from_coords"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  const code = `st_point(c(${x}, ${y}))`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["linestring_from_coords"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const coords = block.getFieldValue('COORDS');
  try {
    const coordPairs = coords.split(';').map(pair => {
      const [x, y] = pair.trim().split(',');
      return `c(${x.trim()}, ${y.trim()})`;
    });
    const code = `st_linestring(rbind(${coordPairs.join(', ')}))`;
    return [code, Blockly.Generator.R.ORDER_ATOMIC];
  } catch (e) {
    return [`st_linestring(rbind(c(0, 0), c(1, 1)))`, Blockly.Generator.R.ORDER_ATOMIC];
  }
};

Blockly.Generator.R.forBlock["polygon_from_coords"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const coords = block.getFieldValue('COORDS');
  try {
    const coordPairs = coords.split(';').map(pair => {
      const [x, y] = pair.trim().split(',');
      return `c(${x.trim()}, ${y.trim()})`;
    });
    const code = `st_polygon(list(rbind(${coordPairs.join(', ')})))`;
    return [code, Blockly.Generator.R.ORDER_ATOMIC];
  } catch (e) {
    return [`st_polygon(list(rbind(c(0, 0), c(1, 0), c(1, 1), c(0, 1), c(0, 0))))`, Blockly.Generator.R.ORDER_ATOMIC];
  }
};

Blockly.Generator.R.forBlock["coord_array_builder"] = function(block, generator) {
  const coords = [];
  let itemBlock = block.getInputTargetBlock('COORDS');
  while (itemBlock) {
    if (itemBlock.type === 'coord_pair') {
      const x = generator.valueToCode(itemBlock, 'X', Blockly.Generator.R.ORDER_ATOMIC) || '0';
      const y = generator.valueToCode(itemBlock, 'Y', Blockly.Generator.R.ORDER_ATOMIC) || '0';
      coords.push(`c(${x}, ${y})`);
    }
    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
  }
  return [`rbind(${coords.length > 0 ? coords.join(', ') : 'c(0, 0)'})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["coord_pair"] = function(block, generator) {
  const x = generator.valueToCode(block, 'X', Blockly.Generator.R.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Blockly.Generator.R.ORDER_ATOMIC) || '0';
  return [`c(${x}, ${y})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["rbind_matrix"] = function(block, generator) {
  const matrix1 = generator.valueToCode(block, 'MATRIX1', Blockly.Generator.R.ORDER_NONE) || 'matrix(c(0,0), nrow=1)';
  const matrix2 = generator.valueToCode(block, 'MATRIX2', Blockly.Generator.R.ORDER_NONE) || 'matrix(c(0,0), nrow=1)';
  return [`rbind(${matrix1}, ${matrix2})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["create_matrix"] = function(block, generator) {
  const array = generator.valueToCode(block, 'ARRAY', Blockly.Generator.R.ORDER_NONE) || 'c(0,0)';
  const nrow = block.getFieldValue('NROW') || 2;
  const ncol = block.getFieldValue('NCOL') || 2;
  return [`matrix(${array}, nrow=${nrow}, ncol=${ncol})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["create_list"] = function(block, generator) {
  const items = [];
  let itemBlock = block.getInputTargetBlock('ITEMS');
  while (itemBlock) {
    if (itemBlock.type === 'list_item') {
      const value = generator.valueToCode(itemBlock, 'VALUE', Blockly.Generator.R.ORDER_NONE) || 'NULL';
      items.push(value);
    }
    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
  }
  return [`list(${items.length > 0 ? items.join(', ') : 'NULL'})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["list_item"] = function(block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Blockly.Generator.R.ORDER_NONE) || 'NULL';
  return [value, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["geometry_from_wkt"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const wkt = block.getFieldValue('WKT');
  return [`st_as_sfc("${wkt}")`, Blockly.Generator.R.ORDER_ATOMIC];
};
Blockly.Generator.R.forBlock["st_sfc"] = function(block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const geomList = generator.valueToCode(block, 'GEOM_LIST', Blockly.Generator.R.ORDER_NONE) || 'list()';
  const crs = generator.valueToCode(block, 'CRS', Blockly.Generator.R.ORDER_NONE) || '4326';
  const code = `st_sfc(${geomList}, crs=${crs})`;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};