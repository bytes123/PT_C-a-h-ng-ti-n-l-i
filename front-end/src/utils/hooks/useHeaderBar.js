import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useHeaderBar() {
  const [isBarActive, setIsBarActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    isBarActive
      ? (document.body.style = "padding-right: 15.2px;overflow: hidden")
      : (document.body.style = "overflow: unset");

    return () => (document.body.style.overflow = "auto");
  }, [isBarActive]);

  useEffect(() => {
    document
      .querySelector(".header_bar-icon-wrapper")
      .classList.remove("inactive");
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 767) {
        setIsBarActive(false);
        document.body.style = "overflow: unset";
        document
          .querySelector(".header_bar-icon-wrapper")
          .classList.remove("inactive");
      }
    });
  });

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target.classList[0] === "modal-blur" &&
        e.target.classList[1] === "active"
      ) {
        setIsBarActive(false);
      }
    });
  });

  useEffect(() => {
    setIsBarActive(false);
  }, [location.pathname]);

  return [isBarActive, setIsBarActive];
}
