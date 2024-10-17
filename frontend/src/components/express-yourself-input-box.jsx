"use client";
import React from "react";

function ExpressYourselfInputBox({ value, onChange, name }) {
  return (
    <textarea
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
      rows="4"
      value={value}
      onChange={onChange}
      placeholder="Exprimez-vous ici... mais gentiment !"
      name={name}
    ></textarea>
  );
}

function ExpressYourselfInputBoxStory() {
  const [message, setMessage] = React.useState("");

  return (
    <div>
      <ExpressYourselfInputBox
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name="message"
      />
    </div>
  );
}

export default ExpressYourselfInputBox;