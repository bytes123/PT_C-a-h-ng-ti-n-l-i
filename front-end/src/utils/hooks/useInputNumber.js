import React, { useState } from "react";

export default function useInputNumber() {
  const [inputNumberValue, setInputNumberValue] = useState(1);

  const handleChangeInputNumber = (e) => {
    if (e.target.value > 0) {
      setInputNumberValue(e.target.value);
    }
  };

  const handleUpInputNumber = () => {
    setInputNumberValue(inputNumberValue + 1);
  };

  const handleDownInputNumber = () => {
    if (inputNumberValue > 1) {
      setInputNumberValue(inputNumberValue - 1);
    }
  };

  return {
    inputNumberValue,
    handleChangeInputNumber,
    handleUpInputNumber,
    handleDownInputNumber,
  };
}
