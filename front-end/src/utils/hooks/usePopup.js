import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePopup() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsPopupActive(false);
  }, [location.pathname]);

  const handleClosePopup = () => {
    setIsPopupActive(false);
  };

  const handlePopup = () => {
    setIsPopupActive(!isPopupActive);
  };

  return [isPopupActive, handlePopup, handleClosePopup];
}
