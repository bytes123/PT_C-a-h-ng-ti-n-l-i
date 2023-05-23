import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useMobileSubMenu() {
  const [isOpenMobileSubMenu, setIsOpenMobileSubMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpenMobileSubMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 767) {
        setIsOpenMobileSubMenu(false);
      }
    });
  });

  return [isOpenMobileSubMenu, setIsOpenMobileSubMenu];
}
