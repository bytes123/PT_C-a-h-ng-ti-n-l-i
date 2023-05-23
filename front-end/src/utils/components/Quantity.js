import React from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export default function Quantity({
  disabled = false,
  value,
  handleChangeInputNumber,
  handleUpInputNumber,
  handleDownInputNumber,
  className = "",
}) {
  return (
    <div
      className={`${className} flex items-center max-w-[60px] rounded-md  border-active`}
    >
      <input
        type="number"
        className="outline-none text-center  text-brand border-none w-full rounded-md py-5 font-mono text-3xl"
        value={value}
        onChange={handleChangeInputNumber && handleChangeInputNumber}
      />
      {!disabled ? (
        <div className="up-down h-100 text-active d-flex flex-col justify-center cursor-pointer">
          <MdKeyboardArrowUp
            onClick={handleUpInputNumber}
            className="h-100 text-3xl"
          />
          <MdKeyboardArrowDown
            onClick={handleDownInputNumber}
            className="h-100 text-3xl"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
