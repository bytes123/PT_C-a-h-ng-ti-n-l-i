import MainDashBoard from "../components/Admin/MainDashBoard";
import MainSideBar from "../components/Admin/MainSideBar";
import MainDetailProduct from "../components/Admin/MainDetailProduct";
import MainProduct from "../components/Admin/MainProduct";
import MainCatalog from "../components/Admin/MainCategory";
import MainUser from "../components/Admin/MainUser";
import MainRate from "../components/Admin/MainRate";
import MainBrand from "../components/Admin/MainBrand";
import MainStatistic from "../components/Admin/MainStatistic";
import MainBill from "../components/Admin/MainBill";
import { AiOutlineShoppingCart, AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiMessageSquare,
} from "react-icons/fi";
import { FcStatistics } from "react-icons/fc";
import { MdOutlineRateReview } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { TbBrandAirtable } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiBillLine } from "react-icons/ri";

const sideBarList = [
  {
    key: 1,

    text: "DASHBOARD",
    list: [
      {
        key: 1,
        link: "dashboard",
        icon: <FiShoppingBag />,
        text: "Trang chủ",
      },
    ],
  },
  {
    key: 2,
    text: "TRANG QUẢN LÝ",
    list: [
      {
        key: 1,
        link: "quan-ly-danh-muc",
        icon: <BiCategoryAlt />,
        text: "Quản lý danh mục",
      },
      {
        key: 7,
        link: "quan-ly-nhan-hang",
        icon: <TbBrandAirtable />,
        text: "Quản lý nhãn hàng",
      },
      {
        key: 2,
        link: "quan-ly-san-pham",
        icon: <AiOutlineShoppingCart />,
        text: "Quản lý loại món ăn",
      },
      {
        key: 3,
        link: "quan-ly-loai-san-pham",
        icon: <FiPackage />,
        text: "Quản lý chi tiết món ăn",
      },

      // {
      //   key: 4,
      //   link: "quan-ly-don-hang",
      //   icon: <RiBillLine />,
      //   text: "Quản lý đơn hàng",
      // },
      {
        key: 5,
        link: "quan-ly-nguoi-dung",
        icon: <AiOutlineUsergroupAdd />,
        text: "Quản lý tài khoản",
      },
      // {
      //   key: 0,
      //   link: "quan-ly-tin-nhan",
      //   icon: <FiMessageSquare />,
      //   text: "Quản lý tin nhắn",
      // },
      // {
      //   key: 6,
      //   link: "quan-ly-danh-gia",
      //   icon: <MdOutlineRateReview />,
      //   text: "Quản lý đánh giá",
      // },

      // {
      //   key: 8,
      //   link: "quan-ly-thong-ke",
      //   icon: <FcStatistics />,
      //   text: "Quản lý thống kê",
      // },

      // {
      //   key: 9,
      //   link: "quan-ly-chi-nhanh",
      //   icon: <TbBrandAirtable />,
      //   text: "Phân tán chi nhánh",
      // },
    ],
  },
];

const billListData = [
  {
    image:
      "https://shoppymultidash.netlify.app/static/media/product6.3260a3b510aa12fc136b.jpg",
    name: "Cà chua",
    customer_name: "Minh",
    bill_price: "350000",
    bill_status: "pending",
  },
  {
    image:
      "https://shoppymultidash.netlify.app/static/media/product6.3260a3b510aa12fc136b.jpg",
    name: "Cà chua",
    customer_name: "Minh",
    bill_price: "350000",
    bill_status: "Thành công",
  },
];

const productListData = [
  {
    product_id: 1,

    product_name: "Cà chua",
    catalog_id: 1,
    catalog_name: "Thực phẩm",
  },
  {
    product_id: 2,

    product_name: "Pepsi",
    catalog_id: 2,
    catalog_name: "Nước ngọt",
  },
];

