import React, { useState, useEffect, useRef } from "react";
import "../../assets/styles/chat_page.scss";
import { io } from "socket.io-client";
import { AiTwotoneDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMessageListByUser,
  fetchMessagesByRoom,
  fetchContactUser,
  getMessages,
  getContactUser,
  createCustomerRoom,
} from "../../features/message/messageSlice";
import { loginedUser } from "../../utils/hooks/useAccessUser";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import Time from "../../utils/components/Time";

export default function ChatForm({
  list,
  user,
  onSendMsg,
  setActiveItem,
  onDropMsg,
  isSubmitting,
  setIsSubmitting,
  handleCreateRoom,
  activeItem,
}) {
  const [currentMsg, setCurrentMsg] = useState("");

  const [activeMsgList, setActiveMsgList] = useState();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeContactUser, setActiveContactUser] = useState({
    partner_fullname: "Admin",
  });
  const dispatch = useDispatch();
  const fetch_msg_list = useSelector(getMessages);
  let contact_user = useSelector(getContactUser);
  let msgListRef = useRef(null);

  const handleSendMsg = () => {
    onSendMsg(currentMsg);
  };

  const handleMsg = (e) => {
    setCurrentMsg(e.target.value);
  };

  const handleEmojiSelect = (e) => {
    setCurrentMsg(currentMsg + e.emoji);
  };

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleActiveItem = (item) => {
    console.log(activeContactUser);
    setActiveItem(item);
    setIsSubmitting(true);
    dispatch(fetchMessagesByRoom(item.roomid)).unwrap();
    dispatch(
      fetchContactUser({
        user_name: item.partner_username,
        room_id: item.roomid,
      })
    ).unwrap();
  };

  useEffect(() => {
    if (fetch_msg_list) {
      setActiveMsgList(fetch_msg_list);
    }
  }, [fetch_msg_list]);

  useEffect(() => {
    if (contact_user) {
      setActiveContactUser(contact_user);
    }
  }, [contact_user]);

  useEffect(() => {
    if (msgListRef && msgListRef.current) {
      msgListRef.current.scrollTop = msgListRef.current.scrollHeight;
    }
  }, [activeMsgList]);

  return (
    <div className="flex border-t border-t-slate-700">
      <div className="chat_list-wrapper px-4 bg-slate-800 min-h-screen  min-w-[250px]">
        <h3 className="mb-5 text-3xl text-yellow-100 font-semibold mt-5">
          Hòm thư hỗ trợ
        </h3>
        <div className="label_chat active mb-5 text-cyan-500 rounded-3xl p-3 text-center font-semibold bg-cyan-900">
          <p>Hộp thư</p>
        </div>
        <ul className="chat_list flex flex-col items-center">
          {list.length ? (
            list.map((item, index) => (
              <li
                key={item.roomid}
                className={`chat_item cursor-pointer w-100 p-5 mb-2 hover:bg-cyan-900 rounded-xl ${
                  activeItem && activeItem.roomid == item.roomid
                    ? "bg-cyan-900"
                    : ""
                }`}
                onClick={() => handleActiveItem(item)}
              >
                <div className="flex items-center">
                  <div className="img_wrapper  w-[20%]">
                    <img
                      className="rounded-full object-cover w-[50px] h-[40px]"
                      src={
                        item?.partner_avatar
                          ? `http://localhost:8000/resources/avatar/${item.partner_avatar}`
                          : "http://localhost:8000/resources/avatar/default.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="chat_label ml-5 text-white w-[80%]">
                    <p className="text-[1.2rem] font-semibold">
                      {item.partner_fullname ?? "Admin"}
                    </p>
                    <p className="text-[1rem] opacity-80 msg-body">
                      {item.lastest_user_name == user ? "Bạn:" : ""}{" "}
                      {item.lastest_msg}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : loginedUser &&
            loginedUser.type_user.some(
              (item) => item.type_user_id == "normal-customer"
            ) ? (
            <li
              className="chat_item cursor-pointer white font-bold text-5xl text-white w-[100px] flex justify-center p-2 mb-2 bg-cyan-900 rounded-xl"
              onClick={handleCreateRoom && handleCreateRoom}
            >
              <BiMessageRoundedAdd />
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="chat_box border-l border-l-slate-700 w-100 bg-slate-800">
        {activeContactUser && isSubmitting ? (
          <>
            <div className="chat_box-infor box-shadow flex items-center p-5">
              <img
                src={
                  activeContactUser?.avatar
                    ? `http://localhost:8000/resources/avatar/${activeContactUser.avatar}`
                    : "http://localhost:8000/resources/avatar/default.jpg"
                }
                className="w-[40px] rounded-full"
                alt=""
              />
              <div className="ml-3">
                <p className=" text-white text-semibold text-2xl ">
                  {activeContactUser?.user_name}
                </p>
                {activeContactUser?.online ? (
                  <div className="flex items-center mt-2">
                    <div className="w-[10px] h-[10px] rounded-full bg-green-700"></div>
                    <span className="text-xl ml-2 font-semibold text-brand">
                      Online
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center mt-2">
                    <div className="w-[10px] h-[10px] rounded-full bg-slate-700"></div>
                    <span className="text-xl ml-2 font-semibold text-slate-500">
                      Offline
                    </span>
                  </div>
                )}
              </div>

              {onDropMsg && (
                <div className="ml-auto" onClick={onDropMsg}>
                  <AiTwotoneDelete className="text-red-600 text-5xl cursor-pointer" />
                </div>
              )}
            </div>
            <div className="chat_box-main">
              <ul ref={msgListRef} className="list h-[80vh] overflow-y-auto">
                {activeMsgList &&
                  activeMsgList.map((item, index) => (
                    <li className="mb-5 p-5 relative" key={item.message_id}>
                      <div
                        className={`flex items-center ${
                          item.user_name == user ? "justify-end" : ""
                        }`}
                      >
                        {item.user_name == user ? (
                          ""
                        ) : (
                          <img
                            src={
                              item?.avatar
                                ? `http://localhost:8000/resources/avatar/${item.avatar}`
                                : "http://localhost:8000/resources/avatar/default.jpg"
                            }
                            className="w-[30px] h-[30px] rounded-full"
                            alt=""
                          />
                        )}
                        <p
                          className={` text-2xl ml-2 text-white px-4 py-2 ${
                            item.user_name == user
                              ? "bg-sky-500"
                              : "bg-slate-500"
                          } rounded-3xl`}
                        >
                          {item.body}
                        </p>
                        {item?.createdAt ? (
                          <Time
                            className={
                              "absolute bottom-[-6px] text-white text-sm font-semibold"
                            }
                            timestamp={item.createdAt}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
              <div className=" p-5  relative">
                <div className="bg-slate-700 rounded-md flex items-center">
                  <input
                    type="text"
                    className="w-100  p-5 bg-slate-700 outline-none text-xl font-semibold text-white"
                    onChange={handleMsg}
                    value={currentMsg}
                  />
                  <button
                    onClick={handleEmojiPickerToggle}
                    className="text-3xl"
                  >
                    😀
                  </button>

                  <button className="p-5" onClick={handleSendMsg}>
                    <RiSendPlaneFill className=" text-4xl text-slate-200" />
                  </button>
                </div>
                {showEmojiPicker && (
                  <div className="absolute right-[100px] bottom-[20px]">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="w-100 h-100 flex items-center justify-center">
            <p className="text-slate-100 text-semibold opacity-80 text-2xl">
              Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
            </p>
          </div>
        )}
      </div>
    </div>
    // <div>
    //   <div className="chat-header">
    //     <p>Nhắn tin với admin</p>
    //   </div>
    //   <div className="chat-body"></div>
    //   <div className="chat-footer">
    //     <input type="text" onChange={handleMsg} />
    //     <button className="btn-primary" onClick={sendMsg}>
    //       Gửi tin
    //     </button>
    //   </div>
    // </div>
  );
}
