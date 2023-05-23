"use strict";

const Bill = require("../models/Bill");

var fs = require("fs");
const { json } = require("express");
var uuidv1 = require("uuidv1");
module.exports = {
  getBill: (req, result) => {
    Bill.getBill((err, res) => {
      if (err) return result.status(500).json(err);
      return result.status(200).json(res);
    });
  },
  getSortBill: (req, result) => {
    const { index } = req.body;

    if (index == "all") {
      Bill.getBill((err, res) => {
        if (err) return result.status(500).json(err);
        return result.status(200).json(res);
      });
    } else if (index == "createdAt") {
      Bill.getBillCreatedAtASC((err, res) => {
        if (err) return result.status(500).json(err);
        return result.status(200).json(res);
      });
    } else if (index == "payed_success") {
      Bill.getBillByPayedStatement(1, (err, res) => {
        if (err) return result.status(500).json(err);
        return result.status(200).json(res);
      });
    } else if (index == "payed_pending") {
      Bill.getBillByPayedStatement(0, (err, res) => {
        if (err) return result.status(500).json(err);
        return result.status(200).json(res);
      });
    } else {
      Bill.getBillByStatement(index, (err, res) => {
        if (err) return result.status(500).json(err);
        return result.status(200).json(res);
      });
    }
  },
  getBillByUserName: (req, result) => {
    const { user_name } = req.body;
    console.log(user_name);
    Bill.getBillByUserName(user_name, (err, bills) => {
      if (err) return result.status(500).json(err);
      return result.status(200).json(bills);
    });
  },
  getDetailBill: (req, result) => {
    const { bill_id } = req.body;

    Bill.getBillById(bill_id, (err, bill) => {
      console.log(err);
      if (err) return result.status(500).json(err);
      Bill.getDetailBill(bill_id, (err, detail_bill) => {
        console.log(err);
        if (err) return result.status(500).json(err);
        return result.status(200).json({
          bill: bill[0],
          detail_bill: detail_bill,
        });
      });
    });
  },
  updateStatementBill: (req, result) => {
    const data = req.body;

    if (data.bill_statement == "ship_success") {
      Bill.updateStatementBill(data, (err, res) => {
        if (err) return result.status(500).json(err);
        Bill.updatePayedBill(data.id, (err, res) => {
          if (err) return result.status(500).json(err);

          return result.status(200).json(data.bill_statement);
        });
      });
    } else {
      Bill.updateStatementBill(data, (err, res) => {
        console.log(err);
        if (err) return result.status(500).json(err);
        console.log("Thành công");
        return result.status(200).json(data.bill_statement);
      });
    }
  },
  updatePayedBill: (req, result) => {
    const { id } = req.body;

    Bill.updatePayedBill(id, (err, res) => {
      if (err) return result.status(500).json(err);
      console.log("Thành công");
      return result.status(200).json("UPDATE_SUCCESS");
    });
  },
  searchBill: (req, result) => {
    const data = req.body;

    Bill.searchBill(data, (err, bills) => {
      if (err) throw err;
      return result.status(200).json(bills);
    });
  },
  checkout: (req, result) => {
    const bill_id = uuidv1().replaceAll("-", "");
    const { bill, detail_bill } = req.body;
    bill.id = bill_id;
    bill.bill_statement = "pending";
    bill.createdAt = new Date();

    Bill.insertBill(bill, (err, res) => {
      console.log(err);
      if (err) return result.status(500).json(err);
      detail_bill.forEach((item) => {
        const data = {
          detail_product_id: item.detail_product_id || item.id,
          quantity: item.quantity,
          bill_id: bill_id,
        };

        Bill.insertDetailBill(data, (err, res) => {
          console.log(err);
          if (err) return result.status(500).json(err);
        });
      });
      Bill.getBillById(bill_id, (err, bill) => {
        if (err) return result.status(500).json(err);
        Bill.getDetailBillById(bill_id, (err, detail_bill) => {
          console.log(err);
          if (err) return result.status(500).json(err);
          result.status(200).json({
            bill: bill[0],
            detail_bill: detail_bill,
          });
        });
      });
    });
  },
};
