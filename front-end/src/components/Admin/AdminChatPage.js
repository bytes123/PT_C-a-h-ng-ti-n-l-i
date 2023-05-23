import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import ChatForm from "../../components/Chat/ChatForm";
import {
  fetchMessagesByRoom,
  fetchMessageListAll,
  dropRoom,
  getChatList,
  fetchContactUser,
  getMessages,
} from "../../features/message/messageSlice";
import { loginedUser } from "../../utils/hooks/useAccessUser";
import { useParams, useLocation } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

export default function AdminChatPage() {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(null);
  const [activeItem, setActiveItem] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { room_id } = useParams();
  const [page, setPage] = useState("");
  const location = useLocation();
  const fetch_msg_list = useSelector(getMessages);
  let fetch_chat_list = useSelector(getChatList);

  useEffect(() => {
    if (room_id) {
      setIsSubmitting(true);
      dispatch(fetchMessagesByRoom(room_id)).unwrap();
      dispatch(
        fetchContactUser({
          user_name: user,
          room_id: room_id,
        })
      ).unwrap();
      setActiveItem({
        ...activeItem,
        roomid: room_id,
      });
    }
  }, [room_id, location, fetch_chat_list]);

  useEffect(() => {
    if (loginedUser) {
      if (activeItem && activeItem.roomid) {
        dispatch(
          fetchContactUser({
            user_name: loginedUser.user_name,
            room_id: activeItem.roomid,
          })
        ).unwrap();
      }

      setUser(loginedUser.user_name);
    }
  }, [loginedUser]);

  useEffect(() => {
    dispatch(fetchMessageListAll()).unwrap();
    socket.emit("join_room", "socket-web-app");
  }, [location]);

  useEffect(() => {
    socket.on("send_action", async () => {
      dispatch(fetchMessageListAll()).unwrap();
      if (activeItem && activeItem.roomid) {
        dispatch(fetchMessagesByRoom(activeItem.roomid)).unwrap();
      }
    });
    socket.on("receive_message", async (room) => {
      dispatch(fetchMessageListAll()).unwrap();
      dispatch(
        fetchContactUser({
          user_name: user,
          room_id: room,
        })
      ).unwrap();

      if (activeItem && room == activeItem.roomid) {
        dispatch(fetchMessagesByRoom(room)).unwrap();
      }
    });
  }, [socket, activeItem, location]);

  const handleActiveItem = (item) => {
    setActiveItem(item);
  };

  const sendMsg = async (currentMsg) => {
    if (currentMsg !== "") {
      const data = {
        room_id: activeItem.roomid,
        user_name: user,
        body: currentMsg,
      };

      await socket.emit("send_message", data);
      dispatch(fetchMessageListAll()).unwrap();
      await dispatch(fetchMessagesByRoom(data.room_id)).unwrap();
    }
  };

  const dropMsg = async () => {
    if (window.confirm("Bạn muốn xóa đoạn chat này ?")) {
      await dispatch(dropRoom(activeItem.roomid)).unwrap();
      await dispatch(fetchMessageListAll()).unwrap();
      await socket.emit("send_action");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!loginedUser) {
      setPage(
        <h1 className="font-semibold text-4xl p-10">Vui lòng đăng nhập</h1>
      );
      return;
    }

    if (
      loginedUser &&
      loginedUser.type_user.some(
        (item) => item.type_user_id == "admin" || item.type_user_id == "staff"
      )
    ) {
      setPage(
        <ChatForm
          socket={socket}
          list={fetch_chat_list}
          user={user}
          onSendMsg={sendMsg}
          activeItem={activeItem}
          setActiveItem={handleActiveItem}
          onDropMsg={dropMsg}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      );
    } else {
      setPage(
        <h1 className="font-semibold text-4xl text-center p-10">
          Bạn không đủ quyền để truy cập trang này
        </h1>
      );
    }
  }, [loginedUser, location, fetch_chat_list, activeItem]);

  return (
    <div className="">
      {" "}
      <ChatForm
        socket={socket}
        list={fetch_chat_list}
        user={user}
        onSendMsg={sendMsg}
        activeItem={activeItem}
        setActiveItem={handleActiveItem}
        onDropMsg={dropMsg}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
    </div>
  );
}
