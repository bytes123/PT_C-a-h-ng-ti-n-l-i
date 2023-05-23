import { path } from "../static/Router";
import HeaderMenuItem from "../components/Header/HeaderMenuItem";

const DesktopMenu = [
  {
    key: "home",
    link: path.home,
    value: "Trang chủ",
  },
  {
    key: "introduce",
    link: path.introduce,
    value: "Giới thiệu",
  },
  {
    key: "menu",
    link: path.menu + "/banh-ngot",
    value: "Thực đơn",
  },
  {
    key: "gift",
    link: path.gift,
    value: "Quà tặng",
  },
  {
    key: "history",
    link: path.history,
    value: "Lịch sử",
  },

  {
    key: "login",
    link: path.login,
    value: "Đăng nhập",
  },
  {
    key: "signup",
    link: path.signup,
    value: "Đăng ký",
  },
];

const MobileMenu = [
  {
    key: "home",
    link: "/",
    value: "Trang chủ",
  },
  {
    key: "introduce",
    link: path.introduce,
    value: "Giới thiệu",
  },
  {
    key: "menu",
    link: path.menu + "/banh-ngot",
    value: "Thực đơn",
    // children: [
    //   {
    //     key: "coffe",
    //     link: path.menu + "/coffe",
    //     value: "cà phê",
    //     children: [
    //       {
    //         key: "coffefin",
    //         link: path.menu + "/coffe/phin",
    //         value: "cà phê phin",
    //       },
    //       {
    //         key: "espresso",
    //         link: path.menu + "/coffe/espresso",
    //         value: "cà phê espresso",
    //       },
    //     ],
    //   },
    //   {
    //     key: "tea",
    //     link: path.menu + "/tea",
    //     value: "trà",
    //     children: [
    //       {
    //         key: "trasenvang",
    //         link: path.menu + "/tea/trasenvang",
    //         value: "trà sen vàng",
    //       },
    //       {
    //         key: "trathachdao",
    //         link: path.menu + "/tea/trathachdao",
    //         value: "trà thạch đào",
    //       },
    //     ],
    //   },
    // ],
  },
  {
    key: "gift",
    link: path.gift,
    value: "Quà tặng",
  },
  {
    key: "admin",
    link: path.admin,
    value: "Trang ADMIN",
  },
];

const MobileMenuLogin = [
  {
    key: "login",
    link: path.login,
    value: "Đăng nhập",
  },
  {
    key: "signup",
    link: path.signup,
    value: "Đăng ký",
  },
];

const menuData = [
  {
    key: "coffe",
    value: "Cà phê",
    children: [
      {
        key: "coffe-fin",
        value: "Cà phê phin",
      },
      {
        key: "phindi",
        value: "PhinDi",
      },
      {
        key: "coffe-espresso",
        value: "Cà phê espresso",
      },
    ],
  },
];

export { DesktopMenu, MobileMenu, MobileMenuLogin, menuData };
