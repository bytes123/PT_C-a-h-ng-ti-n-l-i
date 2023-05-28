`use strict`;
const { db, sqlConnection } = require(`./../db`);
var moment = require(`moment`);
var User = {
  getUser: (data, callback) => {
    let sql = `SELECT * FROM users WHERE user_name = '${data.user_name}' `;

    return sqlConnection.query(sql, callback);
  },
  getAllUser: (callback) => {
    let sql = `
    SELECT * FROM (
      SELECT u.user_name,u.avatar,u.email,u.online,u.createdAt,u.updatedAt, c.fullname,c.gender, c.province_id,c.province_name, c.district_id,c.district_name, c.ward_id,c.ward_name, c.phone_number, c.address, u.createdAt as order_date 
      FROM customers c 
      INNER JOIN users u ON u.user_name = c.user_name 
      UNION ALL 
      SELECT u.user_name,u.avatar,u.email,u.online,u.createdAt,u.updatedAt, s.fullname,s.gender, s.province_id, s.province_name, s.district_id,s.district_name, s.ward_id,s.ward_name, s.phone_number, s.address, u.createdAt as order_date 
      FROM STAFFS s 
      INNER JOIN users u ON u.user_name = s.user_name 

    ) AS subquery
    ORDER BY order_date DESC
    `;
    return sqlConnection.query(sql, callback);
  },
  getStaffs: (callback) => {
    let sql = `SELECT * FROM users u INNER JOIN staffs s ON u.user_name = s.user_name ORDER BY u.createdAt `;
    return sqlConnection.query(sql, callback);
  },
  getAdminTypeUser: (callback) => {
    let sql = `SELECT * FROM type_user t INNER JOIN permissions p  ON t.permission_id = p.id AND p.name = 'Admin'`;
    return sqlConnection.query(sql, callback);
  },
  getCustomers: (callback) => {
    let sql = `SELECT * FROM users u INNER JOIN customers c ON u.user_name = c.user_name ORDER BY u.createdAt DESC`;
    return sqlConnection.query(sql, callback);
  },
  getAllDetailTypeUser: (callback) => {
    let sql = `SELECT * FROM detail_type_user `;
    return sqlConnection.query(sql, callback);
  },
  getDetailTypeUser: (data, callback) => {
    let sql = `SELECT T.type_user_id FROM detail_type_user dt INNER JOIN users u ON dt.user_name = '${data.user_name}' AND dt.user_name = u.user_name INNER JOIN type_user t ON dt.type_user_id = t.type_user_id `;
    return sqlConnection.query(sql, callback);
  },

  getUserConfirmed: (data, callback) => {
    let sql = `SELECT combined.*
        FROM (
          SELECT c.*, u.createdAt,u.password, u.isAuth, u.online, u.email, COALESCE(u.avatar, 'default.jpg') AS avatar
          FROM customers c
          LEFT JOIN staffs s ON c.user_name = s.user_name
          LEFT JOIN users u ON c.user_name = u.user_name
      
          WHERE c.user_name IS NOT NULL 
          UNION ALL
          SELECT s.*, u.createdAt,u.password, u.isAuth, u.online, u.email, COALESCE(u.avatar, 'default.jpg') AS avatar
          FROM customers c
          RIGHT JOIN staffs s ON c.user_name = s.user_name
          LEFT JOIN users u ON s.user_name = u.user_name
      
          WHERE c.user_name IS NULL 
        ) AS combined
        WHERE combined.isAuth = 1 AND combined.user_name = '${data.user_name}'
        ORDER BY combined.createdAt DESC;
        `;
    return sqlConnection.query(sql, callback);
  },
  getUserByMail: (data, callback) => {
    let sql = `SELECT * FROM users WHERE email = '${data.email}' AND isAuth = 1`;
    return sqlConnection.query(sql, callback);
  },
  getUserByName: (data, callback) => {
    let sql = `SELECT * FROM users WHERE user_name = '${data.user_name}' AND isAuth = 1`;
    return sqlConnection.query(sql, callback);
  },
  deleteUser: (data, callback) => {
    let sql = `DELETE FROM users WHERE user_name = '${data.user_name}'`;
    sqlConnection.query(sql, callback);
  },
  setUser: (data, callback) => {
    data.createdAt = moment(data.createdAt, `YYYY-MM-DD HH:mm:ss`).format(
      `YYYY/MM/DD HH:mm:ss`
    );

    const columns = Object.keys(data).join(`, `);
    const values = Object.values(data)
      .map((value) => (typeof value === `string` ? `N'${value}'` : value))
      .join(`, `);

    const sql = `INSERT INTO users (${columns}) VALUES (${values})`;

    return sqlConnection.query(sql, callback);
  },
  updateUser: (data, callback) => {
    let query = [];

    data.user.updatedAt = moment(
      data.user.updatedAt,
      "YYYY-MM-DD HH:mm:ss"
    ).format("YYYY/MM/DD HH:mm:ss");

    Object.keys(data.user).forEach((key) => {
      query.push(`${key} = '${data.user[key]}'`);
    });

    query = query.join(",", "");

    let sql = `UPDATE users SET ${query} WHERE user_name = N'${data.current_user_name}'`;

    console.log(sql);
    return sqlConnection.query(sql, callback);
  },
  setCustomer: (data, callback) => {
    const columns = Object.keys(data).join(`, `);
    const values = Object.values(data)
      .map((value) => (typeof value === `string` ? `N'${value}'` : value))
      .join(`, `);

    const sql = `INSERT INTO customers (${columns}) VALUES (${values})`;

    return sqlConnection.query(sql, callback);
  },
  setStaff: (data, callback) => {
    const columns = Object.keys(data).join(`, `);
    const values = Object.values(data)
      .map((value) => (typeof value === `string` ? `N'${value}'` : value))
      .join(`, `);

    const sql = `INSERT INTO staffs (${columns}) VALUES (${values})`;

    return sqlConnection.query(sql, callback);
  },
  updateStaff: (data, callback) => {
    let query = [];

    Object.keys(data.staff).forEach((key) => {
      query.push(`${key} = N'${data.staff[key]}'`);
    });

    query = query.join(",", "");

    let sql = `UPDATE staffs SET ${query} WHERE user_name = '${data.current_user_name}'`;

    console.log(sql);
    return sqlConnection.query(sql, callback);
  },
  checkDetailTypeUser: (data, callback) => {
    let sql = `SELECT * FROM detail_type_user WHERE user_name = '${data.current_user_name}' AND type_user_id = ' ${data.type_user_id}'`;

    sqlConnection.query(sql, callback);
  },
  setDetailTypeUser: (data, callback) => {
    const columns = Object.keys(data).join(`, `);
    const values = Object.values(data)
      .map((value) => (typeof value === `string` ? `'${value}'` : value))
      .join(`, `);

    const sql = `INSERT INTO detail_type_user (${columns}) VALUES (${values})`;

    return sqlConnection.query(sql, callback);
  },
  deleteDetailTypeUser: (data, callback) => {
    let sql = `DELETE FROM detail_type_user WHERE user_name = '${data.user_name}' AND type_user_id = ${data.type_user_id} `;
    sqlConnection.query(sql, callback);
  },
  updateOnline: (data, callback) => {
    let sql = `UPDATE users SET online = ${data.online} WHERE user_name = '${data.user_name}'`;
    sqlConnection.query(sql, callback);
  },
  searchUser: (data, callback) => {
    let sql = `
      SELECT * FROM (
        SELECT u.user_name,u.avatar,u.email,u.isAuth,u.online,u.createdAt ,u.updatedAt , c.fullname,c.gender, c.province_id,c.province_name, c.district_id,c.district_name, c.ward_id,c.ward_name, c.phone_number, c.address,u.createdAt order_date
        FROM customers c 
        INNER JOIN users u ON u.user_name = c.user_name 
        WHERE u.user_name LIKE '${data.value}%' OR u.email LIKE '${data.value}%' AND u.isAuth = 1 
        UNION ALL 
        SELECT u.user_name,u.avatar,u.email,u.isAuth,u.online,u.createdAt ,u.updatedAt, s.fullname,s.gender, s.province_id, s.province_name, s.district_id,s.district_name, s.ward_id,s.ward_name, s.phone_number, s.address,u.createdAt order_date
        FROM STAFFS s 
        INNER JOIN users u ON u.user_name = s.user_name 
        WHERE u.user_name LIKE '${data.value}%' OR u.email LIKE '${data.value}%' AND u.isAuth = 1 
      ) AS subquery
      ORDER BY order_date DESC
      `;
    sqlConnection.query(sql, callback);
  },
};

module.exports = User;
