import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function SubMenuMobile({ onBack, active, items }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        active ? "header_submenu cursor-auto active " : "header_submenu"
      }`}
    >
      <div
        onClick={onBack}
        className="header_submenu-heading font-normal  py-2 cursor-pointer flex items-center  bg-gray-100 text-center"
      >
        <IoIosArrowBack className="w-6 h-6 ml-6" />
        <h2 className=" text-lg py-2 flex-1 text-[20px]">Menu</h2>
      </div>
      <ul className="header_submeu-list py-6">
        {items.map((item) => {
          return (
            <li key={item.key} className="header_submenu-item py-2">
              <Link
                className="header_submenu-link block px-6 text-[20px] font-normal capitalize"
                to={item.link}
              >
                {item.value}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
