import React, { useEffect } from "react";
import { Spin } from "antd";

export default function Spinner({ isLoading = false }) {
  useEffect(() => {
    isLoading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isLoading]);

  return isLoading ? (
    <div className="wrapper fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center z-[9999] bg-slate-200 opacity-60">
      <Spin size="large" tip="Loading" />
    </div>
  ) : (
    ""
  );
}
