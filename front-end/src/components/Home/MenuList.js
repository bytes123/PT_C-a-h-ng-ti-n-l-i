import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function MenuList({ data }) {
  const location = useLocation();
  const currentLink = location.pathname;
  const { menuid } = useParams();
  return (
    <div className="menu_list-wrapper">
      <ul className=" menu_list flex justify-center bg-red-500">
        {data && data.length
          ? data.map((item) => {
              return (
                <li
                  className={`menu_item mx-4 ${
                    menuid == item.id ? "active" : ""
                  }`}
                  key={item.id}
                >
                  <Link to={item.name} className="menu_item-link uppercase">
                    {item.name}
                  </Link>
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}
