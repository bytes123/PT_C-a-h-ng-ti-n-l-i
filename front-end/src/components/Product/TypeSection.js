import React from "react";

export default function TypeSection({ children, className }) {
  return (
    <div className={`${className} type-section rounded-2xl`}>{children}</div>
  );
}
