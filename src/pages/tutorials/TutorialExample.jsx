import React from "react";

const TutorialExample = () => (
  <div>
    <h1>Example Use Case: Analyzing Temperature Data</h1>

    <p>
      In this tutorial, we explore real-world temperature data collected from SenseBox sensors. You will learn how to process, visualize, and analyze the data using SPOCKLY’s block-based interface.
    </p>

    <h2>1. Get the Data</h2>
    <p>
      Go to <a href="https://opensensemap.org" target="_blank" rel="noreferrer">openSenseMap</a> and search for a SenseBox near your location. Select a temperature sensor and export its data as CSV.
    </p>

    <h2>2. Load the Data</h2>
    <p>
      Use the <strong>Load CSV File</strong> block in SPOCKLY to load your exported file, e.g. <code>sensebox_temperature_data.csv</code>.
    </p>

    <h2>3. Prepare the Data</h2>
    <ul>
      <li>Convert the timestamp column (<code>createdAt</code>) to POSIXct using the relevant block.</li>
      <li>Extract the <strong>date</strong> and <strong>hour</strong> as new variables.</li>
    </ul>

    <h2>4. Aggregate the Data</h2>
    <ul>
      <li>Calculate the <strong>daily mean temperature</strong>.</li>
      <li>Calculate the <strong>hourly mean temperature</strong>.</li>
    </ul>

    <h2>5. Visualize</h2>
    <ul>
      <li>Plot the <strong>daily mean temperature</strong> as a line chart.</li>
      <li>Plot the <strong>average temperature by hour</strong> to explore daily cycles.</li>
    </ul>

    <h2>6. Model the Trend</h2>
    <p>
      Fit a simple <strong>linear regression model</strong> to the daily mean data and add a regression line to your plot.
    </p>

    <h2>7. Reflect</h2>
    <ul>
      <li>At what hour is it usually warmest or coldest?</li>
      <li>Does the temperature trend go up or down over the days?</li>
      <li>What environmental factors might explain the results?</li>
    </ul>

    <p>
      With SPOCKLY, each of these steps can be completed by connecting intuitive visual blocks — perfect for classroom use and self-paced learning.
    </p>
  </div>
);

export default TutorialExample;