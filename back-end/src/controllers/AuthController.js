"use strict";

const User = require("../models/User");
const bcrypt = require("bcrypt");
var uuidv1 = require("uuidv1");
const Auth = require("../models/Auth");

module.exports = {
  authen: async (req, result) => {
    const data = req.body;

    Auth.deleteTokenExpired((err, res) => {
      if (err) throw err;
      Auth.getToken(data, (err, res) => {
        if (err) throw err;
        if (res.length) {
          Auth.authUser(data, (err, res) => {
            if (!err) {
              Auth.deleteToken(data, (err, res) => {
                if (!err) {
                  return result.status(200).json("Xác thực thành công");
                } else {
                  return result.status(400).json("Xác thực token thất bại");
                }
              });
            } else {
              return result.status(400).json("Xác thực token thất bại");
            }
          });
        } else {
          return result.status(400).json("Xác thực token thất bại");
        }
      });
    });
  },
};
