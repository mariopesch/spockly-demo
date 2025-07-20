import * as Blockly from "blockly";

export const lightTheme = Blockly.Theme.defineTheme('lightTheme', {
  base: Blockly.Themes.Classic,
  blockStyles: {
    logic_blocks: { colourPrimary: "#4caf50" },
    loop_blocks: { colourPrimary: "#ff9800" },
    math_blocks: { colourPrimary: "#2196f3" },
  },
  categoryStyles: {
    logic_category: { colour: "#4caf50" },
    loop_category: { colour: "#ff9800" },
    math_category: { colour: "#2196f3" },
  },
  componentStyles: {
    workspaceBackgroundColour: "#44A1A0",
    toolboxBackgroundColour: "#44A1A0",
    toolboxForegroundColour: "#FFFFFA",
    flyoutBackgroundColour: "#eeeeee",
    flyoutForegroundColour: "#FFFFFA",
    scrollbarColour: "#FFFFFA",
    insertionMarkerColour: "#000000",
    insertionMarkerOpacity: 0.3,
    trashcanColour: "#FFFFFA",
  },
});

export const darkTheme = Blockly.Theme.defineTheme('darkTheme', {
  base: Blockly.Themes.Classic,
  fontStyle: {
   'weight': 'bold',
   'size': 12,
  },
  blockStyles: {
    logic_blocks: { colourPrimary: "#81c784" },
    loop_blocks: { colourPrimary: "#ffb74d" },
    math_blocks: { colourPrimary: "#64b5f6" },
  },
  categoryStyles: {
    logic_category: { colour: "#81c784" },
    loop_category: { colour: "#ffb74d" },
    math_category: { colour: "#64b5f6" },
  },
  componentStyles: {
    workspaceBackgroundColour: "#1f1547",
    toolboxBackgroundColour: "#1f1547",
    toolboxForegroundColour: "#FFFFFA",
    flyoutBackgroundColour: "#4a4a4a",
    flyoutForegroundColour: "#FFFFFA",
    scrollbarColour: "#888888",
    insertionMarkerColour: "#FFFFFA",
    insertionMarkerOpacity: 0.4,
  },
});