const detailProductListData = [
  {
    detail_product_id: 1,
    detail_product_image:
      "https://shoppymultidash.netlify.app/static/media/product6.3260a3b510aa12fc136b.jpg",
    product_name: "Cà chua",
    detail_product_size: "50g",
    detail_product_storage: "34",
    detail_product_price: "350000",
  },
  {
    detail_product_id: 2,
    detail_product_image:
      "https://shoppymultidash.netlify.app/static/media/product6.3260a3b510aa12fc136b.jpg",
    product_name: "Pháo",
    detail_product_size: "30g",
    detail_product_storage: "22",
    detail_product_price: "350000",
  },
];

const catalogListData = [
  {
    catalog_id: 1,
    catalog_name: "Trà",
  },
  {
    catalog_id: 2,
    catalog_name: "Coffe",
  },
];

const brandListData = [
  {
    brand_id: 1,
    brand_name: "NestFood",
    brand_phone_number: "0705008419",
    brand_email: "nest@gmail.com",
    brand_address: "Hà cổ",
    brand_created_date: "27/09/2002",
  },
];

const userListData = [
  {
    user_id: 1,
    user_image:
      "https://shoppymultidash.netlify.app/static/media/avatar.ad026443bbabdf64ce71.jpg",
    user_fullname: "Đào Trí Minh Tân",
    user_name: "bytes123",
    user_password: "aaaaa",
    user_address: "Vĩnh Long",
    user_isAdmin: 1,
    user_created_date: "27/09/2022",
  },
];

const commomBoxList = [
  {
    key: 1,
    icon: <FiUsers />,
    bg: "bg-sky-200",
    text: "Khách hàng",
  },
  {
    key: 2,
    icon: <AiOutlineShoppingCart />,
    bg: "bg-amber-300",
    text: "món ăn",
  },
  {
    key: 3,
    icon: <BsBoxSeam />,
    bg: "bg-red-200",
    text: "Hàng bán ra",
  },
  {
    key: 4,
    icon: <FcMoneyTransfer />,
    bg: "bg-green-200",
    text: "Lợi nhuận",
  },
];

const rateListData = [
  {
    rate_id: 1,
    rate_content: "Quá đã",
    rate_user: "bytes123",
    rate_star: 5,
    rate_created_date: "27/09/2022",
  },
];

const rateTemplateData = {
  row_index: "",
  rate_id: "",
  rate_content: "",
  rate_user: "",
  rate_star: "",
  rate_created_date: "",
};

const catalogTemplateData = {
  catalog_name: "",
};

const brandTemplateData = {
  brand_name: "",
  brand_phone_number: "",
  brand_email: "",
  brand_address: "",
  brand_created_date: "",
};

const brandDataCheck = [
  " brand_name",
  " brand_phone_number",
  " brand_email",
  " brand_address",
  " brand_created_date",
];

const detailProductTemplateData = {
  detail_product_image: "",
  product_id: "",
  detail_product_size: "",
  detail_product_price: "",
};

const productTemplateData = {
  product_name: "",
  catalog_name: "",
};

const userTemplateData = {
  user_image: "",
  user_fullname: "",
  user_name: "",
  user_password: "",
  user_address: "",
  user_created_date: "",
};

const catalogDataCheck = ["catalog_name"];

const productDataCheck = [
  "product_image",
  "product_name",
  "product_catalog",
  "product_price",
];

const userDataCheck = [
  "user_image",
  "user_fullname",
  "user_name",
  "user_email",
  "user_password",
  "user_address",
  "user_isAdmin",
  "user_created_date",
];

export {
  MainDashBoard,
  MainSideBar,
  MainDetailProduct,
  MainProduct,
  MainCatalog,
  MainRate,
  MainUser,
  MainBrand,
  MainBill,
  MainStatistic,
  commomBoxList,
  sideBarList,
  billListData,
  productListData,
  detailProductListData,
  catalogListData,
  brandListData,
  rateListData,
  userListData,
  rateTemplateData,
  catalogDataCheck,
  catalogTemplateData,
  brandTemplateData,
  brandDataCheck,
  productTemplateData,
  detailProductTemplateData,
  productDataCheck,
  userDataCheck,
  userTemplateData,
};
