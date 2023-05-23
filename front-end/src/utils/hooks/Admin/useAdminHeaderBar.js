import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useAdminHeaderBar() {
  const [isBarActive, setIsBarActive] = useState(false);
  const location = useLocation();

  //   useEffect(() => {
  //     document
  //       .querySelector(".header_bar-icon-wrapper")
  //       .classList.remove("inactive");
  //   }, []);

  useEffect(() => {
    setIsBarActive(false);
  }, [location.pathname]);

  return [isBarActive, setIsBarActive];
}
