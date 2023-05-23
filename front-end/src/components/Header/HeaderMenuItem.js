import React, { useEffect } from "react";
import { menuData } from "../../static/HeaderMenu";
import { path } from "../../static/Router";
import { Link } from "react-router-dom";
import { ProductData } from "../../static/Data";
export default function HeaderMenuItem({ items }) {
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  console.log(items);

  return items.length ? (
    <div className="header_menu-item" onClick={handleStopPropagation}>
      <ul className="menu_list">
        {items.map((item) => (
          <li className="menu_item" key={item.id}>
            <Link to={`thuc-don/${item.id}`} className="menu_item-title ">
              {item.name}
            </Link>
            <ul className="menu_list-children">
              {item.children &&
                item.children.map((children) => (
                  <li
                    className="menu_item-children font-quicksand"
                    key={children.id}
                  >
                    <Link
                      to={`thuc-don/${item.id}/${children.id}`}
                      className="menu_item-children-title"
                    >
                      {children.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    ""
  );
}
