import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import ItemList from "../Product/ItemList";

import useFilterProducts from "../../utils/hooks/useFilterProducts";
export default function FeatureProduct({
  type,
  title,
  gridCol,
  quantity,
  products,
}) {
  const { handleActiveCategory, activeCategory, categoryList } =
    useFilterProducts(type, quantity);

  return (
    <div className="my-20 px-10">
      <div>
        <div className="heading">
          <h1 className="text-5xl font-semibold font-quicksand">{title}</h1>
        </div>
        <div>
          <ul className="flex flex-wrap mt-5 font-quicksand">
            {categoryList
              ? categoryList.map((item, index) => (
                  <li
                    className={`category_item-select font-semibold mt-5 text-2xl cursor-pointer mr-5 ${
                      !activeCategory && index == 0
                        ? "text-brand"
                        : activeCategory == item.id
                        ? "text-brand"
                        : ""
                    }`}
                    onClick={() => handleActiveCategory(item.id)}
                  >
                    <p>{item.name}</p>
                  </li>
                ))
              : ""}
          </ul>
        </div>
        <ItemList
          className={"my-20"}
          currentItems={products}
          gridCol={gridCol}
        />
      </div>
    </div>
  );
}
