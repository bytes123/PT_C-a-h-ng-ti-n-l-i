import React, { useEffect, useState } from "react";
import { MainSideBar } from "../static/AdminData";
import AdminHeader from "../layout/AdminHeader";
import useAdminHeaderBar from "../utils/hooks/Admin/useAdminHeaderBar";
import { loginedUser } from "../utils/hooks/useAccessUser";
import { useLocation } from "react-router-dom";
export default function AdminPage({ children }) {
  const [isBarActive, setIsBarActive] = useAdminHeaderBar();
  const [page, setPage] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (!loginedUser) {
      return (window.location.href = "/");
    }
    if (
      loginedUser &&
      loginedUser?.type_user?.some(
        (item) => item.type_user_id == "admin" || item.type_user_id == "staff"
      )
    ) {
      setPage(
        <div className="admin_page wrapper flex min-h-screen">
          <MainSideBar
            isBarActive={isBarActive}
            onBarActive={() => setIsBarActive(false)}
          />
          <div className="flex flex-col w-100 flex-1">
            <AdminHeader
              onBarActive={() => setIsBarActive(!isBarActive)}
              isBarActive={isBarActive}
            />

            {children}
          </div>
        </div>
      );
    } else {
      window.location.href = "/";
    }
  }, [loginedUser, isBarActive, location]);

  return page;
}
