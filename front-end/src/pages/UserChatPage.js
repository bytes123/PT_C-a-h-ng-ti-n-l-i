import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { nanoid } from "nanoid";
import ChatForm from "../components/Chat/ChatForm";
import {
  fetchMessageListByUser,
  fetchMessagesByRoom,
  getChatList,
  createCustomerRoom,
} from "../features/message/messageSlice";
import { loginedUser } from "../utils/hooks/useAccessUser";

const socket = io.connect("http://localhost:3001");

export default function UserChatPage() {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(loginedUser?.user_name);
  const [activeItem, setActiveItem] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let fetch_chat_list = useSelector(getChatList);

  useEffect(() => {
    console.log(fetch_chat_list);
  }, [fetch_chat_list]);

  useEffect(() => {
    socket.emit("join_room", "socket-web-app");
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchMessageListByUser(user)).unwrap();
    }
  }, [user]);

  useEffect(() => {
    socket.on("send_action", async () => {
      await dispatch(fetchMessageListByUser(user)).unwrap();
      setIsSubmitting(false);
    });
    socket.on("receive_message", async (room) => {
      if (user) {
        await dispatch(fetchMessageListByUser(user)).unwrap();
      }

      if (activeItem && room == activeItem.roomid) {
        await dispatch(fetchMessagesByRoom(room)).unwrap();
      }
    });
  }, [socket, activeItem]);

  const sendMsg = async (currentMsg) => {
    if (loginedUser) {
      if (currentMsg !== "") {
        const data = {
          room_id: activeItem.roomid,
          user_name: user,
          body: currentMsg,
        };

        await socket.emit("send_message", data);
        await dispatch(fetchMessageListByUser(user)).unwrap();
        await dispatch(fetchMessagesByRoom(data.room_id)).unwrap();
      }
    } else {
      window.location("/");
    }
  };

  const handleCreateRoom = async () => {
    await dispatch(createCustomerRoom()).unwrap();

    await dispatch(fetchMessageListByUser(user)).unwrap();
    await socket.emit("send_action");
  };

  return (
    <div className="">
      {user &&
      loginedUser.type_user.some(
        (item) => item.type_user_id == "normal-customer"
      ) ? (
        <ChatForm
          socket={socket}
          list={fetch_chat_list}
          user={user}
          onSendMsg={sendMsg}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          handleCreateRoom={handleCreateRoom}
        />
      ) : user && loginedUser?.type_user_id !== "normal-customer" ? (
        <h1 className="font-semibold text-4xl p-10">
          Trang tin nhắn này chỉ dành cho khách hàng
        </h1>
      ) : (
        <h1 className="font-semibold text-4xl p-10">Vui lòng đăng nhập</h1>
      )}
    </div>
  );
}
