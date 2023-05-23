import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { store } from "../store/store";
import {
  fetchAuthSignup,
  getMessage,
  getStatus,
} from "../features/authen/authenSlice";
import { useSelector } from "react-redux";

export default function SuccessAuth() {
  const { auth_token } = useParams();
  const message = useSelector(getMessage);
  const status = useSelector(getStatus);

  useEffect(() => {
    store.dispatch(fetchAuthSignup(auth_token));
  }, []);

  return (
    <div className="contianer mx-auto my-5">
      <div className="no_match-wrapper">
        <div className="container">
          <div className="no_match">
            <img
              src={
                status == "failed"
                  ? require("../assets/images/failed.jpeg")
                  : require("../assets/images/success.jpg")
              }
              alt=""
            />
            <div className="no_match-text">
              <h2>{status == "failed" ? "Đừng khóc" : "Quá đẳng cấp"}</h2>
              <p className="text-4xl mt-5">
                {status == "failed" ? "Có lỗi xãy ra rồi" : ""}
              </p>
              <p className="text-4xl mt-5">{message}</p>
              {status == "succeeded" ? (
                <button className="bg-emerald-400 p-5 mt-10 rounded-md">
                  <Link to="/dang-nhap" className="text-white font-bold">
                    Đăng nhập ngay
                  </Link>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
