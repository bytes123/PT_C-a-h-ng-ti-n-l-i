import React from "react";
import { BiChevronDown } from "react-icons/bi";
import PopUp from "./Popup";
import { AiOutlineCheck } from "react-icons/ai";

export default function ClassifySection({
  className,
  text,
  data,
  onSwitch,
  activeIndex,
  activeDisplayIndex,
  activeSortIndex,
  onActiveDisplayIndex,
  onActiveSortIndex,
}) {
  return (
    <div
      className={`search_section-wrapper container  mx-auto flex items-center ${className}`}
    >
      {text ? (
        <div className="search_section-label">
          <span className="font-bold opacity-60 text-2xl">
            Hiện có <span className="text-lime-600 ">30</span> {text} dành cho
            bạn
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="search_section-show-wrapper flex">
        {data.map((item, index) => (
          <div
            className="seach_section-show  relative mx-3 cursor-pointer border flex items-center p-5 rounded-xl "
            onClick={() => onSwitch(index)}
          >
            {index == activeIndex ? (
              <PopUp
                className="absolute left-0 top-full mt-1 w-full"
                style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 4px 12px" }}
              >
                <div
                  className="value cursor-auto  font-semibold max-h-[300px] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.value.map((i, index) =>
                    item.key == "display" ? (
                      <div
                        key={i.key}
                        style={{ backgroundColor: "#fff" }}
                        className="cursor my-1 pointer relative filter_value  p-4"
                        onClick={() => onActiveDisplayIndex(i.key)}
                      >
                        {activeDisplayIndex == i.key ? (
                          <AiOutlineCheck
                            className="text-lime-900 hv mr-2 absolute"
                            style={{
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                        ) : (
                          ""
                        )}
                        <p className="ml-8">{i.value}</p>
                      </div>
                    ) : item.key == "sort" ? (
                      <div
                        key={i.key}
                        style={{ backgroundColor: "#fff" }}
                        className="cursor my-1 pointer relative filter_value  p-4"
                        onClick={() => onActiveSortIndex(i.key)}
                      >
                        {activeSortIndex == i.key ? (
                          <AiOutlineCheck
                            className="text-lime-900 hv mr-2 absolute"
                            style={{
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                        ) : (
                          ""
                        )}
                        <p className="ml-8">{i.value}</p>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </PopUp>
            ) : (
              ""
            )}
            {item.icon}
            <span className="mx-1">{item.content}</span>
            <span className="mx-1">{item.length ? item[0].value : ""}</span>
            <BiChevronDown className="mx-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
