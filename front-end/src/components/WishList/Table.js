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
  handleCheckById,
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
            <Td className=" flex justify-center  m-10 items-center">
              <img
                className="w-[100px] rounded-xl  border-1"
                src={item.image}
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
              <span className="text-4xl font-bold text-brand">
                {item.price}
              </span>
            </Td>

            <Td className="text-center">
              <button className="status-label rounded-xl p-4 px-8 cursor-auto">
                Còn hàng
              </button>
            </Td>

            <Td className="text-center">
              <button className="background-active text-white font-semibold p-3 rounded-xl">
                Thêm vào giỏ
              </button>
            </Td>

            <Td className="text-center">
              <button className="text-3xl">
                <BsTrash className="opacity-60" />
              </button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </MainTable>
  );
}
