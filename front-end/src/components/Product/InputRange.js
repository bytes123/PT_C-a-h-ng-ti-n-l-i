import React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

export default function InputRange({ range, handleChange }) {
  const fromValue = (range[0] * 1000000) / 100;
  const toValue = (range[1] * 1000000) / 100;

  return (
    <div className="mt-5">
      <Slider value={range} onChange={handleChange} />
      <div className="flex justify-between">
        <span>Từ: {fromValue}</span>
        <span>Đến: {toValue}</span>
      </div>
    </div>
  );
}
