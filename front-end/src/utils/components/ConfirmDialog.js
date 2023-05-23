import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Modal from "./Modal";

export default function ConfirmDialog({
  active,
  onClose,
  onConfirm,
  header,
  content,
}) {
  return active ? (
    <Modal active={active} className="top-0 flex items-center justify-center">
      <div className="dialog_wrapper text-center bg-white p-8">
        <div className="confirm-icon inline-block mb-5">
          <RiErrorWarningLine className="text-[10rem] text-rose-400" />
        </div>
        <div className="confirm-title text-[2rem] ">
          <p className="font-bold">{header}</p>
        </div>
        <div className="confirm-warning mb-10">
          <p className="opacity-80 text-lg">{content}</p>
        </div>
        <div className="wrapper">
          <button className="cancel-btn" onClick={onClose}>
            Thoát ngay
          </button>
          <button className="delete-btn ml-5" onClick={onConfirm}>
            Đồng ý
          </button>
        </div>
      </div>
    </Modal>
  ) : (
    ""
  );
}
