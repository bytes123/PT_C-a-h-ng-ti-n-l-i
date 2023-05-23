import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useAdminNotification() {
  const [isAdminNotificationActive, setIsAdminNotificationActive] =
    useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAdminNotificationActive(false);
  }, [location.pathname]);

  const handleCloseNotification = () => {
    setIsAdminNotificationActive(false);
  };

  const handleAdminNotification = (hidden) => {
    setIsAdminNotificationActive(!isAdminNotificationActive);
    hidden();
  };

  return [
    isAdminNotificationActive,
    handleAdminNotification,
    handleCloseNotification,
  ];
}
