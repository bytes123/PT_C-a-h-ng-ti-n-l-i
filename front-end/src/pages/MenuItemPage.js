import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuList from "../components/Home/MenuList";
import Banner1 from "../components/Banner/Banner1";
import ClassifySection from "../utils/components/ClassifySection";
import ItemList from "../components/Product/ItemList";

import { nanoid } from "nanoid";
import PaginatedItems from "../utils/components/PaginatedItems";
import usePagination from "../utils/hooks/usePagination";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import MainLoading from "../utils/components/MainLoading";
import useClassifySection from "../utils/hooks/useClassifySection";
import { ProductData } from "../static/Data";
import ClassifyItemSection from "../components/Product/ClassifyItemSection";
import useProducts from "../utils/hooks/useProducts";

export default function MenuItemPage() {
  const { menuid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const sortChildren = [
    {
      key: 1,
      value: "50",
    },
    {
      key: 2,
      value: "100",
    },
  ];

  const displayChildren = [
    {
      key: 1,
      value: "Danh mục",
    },
    {
      key: 2,
      value: "Giá: Từ thấp đến cao",
    },
    {
      key: 3,
      value: "Giá: Từ cao đến thấp",
    },
  ];

  const {
    handleSwitch,
    activeIndex,
    activeDisplayIndex,
    handleActiveDisplayIndex,
    activeSortIndex,
    handleActiveSortIndex,
    classifyMenu,
  } = useClassifySection(sortChildren, displayChildren);

  const [items, setItems] = useState([]);

  const { products } = useProducts();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const waitLoading = setTimeout(() => {
      setIsLoading(false);

      document.body.style.overflow = "auto";
    }, 3000);

    return () => clearTimeout(waitLoading);
  }, []);

  const [currentItems, pageCount, handlePageClick] = usePagination(products, 4);

  return (
    <>
      <MainLoading isLoading={isLoading} />
      <div className="menu_item-wrapper">
        <Banner1 />
        <MenuList data={ProductData} />

        <div className="lg:grid lg:grid-cols-4 lg:px-10">
          <div className="lg:col-span-3">
            <div className="mt-10">
              <ClassifySection
                className="justify-between"
                text="sản phẩm"
                activeIndex={activeIndex}
                data={classifyMenu}
                onSwitch={handleSwitch}
                activeDisplayIndex={activeDisplayIndex}
                onActiveDisplayIndex={handleActiveDisplayIndex}
                activeSortIndex={activeSortIndex}
                onActiveSortIndex={handleActiveSortIndex}
              />
            </div>
            <div className="container mx-auto py-10">
              <ItemList currentItems={currentItems} gridCol={4} />

              <PaginatedItems
                previousLabel={<BsArrowLeft />}
                nextLabel={<BsArrowRight />}
                items={items}
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
              <ClassifyItemSection className={" lg:hidden block"} />
            </div>
          </div>
          <ClassifyItemSection className={"py-10 lg:block hidden"} />
        </div>
      </div>
    </>
  );
}
