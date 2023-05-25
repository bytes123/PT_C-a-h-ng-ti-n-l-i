let userPlaceHolder = {
  avatar: "Ảnh đại diện",
  user_name: "* Tài khoản",
  fullname: "* Họ và tên",
  email: "* Địa chỉ Email",
  password: "* Mật khẩu",
  confirmpassword: "* Nhập lại mật khẩu",
  phone_number: "* Nhập số điện thoại",
};

let detailProductPlaceHolder = {
  product_id: "* Chọn sản phẩm",
  size: "* Kích thước",
  price: "* Giá",
  discount: "* Giảm giá",
};

let categoryPlaceHolder = {
  branch: "* Chọn chi nhánh",
  name: "* Tên danh mục",
};

let brandPlaceHolder = {
  name: "* Tên nhãn hàng",
  phone_number: "* Số điện thoại",
  email: "* Email",
  address: "* Địa chỉ",
};

let productPlaceHolder = {
  name: "* Tên sản phẩm",
  introduction: "Lời giới thiệu",
};

const validateConfirmPassword = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject("Mật khẩu không khớp");
  },
});

const rulesCategory = {
  name: [{ required: true, message: "Vui lòng nhập tên danh mục!" }],
  category_id: [{ required: true, message: "Vui lòng chọn danh mục!" }],
  brand_id: [{ required: true, message: "Vui lòng chọn nhà sãn xuất!" }],
};

const rulesBrand = {
  name: [{ required: true, message: "Vui lòng nhập tên nhãn hàng" }],
  phone_number: [{ required: true, message: "Vui lòng nhập số điện thoại!" }],
  email: [{ required: true, message: "Vui lòng nhập Email!" }],
  address: [{ required: true, message: "Vui lòng nhập địa chỉ!" }],
};

const rulesArea = {
  storage_id: [{ required: true, message: "Vui lòng chọn kho muốn phân tán!" }],
  branch_id: [{ required: true, message: "Vui lòng chọn chi nhánh đích!" }],
};

const rulesProduct = {
  name: [{ required: true, message: "Vui lòng nhập tên sản phẩm!" }],
  branch_id: [{ required: true, message: "Vui lòng chọn chi nhánh!" }],
  category_id: [{ required: true, message: "Vui lòng chọn danh mục!" }],
  brand_id: [{ required: true, message: "Vui lòng chọn nhà sãn xuất!" }],
};

const rulesDetailProduct = {
  product_id: [{ required: true, message: "Vui lòng chọn sản phẩm!" }],
  size: [{ required: true, message: "Vui lòng nhập kích cỡ sản phẩm!" }],
  price: [
    { required: true, message: "Vui lòng nhập giá sản phẩm!" },
    {
      pattern: "^([-]?[1-9][0-9]*|0)$",
      message: "Vui lòng nhập giá sản phẩm là số hợp lệ!",
    },
  ],
  discount: [
    {
      pattern: "^([-]?[1-9][0-9]*|0)$",
      message: "Vui lòng nhập giảm giá phẩm là số hợp lệ!",
    },
    () => ({
      validator(_, value) {
        if (value < 0) {
          return Promise.reject("Vui lòng nhập giảm giá tối thiểu là 0");
        }
        if (value > 100) {
          return Promise.reject("Vui lòng nhập giảm giá tối đa là 100");
        }
        return Promise.resolve();
      },
    }),
  ],
  quantity: [
    {
      pattern: "^([-]?[1-9][0-9]*|0)$",
      message: "Vui lòng nhập tồn kho là số hợp lệ!",
    },
    () => ({
      validator(_, value) {
        if (value < 0) {
          return Promise.reject("Vui lòng nhập tồn kho tối thiểu là 0");
        }
        return Promise.resolve();
      },
    }),
  ],
};

const rulesSignUp = {
  user_name: [{ required: true, message: "Vui lòng nhập tài khoản của bạn!" }],
  fullname: [{ required: true, message: "Vui lòng nhập tên của bạn!" }],
  email: [{ required: true, message: "Vui lòng nhập Email của bạn!" }],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu!" },
    { min: 6, message: "Vui lòng nhập mật khẩu ít nhất 6 ký tự!" },
  ],
  confirmpassword: [
    { required: true, message: "Vui lòng nhập lại mật khẩu!" },
    validateConfirmPassword,
  ],
  phone_number: [{ required: true, message: "Vui lòng nhập số điện thoại!" }],
};

const rulesLogin = {
  user_name: [{ required: true, message: "Vui lòng nhập tài khoản của bạn!" }],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu!" },
    { min: 6, message: "Vui lòng nhập mật khẩu ít nhất 6 ký tự!" },
  ],
};

const userSignUp = {
  user_name: "",
  fullname: "",
  address: "",
  email: "",
  password: "",
};

const userLogin = {
  user_name: "",
  password: "",
  save: false,
};

export {
  userPlaceHolder,
  rulesCategory,
  rulesSignUp,
  rulesLogin,
  userSignUp,
  userLogin,
  categoryPlaceHolder,
  productPlaceHolder,
  rulesProduct,
  rulesArea,
  rulesDetailProduct,
  detailProductPlaceHolder,
  rulesBrand,
  brandPlaceHolder,
};
