import React from "react";
import { GrClose } from "react-icons/gr";

export default function CloseModal({ handleClose }) {
  return (
    <div
      className="absolute text-2xl border-slate-400 bg-white p-5 rounded-xl right-[60px] top-[100px] flex items-center cursor-pointer"
      onClick={handleClose}
    >
      <span className="mr-2">
        <GrClose />
      </span>
      <span>Đóng</span>
    </div>
  );
}
