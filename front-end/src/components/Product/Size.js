import React from "react";

export default function Size({ size, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`mx-2 product_size-box ${active ? "active" : ""}`}
    >
      {size}
    </div>
  );
}
