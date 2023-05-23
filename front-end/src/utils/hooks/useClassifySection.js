import React, { useState } from "react";
import { BiGridAlt, BiSort } from "react-icons/bi";
export default function useClassifySection(displayChildren, sortChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [activeDisplayIndex, setActiveDisplayIndex] = useState();
  const [activeSortIndex, setActiveSortIndex] = useState();

  const classifyMenu = [
    {
      key: "display",
      icon: <BiGridAlt className="mx-1" />,
      content: "Hiển thị",
      value: displayChildren,
    },
    {
      key: "sort",
      icon: <BiSort className="mx-1" />,
      content: "Sắp xếp theo",
      value: sortChildren,
    },
  ];

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSwitch = (index) => {
    if (index == activeIndex) {
      handleClose();
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleActiveSortIndex = (index) => {
    setActiveSortIndex(index);
  };
  const handleActiveDisplayIndex = (index) => {
    setActiveDisplayIndex(index);
  };

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleSwitch,
    activeIndex,
    activeDisplayIndex,
    activeSortIndex,
    handleActiveDisplayIndex,
    handleActiveSortIndex,
    classifyMenu,
  };
}
