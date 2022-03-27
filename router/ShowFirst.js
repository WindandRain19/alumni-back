const express = require("express");
const ShowFirst = express.Router();
const db = require("./mysql");

ShowFirst.get("", (req, res) => {
  let query = req.query;
  if (query.query == "") {
    let pageNum = Number(query.pageNum);
    let pageSize = Number(query.pageSize);
    let start = (pageNum - 1) * pageSize;
    let total = null;
    const sql = `select * from show1 limit ${start},${pageSize}`;
    const sql1 = `select count(*) total from show1`;
    const sql2 = `select * from show1`;
    db.query(sql1, (err, result) => {
      total = result[0];
    });
    db.query(sql, (err, result) => {
      let meta = {};
      if (err) {
        return (meta = { status: 0, msg: "失败" });
      }
      meta = { status: 200, msg: "成功" };
      let data = result;
      res.send({
        data,
        total: total.total,
        meta,
      });
    });
  } else {
    let pageNum = 1;
    let pageSize = 1;
    let total = 1;
    const sql2 = `select * from show1`;
    db.query(sql2, (err, result) => {
      console.log(result);
      let meta = {};
      if (err) {
        return (meta = { status: 0, msg: "失败" });
      }
      let filterResult = result.filter((item) => {
        return item.name == query.query;
      });
      meta = { status: 200, msg: "成功" };
      res.send({
        data: filterResult,
        total: total,
        meta,
      });
    });
  }
});

module.exports = ShowFirst;
