import React from "react";

const TutorialHow = () => (
  <div>
    <h1>How to Use SPOCKLY</h1>
    <p>
      Using SPOCKLY is simple and intuitive. Here's how to get started:
    </p>
    <ol>
      <li>
        <strong>Open the Editor:</strong> Click on "SPOCKLY" in the navigation bar to launch the SPOCKLY workspace.
      </li>
      <li>
        <strong>Drag & Drop Blocks:</strong> Select blocks from the left panel and drag them into the workspace to build your analysis.
      </li>
      <li>
        <strong>Load Data:</strong> Use a data block to load CSV files or connect to an API (e.g., openSenseMap).
      </li>
      <li>
        <strong>Process Data:</strong> Use blocks for filtering, aggregating, and transforming your data.
      </li>
      <li>
        <strong>Visualize:</strong> Add map or chart blocks to view your data results.
      </li>
      <li>
        <strong>Export:</strong> Download your plot or the generated R code to continue your work elsewhere.
      </li>
    </ol>
    <p>
      SPOCKLY runs entirely in the browser. No installation or account is needed. All computations happen on your device using WebAssembly.
    </p>
  </div>
);

export default TutorialHow;
