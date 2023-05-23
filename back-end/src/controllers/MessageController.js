"use strict";

const Messages = require("../models/Messages");
const MOMENT = require("moment");
var fs = require("fs");
const { json } = require("express");
var filePath = "public/resource/ProductImages/";

module.exports = {
  getMsgByRoom: (req, res) => {
    const data = req.body;
    Messages.getMsgByRoom(data, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getMsgListByUser: (req, res) => {
    const data = req.body;

    Messages.getMsgListByUser(data, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getMsgList: (req, res) => {
    Messages.getMsgList((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getContactUser: (req, res) => {
    const data = req.body;
    console.log(data);
    Messages.getContactUser(data, (err, response) => {
      if (err) throw err;
      console.log(response);
      return res.json(response);
    });
  },
  insertMessage: (req, res) => {
    const data = req.body;
    data.createdAt = new Date();

    Messages.insertMessage(data, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  insertRoom: (req, res) => {
    const data = req.body;
    const room = {
      room_name: data.room_name,
    };

    Messages.insertRoom(room, (err, response) => {
      if (err) throw err;
      const detail_room_participant = {
        participant: data.participant,
        room_id: response.insertId,
      };
      const detail_room_admin = {
        participant: "admin",
        room_id: response.insertId,
      };
      const message = {
        body: "Xin chào Admin, tôi cần hỗ trợ",
        user_name: data.participant,
        room_id: response.insertId,
        createdAt: new Date(),
      };
      Messages.insertDetailRoom(detail_room_participant, (err, response) => {
        if (err) throw err;
        Messages.insertDetailRoom(detail_room_admin, (err, response) => {
          if (err) throw err;
          Messages.insertMessage(message, (err, response) => {
            if (err) throw err;
            return res.json(response);
          });
        });
      });
    });
  },
  dropRoom: (req, res) => {
    const data = req.body;

    Messages.dropRoom(data, (err, response) => {
      console.log(data);
      if (err) throw err;
      return res.json(response);
    });
  },
};
