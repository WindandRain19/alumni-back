const express = require("express");
const UserSecond = express.Router();
const db = require("./mysql");
const dayjs = require("dayjs");

// 查询个人信息
UserSecond.get("/:number", (req, res) => {
  number = req.params.number;
  const sql = `select * from user where number='${number}'`;
  db.query(sql, (err, result) => {
    if (err) {
      let meta = {
        status: 200,
        msg: "查询失败",
      };
      res.send({
        meta,
      });
    } else {
      let meta = {
        status: 200,
        msg: "查询成功",
      };
      res.send({
        data: result,
        meta,
      });
    }
  });
});

// 修改个人信息
UserSecond.put("/up/:number", (req, res) => {
  let body = req.body;
  let time = dayjs(body.time).format("YYYY-MM-DD");
  const sql = `update user set name = '${body.name}',password = '${body.password}',telephone = '${body.telephone}',title = '${body.title}',company = '${body.company}', address = '${body.address}',photo = '${body.photo}',time = '${time}',work_address = '${body.work_address}',college = '${body.collegeClass[0]}',class = '${body.collegeClass[1]}',status = '${body.status}' where number = '${body.number}'`;
  db.query(sql, (err, result) => {
    if (err) {
      let meta = {
        status: 200,
        msg: "更新失败",
      };
      res.send({
        meta,
      });
    } else {
      let meta = {
        status: 200,
        msg: "更新成功",
      };
      res.send({
        data: result,
        meta,
      });
    }
  });
});

module.exports = UserSecond;
