import React from "react";

export default function Popup({ children, className, style }) {
  return (
    <div className={` rounded  bg-white ${className} z-10`} style={style}>
      {children}
    </div>
  );
}
