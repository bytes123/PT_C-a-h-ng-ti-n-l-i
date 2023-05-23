import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useAdminChat() {
  const [isAdminChatActive, setIsAdminChatActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAdminChatActive(false);
  }, [location.pathname]);

  const handleCloseAdminChat = () => {
    setIsAdminChatActive(false);
  };

  const handleAdminChat = (hidden) => {
    setIsAdminChatActive(!isAdminChatActive);
    hidden();
  };

  return [isAdminChatActive, handleAdminChat, handleCloseAdminChat];
}
