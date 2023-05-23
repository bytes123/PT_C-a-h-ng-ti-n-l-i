import React, { useState } from "react";

export default function usePickSection() {
  const [activeIndexSection, setActiveIndexSection] = useState(0);

  const handleActiveIndexSection = (index) => {
    setActiveIndexSection(index);
  };

  return { activeIndexSection, handleActiveIndexSection };
}
