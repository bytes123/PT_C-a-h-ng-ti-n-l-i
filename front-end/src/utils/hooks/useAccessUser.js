import React from "react";
import Cookies from "js-cookie";

const handleLogIn = async (data) => {
  data.user.type_user = data.type_user;
  var inThirtySeconds = new Date(new Date().getTime() + 3000 * 1000);

  await Cookies.set("user", JSON.stringify(data.user), {
    expires: inThirtySeconds,
  });
  localStorage.setItem(
    "user_name",
    JSON.parse(JSON.stringify(data.user)).user_name
  );
  localStorage.setItem("expired_date", inThirtySeconds);
  window.location.href = "/";
};

const handleLogOut = async () => {
  if (Cookies.get("user")) {
    await Cookies.remove("user");
    window.location.href = "/";
  } else {
    window.location.href = "/";
  }
};

const isLogined = Cookies.get("user");

const expiredDate = localStorage.getItem("expired_date");

const loginedUser = isLogined && JSON.parse(Cookies.get("user"));

export { handleLogIn, handleLogOut, isLogined, loginedUser, expiredDate };
