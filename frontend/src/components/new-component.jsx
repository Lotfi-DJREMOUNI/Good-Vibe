"use client";
import React from "react";

function NewComponent({ onClick, buttonText }) {
  return (
    <button
      onClick={onClick}
      className="inline-block mt-4 bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600"
    >
      {buttonText}
    </button>
  );
}

function NewComponentStory() {
  const checkMessage = () => {
    console.log("Button clicked");
  };

  return (
    <div className="p-4">
      <NewComponent onClick={checkMessage} buttonText="alors?" />
    </div>
  );
}

export default NewComponent;