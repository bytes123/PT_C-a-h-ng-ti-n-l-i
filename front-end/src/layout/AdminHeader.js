import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import ToolTip from "../utils/components/ToolTip";
import Popup from "../utils/components/Popup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useAdminChat from "../utils/hooks/Admin/useAdminChat";
import useAdminNotification from "../utils/hooks/Admin/useAdminNotification";
import { useSelector, useDispatch } from "react-redux";
import MessageBar from "../components/Admin/MessageBar";
import {
  fetchMessageListAll,
  getChatList,
} from "../features/message/messageSlice";
import { isLogined, loginedUser } from "../utils/hooks/useAccessUser";
import usePopup from "../utils/hooks/usePopup";
import ProfileController from "../components/Header/ProfileController";
import HeaderUser from "../components/Header/HeaderUser";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function AdminHeader({ onBarActive, isBarActive }) {
  const dispatch = useDispatch();
  const [isPopupActive, handlePopup, handleClosePopup] = usePopup();

  const [isAdminChatActive, handleAdminChat, handleCloseAdminChat] =
    useAdminChat();
  const [
    isAdminNotificationActive,
    handleAdminNotification,
    handleCloseAdminNotification,
  ] = useAdminNotification();
  let fetch_chat_list = useSelector(getChatList);

  useEffect(() => {
    dispatch(fetchMessageListAll()).unwrap();
    socket.emit("join_room", "socket-web-app");
  }, []);

  return (
    <div className="admin_header-wrapper sticky top-0 z-50  px-8 pt-6">
      <div
        className={`admin_header  flex ${
          !isBarActive ? "justify-between " : "justify-end"
        } items-center`}
      >
        <div
          className={`admin_header-bar-icon hv p-3 ${
            isBarActive ? "hidden" : "block"
          }`}
          onClick={onBarActive}
        >
          <FaBars className="header_bar-icon block cursor-pointer text-xl header_bar-color  text-sky-300 text-3xl" />
        </div>

        <div className="admin_header-sidebar flex items-center">
          <div
            className="admin_header-message admin_tooltip cursor-pointer p-3 hv mr-5"
            onClick={() => handleAdminChat(handleCloseAdminNotification)}
          >
            <FiMessageSquare className="text-sky-300 text-[2.4rem]" />
            <ToolTip text="Chat" />
          </div>
          {/* POPUP CHAT */}

          <Popup
            className={`${
              isAdminChatActive
                ? "block fixed right-5 top-[60px] w-[300px] min-h-[500px]"
                : "hidden"
            }`}
          >
            <MessageBar
              handleClose={handleCloseAdminChat}
              list={fetch_chat_list}
            />
          </Popup>

          {/* ------ */}

          <div
            className="admin_header-notification admin_tooltip cursor-pointer p-3 hv mr-5"
            onClick={() => handleAdminNotification(handleCloseAdminChat)}
          >
            <IoMdNotificationsOutline className="text-sky-300 text-[2.8rem]" />
            <ToolTip text="Notification" />
          </div>
          {/* POPUP NOTIFICATION */}

          <Popup
            className={`${
              isAdminNotificationActive
                ? "block fixed right-5 top-[60px] w-[300px] min-h-[500px]"
                : "hidden"
            }`}
          >
            <div className="nottification-wrapper p-8">
              <div className="notfication-top flex items-center justify-between">
                <h2 className="text-3xl">Notification</h2>
                <div
                  className="close cursor-pointer"
                  onClick={handleCloseAdminNotification}
                >
                  <AiOutlineCloseCircle className="text-4xl text-gray-400 " />
                </div>
              </div>
              <div className="notfication-bottom">
                <ul className="notfication-list mt-12">
                  <li className="notfication-item flex items-center border-b-[1px] py-5">
                    <div className="notfication-avatar">
                      <img
                        className="rounded-full w-[36px]"
                        src="https://scontent.fsgn13-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=x3PhOYWAf78AX-hNfC9&_nc_ht=scontent.fsgn13-1.fna&oh=00_AfDiNTYPiIGzcmx_Wn1Y7xDQJL_lGjUd7e9eq-haCwJ2ag&oe=643D5DF8"
                        alt=""
                      />
                    </div>
                    <div className="mesage-detail ml-7">
                      <div className="notfication-name">
                        <p className="font-bold text-xl">Đen Vâu</p>
                      </div>
                      <div className="notfication-infor mt-2">
                        <p className="font-[300] text-xl">
                          Thành viên Ta vừa mới tham gia
                        </p>
                      </div>
                      {/* <div className="notfication-time">
                        <span className="font-[300]">9:08 AM</span>
                      </div> */}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Popup>

          {/* ------ */}
          <div
            className="admin_header-profile relative admin_tooltip mr-5 cursor-pointer flex items-center"
            onClick={handlePopup}
          >
            <ToolTip text="Profile" />
            <div className="admin_header-avatar mr-4">
              <img
                className="w-[30px] rounded-full"
                src={`http://localhost:8000/resources/avatar/${loginedUser?.avatar}`}
                alt=""
              />
            </div>
            <div className="admin_header-name mr-4 text-gray-500">
              <span>Hi,</span>{" "}
              <span className="font-bold">{loginedUser?.fullname}</span>
            </div>
            <div className="profile_more-icon text-gray-500">
              <BsChevronDown className="text-sm" />
            </div>
            <Popup
              className={`${
                isPopupActive
                  ? "block z-[1111]  absolute right-5 top-[100%] w-[200px] text-xl bg-teal-300 text-white flex flex-col justify-center"
                  : "hidden"
              }`}
            >
              <ProfileController user={loginedUser} isAdmin={true}>
                <HeaderUser className="w-[40px]" user={loginedUser} />
              </ProfileController>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
}
