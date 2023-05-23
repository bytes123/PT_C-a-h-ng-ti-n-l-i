import React from "react";
import { Link } from "react-router-dom";
import TypeSection from "../../components/Product/TypeSection";
import InputRange from "./InputRange";
import usePriceRange from "../../utils/hooks/usePriceRange";
import StarpointSection from "../Utils/StarpointSection";

export default function ClassifyItemSection({ className }) {
  const { range, handleChange } = usePriceRange();

  return (
    <div className={`items_classify ${className}`}>
      <TypeSection className="p-14 mb-5">
        <div className="category_classify">
          <div className="heading border-collapse">
            <h3 className="font-semibold text-4xl pb-10">Danh mục</h3>
          </div>
          <ul className="category_classify-list mt-10">
            <li className="category_classify-item ">
              <Link
                to="/thuc-don/ac"
                className=" flex items-center p-5 border rounded-md"
              >
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/category-1.svg"
                  className="w-[30px]"
                  alt=""
                />
                <span className="ml-7">Bánh ngọt</span>
                <div className="flex-1 flex justify-end">
                  <span className="rounded-full px-4 py-1 text-white   bg-green-600">
                    0
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </TypeSection>
      <TypeSection className="p-14 mb-5">
        <div className="price_classify">
          <div className="heading border-collapse">
            <h3 className="font-semibold text-4xl pb-10">Lọc theo giá</h3>
          </div>
          <InputRange range={range} handleChange={handleChange} />

          <div className="brand_filter mt-5 opacity-80">
            <h4 className="text-2xl  font-bold">Nhãn hàng</h4>

            <form className="my-2">
              <div className="form_section my-4 flex items-center">
                <input
                  type="checkbox"
                  className="w-[18px] h-[18px] cursor-pointer input-primary"
                  name=""
                  value="Pepsi"
                />
                <label className="ml-3 text-2xl"> Pepsi</label>
              </div>
            </form>
          </div>
          <button className="btn-primary font-semibold">Lọc ngay</button>
        </div>
      </TypeSection>
      <TypeSection className="p-14">
        <div className="new_product-classify">
          <div className="heading border-collapse">
            <h3 className="font-semibold text-4xl pb-10">Sản phẩm mới </h3>
          </div>
          <ul className="new_product-list py-10">
            <li className="new_product-item flex">
              <img
                className="w-[80px]"
                src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/thumbnail-3.jpg"
                alt=""
              />
              <div className="new_product-information ml-7 flex flex-col justify-center">
                <Link
                  className="text-3xl text-brand font-bold hover:text-link"
                  to="/thuc-don/banh-ngot/as"
                >
                  Nước thơm
                </Link>
                <p className="mt-3 text-2xl opacity-80 font-semibold">
                  2000000
                </p>
                <StarpointSection starpoint={3} className={"mt-0"} />
              </div>
            </li>
          </ul>
        </div>
      </TypeSection>
    </div>
  );
}
