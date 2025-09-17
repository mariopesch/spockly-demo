import React from "react";

const GenerateButton = ({ onClick, label = "" }) => {
  return (
    <button
      onClick={onClick}
      style={{
        margin: "10px",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      {label}
    </button>
  );
};

export default GenerateButton;
// This component is a button that triggers the code generation process.
// It accepts an onClick prop which is a function that will be called when the button is clicked.
// The button has some basic styling applied to it for better appearance.
// The button's text is "Generate Python Code", indicating its purpose.
// The button is styled with a blue background, white text, and rounded corners.
// The button also has some margin and padding for spacing.
