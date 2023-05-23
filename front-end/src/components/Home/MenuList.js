import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function MenuList({ data }) {
  const location = useLocation();
  const currentLink = location.pathname;

  return (
    <div className="menu_list-wrapper">
      <ul className=" menu_list flex justify-center bg-green-500">
        {data.map((item) => {
          return (
            <li
              className={`menu_item mx-4 ${
                currentLink == item.link ? "active" : ""
              }`}
              key={item.key}
            >
              <Link to={item.link} className="menu_item-link uppercase">
                {item.value}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
