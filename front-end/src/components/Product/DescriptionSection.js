import React from "react";
import { Markup } from "interweave";
export default function DescriptionSection({
  className,
  description,
  markupClassName = "block",
}) {
  return (
    <div className={`product_description-wrapper mt-20 ${className}`}>
      <Markup content={description} className={`${markupClassName}`} />
    </div>
  );
}
