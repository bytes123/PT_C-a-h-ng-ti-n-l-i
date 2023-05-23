import React from "react";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

export default function HeaderBarIcon({ active, onClick }) {
  return (
    <div
      className={`header_bar-icon-wrapper ${active ? "active" : "inactive"}`}
    >
      <FaBars
        onClick={onClick}
        className="header_bar-icon block cursor-pointer text-3xl opacity-70 header_bar-color lg:hidden"
      />
      <GrClose
        onClick={onClick}
        className="header_bar-icon header_bar-close block cursor-pointer text-xl header_bar-color lg:hidden"
      />
    </div>
  );
}
