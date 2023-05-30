import React, { useEffect } from "react";
import { Layout } from "antd";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  MainDashBoard,
  MainDetailProduct,
  MainProduct,
  MainCatalog,
  MainRate,
  MainBill,
  MainUser,
  MainBrand,
  MainStatistic,
} from "../static/AdminData";
import { useSelector, useDispatch } from "react-redux";
import { path } from "../static/Router";
import {
  HomePage,
  IntroducePage,
  GiftPage,
  MenuPage,
  LoginPage,
  SignUpPage,
  ProductPage,
  MenuItemPage,
  HistoryPage,
  AdminPage,
  WishLishPage,
  CartPage,
  ProfilePage,
  ChangePasswordPage,
  SuccessAuth,
} from "../static/Pages";
import "./../assets/styles/App.scss";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import UserChatPage from "../pages/UserChatPage";
import AdminChatPage from "./Admin/AdminChatPage";

import { loginedUser } from "../utils/hooks/useAccessUser";
import { updateOnline } from "../features/authen/authenSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (loginedUser) {
      dispatch(
        updateOnline({
          user_name: loginedUser.user_name,
          online: true,
        })
      ).unwrap();
    } else {
      const userName = localStorage.getItem("user_name");
      dispatch(
        updateOnline({
          user_name: userName,
          online: false,
        })
      ).unwrap();
    }
  }, [loginedUser]);

  useEffect(() => {
    console.log(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="admin/dashboard"
          element={
            <AdminPage>
              <MainDashBoard />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-danh-muc"
          element={
            <AdminPage>
              <MainCatalog />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-san-pham"
          element={
            <AdminPage>
              <MainProduct />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-loai-san-pham"
          element={
            <AdminPage>
              <MainDetailProduct />
            </AdminPage>
          }
        />

        <Route
          path="admin/quan-ly-nguoi-dung"
          element={
            <AdminPage>
              <MainUser />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-don-hang"
          element={
            <AdminPage>
              <MainBill />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-danh-gia"
          element={
            <AdminPage>
              <MainRate />
            </AdminPage>
          }
        />

        {/* <Route
          path="admin/quan-ly-tin-nhan"
          element={
            <AdminPage>
              <AdminChatPage />
            </AdminPage>
          }
        /> */}

        {/* <Route
          path="admin/quan-ly-tin-nhan/:room_id"
          element={
            <AdminPage>
              <AdminChatPage />
            </AdminPage>
          }
        /> */}

        <Route
          path="admin/quan-ly-nhan-hang"
          element={
            <AdminPage>
              <MainBrand />
            </AdminPage>
          }
        />
        <Route
          path="admin/quan-ly-thong-ke"
          element={
            <AdminPage>
              <MainStatistic />
            </AdminPage>
          }
        />

        {Object.values(path).map((route) => (
          <Route
            key={route}
            path={route}
            element={
              <Layout className="h-full bg-white">
                <Header />
                {route === path.home ? <HomePage /> : null}
                {route === path.introduce ? <IntroducePage /> : null}
                {route === path.menu ? <MenuPage /> : null}
                {route === path.gift ? <GiftPage /> : null}
                {route === path.login ? <LoginPage /> : null}
                {route === path.signup ? <SignUpPage /> : null}
                {route === path.history ? <HistoryPage /> : null}
                <Footer />
              </Layout>
            }
          />
        ))}

        <Route
          path="thuc-don"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <MenuPage />
              <Footer />
            </Layout>
          }
        />

        {/* <Route
          path="tin-nhan"
          element={
            <Layout className="h-full bg-white">
              <Header className="relative" />
              <UserChatPage />
            </Layout>
          }
        /> */}

        {/* <Route
          path="thanh-toan"
          element={
            <Layout className="h-full bg-white">
              <Header className="relative" />
              <CheckoutPage />
            </Layout>
          }
        >
          <Route
            path=":select"
            element={
              <Layout className="h-full bg-white">
                <Header className="relative" />
                <CheckoutPage />
              </Layout>
            }
          />
        </Route> */}

        <Route
          path="yeu-thich"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <WishLishPage />
              <Footer />
            </Layout>
          }
        />

        {/* <Route
          path="gio-hang"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <CartPage />
              <Footer />
            </Layout>
          }
        /> */}

        <Route
          path="thong-tin-ca-nhan"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <ProfilePage />
              <Footer />
            </Layout>
          }
        />

        <Route
          path="doi-mat-khau"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <ChangePasswordPage />
              <Footer />
            </Layout>
          }
        />

        {/* MENU ROUTE */}
        <Route
          path="thuc-don"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <MenuItemPage />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="thuc-don/:menuid"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <MenuItemPage />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="thuc-don/:menuid/:productid"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <ProductPage />
              <Footer />
            </Layout>
          }
        />

        {/* <Route
          path="xac-thuc-tai-khoan/:auth_token"
          element={
            <Layout className="h-full bg-white">
              <Header />
              <SuccessAuth />
              <Footer />
            </Layout>
          }
        /> */}

        {/* ANOTHER ROUTE */}
        <Route
          path="*"
          element={
            <Layout className="h-full">
              <Header />
              <HomePage />
              <Footer />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
