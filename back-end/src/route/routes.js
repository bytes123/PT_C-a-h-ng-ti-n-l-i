"use strict";
const { v1: uuidv1 } = require("uuid");
var fs = require("fs");
const multer = require("multer");

let storageAvatar = multer.diskStorage({
  destination: function (req, file, callback) {
    let dir = `./public/resources/avatar/`;

    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, uuidv1() + file.originalname.slice(-10).replace("-", " "));
  },
});

let uploadAvatar = multer({ storage: storageAvatar });

let storageProduct = multer.diskStorage({
  destination: function (req, file, callback) {
    let productId = req.params.productId; // Lấy ID sản phẩm từ request
    let dir = `./public/resources/product/${productId}`; // Tạo đường dẫn tới thư mục theo ID sản phẩm

    if (!fs.existsSync(dir)) {
      // Kiểm tra thư mục có tồn tại không
      fs.mkdirSync(dir); // Nếu không tồn tại thì tạo mới thư mục
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

let uploadProduct = multer({ storage: storageProduct });

module.exports = function (app) {
  let branchCrtl = require("../controllers/BranchController");
  let storageCrtl = require("../controllers/StorageController");
  let categoryCtrl = require("../controllers/CategoryController");
  let productsCtrl = require("../controllers/ProductsController");
  let detailproductsCrtl = require("../controllers/DetailProductController");
  let userCrtl = require("../controllers/UserController");
  let authCrtl = require("../controllers/AuthController");
  let messagesCtrl = require("../controllers/MessageController");
  let brandCrtl = require("../controllers/BrandController");
  let dbCrtl = require("../controllers/DBController");
  let cartCrtl = require("../controllers/CartController");
  let billCrtl = require("../controllers/BillController");
  let rateCrtl = require("../controllers/RateController");

  //API PHÂN TÁN
  app.route("/mysql-login").post(dbCrtl.loginDB);
  app.route("/migrate").post(dbCrtl.migrate);
  app.route("/get_table").post(dbCrtl.getTable);
  app.route("/get_column").post(dbCrtl.getColumn);

  // API RATE

  app.route("/add-rate").post(rateCrtl.addRate);
  app.route("/get-rate").get(rateCrtl.getRates);
  app.route("/search-rate").post(rateCrtl.searchRate);
  app.route("/update-rate").post(rateCrtl.updateStatement);
  // API KHO
  app.route("/branch").get(branchCrtl.get);

  // API KHO
  app.route("/storage").get(storageCrtl.get);

  // API SẢN PHẨM
  app.route("/product").get(productsCtrl.get);
  app.route("/main-product").get(productsCtrl.getAllMainProduct);
  app.route("/top-products").post(productsCtrl.getTopProducts);
  app
    .route("/add-product/:productId")
    .post(uploadProduct.array("images"), productsCtrl.addProduct);
  app
    .route("/update-product/:productId")
    .post(uploadProduct.array("images"), productsCtrl.updateProduct);
  app.route("/delete-product").post(productsCtrl.deleteProduct);
  app.route("/search-product").post(productsCtrl.searchProduct);
  app.route("/product-by-id").post(productsCtrl.getProductById);

  //API CT SP
  app.route("/detail_product").get(detailproductsCrtl.get);
  app.route("/add-detail_product").post(detailproductsCrtl.addDetailProduct);
  app
    .route("/update-detail_product")
    .post(detailproductsCrtl.updateDetailProduct);
  app
    .route("/delete-detail_product")
    .post(detailproductsCrtl.deleteDetailProduct);
  app
    .route("/search-detail_product")
    .post(detailproductsCrtl.searchDetailProduct);

  // API CART

  app.route("/add-cart").post(cartCrtl.addCart);
  app.route("/update-cart").post(cartCrtl.updateCart);
  app.route("/get-cart").post(cartCrtl.getCart);

  // API BILL
  app.route("/get-bill").get(billCrtl.getBill);
  app.route("/update-statement-bill").post(billCrtl.updateStatementBill);
  app.route("/search-bill").post(billCrtl.searchBill);
  app.route("/get-bill-by-username").post(billCrtl.getBillByUserName);
  app.route("/get-detail_bill").post(billCrtl.getDetailBill);
  app.route("/update-payed-bill").post(billCrtl.updatePayedBill);
  app.route("/sort-bill").post(billCrtl.getSortBill);

  // API CHECKOUT

  app.route("/checkout").post(billCrtl.checkout);

  // API DANH MỤC
  app.route("/category").get(categoryCtrl.get);
  app.route("/add-category").post(categoryCtrl.addCategory);
  app.route("/update-category").post(categoryCtrl.updateCategory);
  app.route("/delete-category").post(categoryCtrl.deleteCategory);
  app.route("/category-children").get(categoryCtrl.getCategoryAndChildren);
  app.route("/search-category").post(categoryCtrl.searchCategory);

  // API NHÀ SX
  app.route("/brand").get(brandCrtl.get);
  app.route("/add-brand").post(brandCrtl.addBrand);
  app.route("/update-brand").post(brandCrtl.updateBrand);
  app.route("/delete-brand").post(brandCrtl.deleteBrand);
  app.route("/search-brand").post(brandCrtl.searchBrand);

  // API USER
  app.route("/users").get(userCrtl.getAllUser);
  app.route("/delete-user").post(userCrtl.deleteUser);
  app.route("/admin_type_user").get(userCrtl.getAdminTypeUser);
  app.route("/search-user").post(userCrtl.searchUser);

  //API ĐĂNG KÝ
  app
    .route("/signup")
    .post(uploadAvatar.single("avatar"), userCrtl.signUpCustomer);
  app
    .route("/add-staff")
    .post(uploadAvatar.single("avatar"), userCrtl.signUpStaff);

  app
    .route("/update-staff")
    .post(uploadAvatar.single("avatar"), userCrtl.updateStaff);

  app.route("/login").post(userCrtl.login);
  app.route("/fb-login").post(userCrtl.fbLogin);

  app.route("/update_online").post(userCrtl.updateOnline);

  app.route("/authen").post(authCrtl.authen);

  // API TIN NHẮN
  app.route("/messages_by_room").post(messagesCtrl.getMsgByRoom);
  app.route("/message_list_by_user").post(messagesCtrl.getMsgListByUser);
  app.route("/message_list_all").get(messagesCtrl.getMsgList);
  app.route("/contact_user").post(messagesCtrl.getContactUser);
  app.route("/send_message").post(messagesCtrl.insertMessage);
  app.route("/customer_room").post(messagesCtrl.insertRoom);
  app.route("/drop_room").post(messagesCtrl.dropRoom);
};
