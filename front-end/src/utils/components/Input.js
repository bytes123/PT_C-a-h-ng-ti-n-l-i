import React from "react";

export default function Input({
  className,
  type,
  value,
  name,
  onChangeDataInput,
}) {
  return (
    <input
      className={`block border w-full lg:max-w-[500px] p-3 rounded-lg outline-none   ${className}`}
      type={type}
      name={name}
      value={value}
      onChange={onChangeDataInput}
    />
  );
}
