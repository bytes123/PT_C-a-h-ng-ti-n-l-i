import React from "react";
import CloseModal from "./CloseModal";
export default function Modal({
  active,
  children,
  className,
  isClose = false,
  handleClose,
}) {
  return (
    <div
      className={`${
        active ? "modal-blur active" : "modal-blur"
      } ${className} z-[999]`}
    >
      {isClose ? <CloseModal handleClose={handleClose} /> : ""}
      {children}
    </div>
  );
}
