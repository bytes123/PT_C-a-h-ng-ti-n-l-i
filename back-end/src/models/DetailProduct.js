`use strict`;
const { db, sqlConnection } = require(`./../db`);
var moment = require("moment");
var DetailProduct = {
  getAllDetailProduct: function (callback) {
    let sql = `SELECT dt.*,FLOOR(dt.price-dt.price*dt.discount/100) newPrice,br.id branch_id,br.name branch_name,p.name FROM detail_products dt INNER JOIN products p ON dt.product_id = p.id INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id  INNER JOIN branches br ON br.id = c.branch_id AND br.id = b.branch_id ORDER BY createdAt DESC`;
    return sqlConnection.query(sql, callback);
  },
  getTopProducts: function (quantity, callback) {
    let sql = `SELECT TOP ${quantity} dt.*,FLOOR(dt.price-dt.price*dt.discount/100) newPrice,br.id branch_id,br.name branch_name,p.name,p.image1,c.id as category_id,c.name as category_name,b.id as brand_id,b.name as brand_name  FROM detail_products dt INNER JOIN products p ON dt.product_id = p.id  INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id INNER JOIN branches br ON br.id = c.branch_id AND br.id = b.branch_id ORDER BY p.createdAt DESC`;

    return sqlConnection.query(sql, callback);
  },
  getTopProductsByCategory: function (data, callback) {
    let sql = `SELECT TOP ${data.quantity}  dt.*,FLOOR(dt.price-dt.price*dt.discount/100) newPrice,br.id branch_id,br.name branch_name,p.name,p.image1,c.id as category_id,c.name as category_name,b.id as brand_id,b.name as brand_name FROM detail_products dt INNER JOIN products p ON dt.product_id = p.id  INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id INNER JOIN branches br ON br.id = c.branch_id AND br.id = b.branch_id WHERE c.id = '${data.category_id}' ORDER BY p.createdAt DESC`;

    return sqlConnection.query(sql, callback);
  },
  getTopSellProducts: function (quantity, callback) {
    let sql = `SELECT TOP ${quantity} dp.*,FLOOR(dp.price-dp.price*dp.discount/100) newPrice,br.id branch_id,br.name branch_name,p.name,p.image1,c.id as category_id,c.name as category_name,b.id as brand_id,b.name as brand_name,SUM(db.quantity) AS total_quantity  FROM detail_products dp INNER JOIN products p  ON dp.product_id = p.id INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id INNER JOIN branches br ON br.id = c.branch_id AND br.id = b.branch_id INNER JOIN detail_bill db ON db.detail_product_id = dp.id  ORDER BY total_quantity DESC `;
    console.log(sql);
    return sqlConnection.query(sql, callback);
  },
  getTopSellProductsByCategory: function (data, callback) {
    let sql = `SELECT TOP ${data.quantity} dp.*,FLOOR(dp.price-dp.price*dp.discount/100) newPrice,br.id branch_id,br.name branch_name,p.name,p.image1,c.id as category_id,c.name as category_name,b.id as brand_id,b.name as brand_name,SUM(db.quantity) AS total_quantity  FROM detail_products dp INNER JOIN products p  ON dp.product_id = p.id INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id INNER JOIN branches br ON br.id = c.branch_id AND br.id = b.branch_id INNER JOIN detail_bill db ON db.detail_product_id = dp.id  WHERE c.id = '${data.category_id}' ORDER BY total_quantity DESC`;
    return sqlConnection.query(sql, callback);
  },
  getDetailByProductId: function (product_id, callback) {
    let sql = `SELECT dt.*, (SELECT COUNT(id) FROM RATES r WHERE r.detail_product_id = dt.id AND r.statement = 'success') AS rate_quantity, p.image1, p.name, FLOOR(dt.price-dt.price*dt.discount/100) AS newPrice
      FROM detail_products dt
      INNER JOIN products p ON p.id = dt.product_id
      WHERE dt.product_id = '${product_id}'`;
    return sqlConnection.query(sql, callback);
  },
  addDetailProduct: (data, callback) => {
    data.createdAt = moment(data.createdAt, "YYYY-MM-DD HH:mm:ss").format(
      "YYYY/MM/DD HH:mm:ss"
    );

    const columns = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map((value) => (typeof value === "string" ? `N'${value}'` : value))
      .join(", ");

    const sql = `INSERT INTO detail_products (${columns}) VALUES (${values})`;

    return sqlConnection.query(sql, callback);
  },
  updateDetailProduct: (data, callback) => {
    let query = [];

    data.detail_products.updatedAt = moment(
      data.detail_products.updatedAt,
      "YYYY-MM-DD HH:mm:ss"
    ).format("YYYY/MM/DD HH:mm:ss");

    Object.keys(data.detail_products).forEach((key) => {
      query.push(`${key} = '${data.detail_products[key]}'`);
    });

    query = query.join(",", "");

    let sql = `UPDATE detail_products SET ${query} WHERE id = ${data.id}`;

    console.log(sql);
    return sqlConnection.query(sql, callback);
  },
  deleteDetailProduct: (id, callback) => {
    let sql = `DELETE FROM detail_products WHERE id = ${id}`;
    return sqlConnection.query(sql, callback);
  },
  searchDetailProduct: (data, callback) => {
    let sql = `SELECT dt.*,FLOOR(dt.price-dt.price*dt.discount/100) newPrice,p.name FROM detail_products dt INNER JOIN products p ON dt.product_id = p.id AND p.name LIKE N'${data.value}%'`;
    return sqlConnection.query(sql, callback);
  },
};

module.exports = DetailProduct;
