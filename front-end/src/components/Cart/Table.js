import React from "react";
import StarPointSection from "../../utils/components/StarpointSection";
import { BsTrash } from "react-icons/bs";
import {
  Table as MainTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Quantity from "../../utils/components/Quantity";
export default function Table({
  heading,
  list = [],
  tbClassName,
  theadClassName,
  thClassName,
  handleUpQuantity,
  handleDownQuantity,
  handleChangeInputNumber,
  handleCheckById,
  handleDeleteCart,
}) {
  return (
    <MainTable className={+" table"}>
      <Thead className={theadClassName}>
        <Tr>
          {heading.map((item, index) => (
            <Th
              className={`${
                index == 0
                  ? "rounded-l-3xl"
                  : index == heading.length - 1
                  ? "rounded-r-3xl"
                  : ""
              } ${thClassName} text-center`}
              key={item.id}
            >
              {item.title}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {list.map((item) => (
          <Tr className="p-5">
            <Td className="text-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckById(item.id)}
              />
            </Td>
            <Td className=" flex   m-10 items-center">
              <img
                className="w-[100px] rounded-xl  border-1"
                src={
                  item.image1 !== "default.jpg"
                    ? `http://localhost:8000/resources/product/${item.product_id}/${item.image1}`
                    : `http://localhost:8000/resources/product/${item.image1}`
                }
                alt=""
              />
              <section className="ml-5">
                <h3 className="text-3xl font-semibold">{item.name}</h3>
                <section className="mt-3">
                  <StarPointSection
                    className={"inline"}
                    starpoint={item.starpoint}
                  />
                  <span className="font-semibold ml-3 opacity-50">
                    ({item.starpoint}.0)
                  </span>
                </section>
              </section>
            </Td>
            <Td className="text-center">
              <span className="text-4xl font-bold text-gray-500">
                {item.newPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </Td>
            <Td className="text-brand ">
              <Quantity
                className="mx-auto"
                value={item.quantity}
                handleChangeInputNumber={(e) =>
                  handleChangeInputNumber(e.target.value, item.id)
                }
                handleUpInputNumber={() => handleUpQuantity(item.id)}
                handleDownInputNumber={() => handleDownQuantity(item.id)}
              />
            </Td>
            <Td className="text-center">
              <span className="text-3xl font-bold text-brand">
                {(item.newPrice * item.quantity).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </Td>
            <Td className="text-center">
              <button
                className="text-3xl hover:bg-red-500 p-5 rounded-xl hover:text-white transition-all"
                onClick={() => handleDeleteCart(item.id)}
              >
                <BsTrash className="opacity-60 " />
              </button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </MainTable>
  );
}
