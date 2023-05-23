import React from "react";

export default function usePriceRange() {
  const [range, setRange] = React.useState([30, 100]);
  function handleChange(event, newValue) {
    if (range[0] < range[1]) {
      setRange(newValue);
    } else {
      setRange([range[0] - 1, range[1]]);
    }
  }

  return {
    range,
    handleChange,
  };
}
