"use strict";
const { db } = require("../db");

var Messages = {
  getMsgByRoom: function (data, callback) {
    let sql =
      "SELECT m.*,u.avatar FROM MESSAGES as m INNER JOIN users as u ON m.user_name = u.user_name AND  m.room_id = ? ORDER BY m.id ASC";
    return db.query(sql, [data.room_id], callback);
  },
  getMsgListByUser: function (data, callback) {
    let sql = `SELECT messages.room_id as roomid, messages.body as lastest_msg, messages.user_name as lastest_user_name,
    (SELECT customers.fullname FROM customers INNER JOIN detail_room ON customers.user_name = detail_room.participant AND customers.user_name != ? AND detail_room.room_id = roomid ) as partner_fullname,
    (SELECT users.user_name FROM users INNER JOIN detail_room ON users.user_name = detail_room.participant AND users.user_name != ? AND detail_room.room_id = roomid ) as partner_username,
    (SELECT users.avatar FROM users INNER JOIN detail_room ON users.user_name = detail_room.participant AND users.user_name != ? AND detail_room.room_id = roomid ) as partner_avatar
    FROM messages
    INNER JOIN (
        SELECT MAX(createdAt) AS max_date, room_id
        FROM messages
        GROUP BY room_id
    ) latest_msg
    ON messages.createdAt = latest_msg.max_date AND messages.room_id = latest_msg.room_id
    INNER JOIN detail_room
    ON messages.room_id = detail_room.room_id
    WHERE detail_room.participant = ? 
    GROUP BY messages.room_id
    ORDER BY messages.id DESC;
    `;

    return db.query(
      sql,
      [data.user_name, data.user_name, data.user_name, data.user_name],
      callback
    );
  },
  getMsgList: function (callback) {
    let sql = `SELECT messages.room_id as roomid, messages.body as lastest_msg, messages.user_name as lastest_user_name,messages.createdAt as lastest_time,
    
    (SELECT customers.fullname FROM customers INNER JOIN detail_room ON customers.user_name = detail_room.participant AND customers.user_name != 'admin' AND detail_room.room_id = roomid ) as partner_fullname,
    (SELECT users.avatar FROM users INNER JOIN detail_room ON users.user_name = detail_room.participant AND users.user_name != 'admin' AND detail_room.room_id = roomid ) as partner_avatar,
    (SELECT users.user_name FROM users INNER JOIN detail_room ON users.user_name = detail_room.participant AND users.user_name != 'admin' AND detail_room.room_id = roomid ) as partner_username
    FROM messages
    INNER JOIN (
        SELECT MAX(createdAt) AS max_date, room_id
        FROM messages
        GROUP BY room_id
    ) latest_msg
    ON messages.createdAt = latest_msg.max_date AND messages.room_id = latest_msg.room_id
    INNER JOIN detail_room
    ON messages.room_id = detail_room.room_id
    WHERE detail_room.participant = 'admin'
    GROUP BY messages.room_id
    ORDER BY messages.id DESC
    
    ;
  `;

    return db.query(sql, callback);
  },
  getContactUser: (data, callback) => {
    let sql = `SELECT c.fullname,u.user_name,u.avatar,u.online FROM  users as u INNER JOIN customers as c ON u.user_name = c.user_name  WHERE u.user_name = ?
      UNION ALL
      SELECT s.fullname,u.user_name,u.avatar,u.online FROM  users as u INNER JOIN staffs as s ON u.user_name = s.user_name WHERE u.user_name = ? 
      `;
    return db.query(sql, [data.user_name, data.user_name], callback);
  },
  insertMessage: (data, callback) => {
    console.log(data);
    let sql = "INSERT INTO messages SET ?";
    return db.query(sql, [data], callback);
  },
  insertRoom: (data, callback) => {
    let sql = "INSERT INTO rooms SET ?";
    return db.query(sql, [data], callback);
  },
  insertDetailRoom: (data, callback) => {
    let sql = "INSERT INTO detail_room SET ?";
    return db.query(sql, [data], callback);
  },
  dropRoom: (data, callback) => {
    let sql = "DELETE FROM rooms WHERE id = ?";
    return db.query(sql, [data.room_id], callback);
  },
};

module.exports = Messages;
