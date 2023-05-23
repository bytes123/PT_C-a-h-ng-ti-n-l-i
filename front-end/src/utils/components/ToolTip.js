import React from "react";

export default function ToolTip({ text }) {
  return (
    <div className="wrapper">
      <span class="tooltiptext">{text}</span>
    </div>
  );
}
