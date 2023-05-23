import React from "react";
import { Link } from "react-router-dom";
import { CgPassword } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiMessageRoundedDots } from "react-icons/bi";
import { handleLogOut } from "../../utils/hooks/useAccessUser";

export default function ProfileController({ children, user, isAdmin }) {
  console.log(user);
  return (
    <ul className="profile-list">
      {!isAdmin && (
        <>
          <li className="profile-item p-3 mb-5 ">
            <Link
              to="/thong-tin-ca-nhan"
              className="flex items-center h-[40px]"
            >
              {children}
              <span className="ml-5 font-semibold">{user?.fullname}</span>
            </Link>
          </li>
          <li className="profile-item p-3 mb-5 ">
            <Link to="/tin-nhan" className="flex items-center h-[40px]">
              <BiMessageRoundedDots className="text-5xl" />
              <span className="ml-5 font-semibold">Nhắn tin hỗ trợ</span>
            </Link>
          </li>
          <li className="profile-item p-3 mb-5 ">
            <Link to="/lich-su" className="flex items-center h-[40px]">
              <FaMoneyBillWave className="text-5xl" />
              <span className="ml-5 font-semibold">Lịch sử đơn hàng</span>
            </Link>
          </li>
          <li className="profile-item p-3 mb-5 ">
            <Link to="/doi-mat-khau" className="flex items-center h-[40px]">
              <CgPassword className="text-5xl" />
              <span className="ml-5 font-semibold">Đổi mật khẩu</span>
            </Link>
          </li>
        </>
      )}
      <li className="profile-item p-3  " onClick={handleLogOut}>
        <div className="cursor-pointer flex items-center h-[40px]">
          <MdLogout className="text-5xl" />
          <span className="ml-5 font-semibold">Đăng xuất</span>
        </div>
      </li>
    </ul>
  );
}
