import React, { useEffect } from "react";
import { ReactComponent as StarBucksIcon } from "../../assets/icons/starbucks.svg";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { sideBarList } from "../../static/AdminData";

export default function MainSideBar({ isBarActive, onBarActive }) {
  let navigate = useNavigate();
  const location = useLocation();
  console.log(isBarActive);
  return (
    <div
      className={`sidebar overflow-y-auto p-4  top-0 bottom-0 z-[999] bg-white fixed ${
        isBarActive ? "active" : ""
      }`}
    >
      <div
        className="sidebar_close-wrapper hv p-3 absolute right-4 top-4"
        onClick={onBarActive}
      >
        <AiOutlineCloseCircle className="sidebar_close-ico block cursor-pointer text-xl header_bar-color  text-red-300 text-4xl" />
      </div>
      <div
        className="sidebar_icon  cursor-pointer mb-12"
        onClick={() => navigate("/")}
      >
        <div className="flex justify-center items-center">
          <img
            src="http://localhost:8000/resources/images/kfc2.png"
            className="w-[100px]"
            alt=""
          />
        </div>
      </div>
      {sideBarList.map((item, index) => (
        <ul className="sidebar-list">
          <li className="sidebar-item py-6" key={item.key}>
            <h2 className="text-2xl opacity-40">{item.text}</h2>
            <ul className="sidebar_sub-list mt-5">
              {item.list.map((item) => (
                <li
                  key={item.key}
                  className={`sidebar_sub-item rounded-lg m-4 ${
                    location.pathname == "/admin/" + item.link
                      ? "bg-red-500 text-white active"
                      : ""
                  }`}
                >
                  <Link
                    to={"/admin/" + item.link}
                    className="flex p-5 items-center text-xl  "
                  >
                    <span>{item.icon}</span>
                    <span className="ml-5">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  );
}
