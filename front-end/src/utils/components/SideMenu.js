import React from "react";
import { ReactComponent as StarBucksIcon } from "../../assets/icons/starbucks.svg";
import { useNavigate } from "react-router-dom";

export default function SideMenu({ className }) {
  let navigate = useNavigate();

  return (
    <div className={`sidemenu p-4 ${className}`}>
      <div
        className="sidemenu_icon inline-block cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="flex items-center">
          <StarBucksIcon className="inline" />
          <span className="ml-4 font-bold text-3xl">StarBuck</span>
        </div>
      </div>
    </div>
  );
}
