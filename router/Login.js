const express = require("express");

const Login = express.Router();

const db = require("./mysql");

Login.post("", (req, res) => {
  const body = req.body;
  const sql1 = `select * from user where number = '${body.number}'`;
  db.query(sql1, (err, result) => {
    if (result.length == 0) {
      let meta = {
        msg: "用户不存在",
        status: 202,
      };
      res.send({
        meta,
      });
    } else if (result[0].password == body.password) {
      let meta = {
        msg: "用户存在切密码正确",
        status: 200,
      };
      res.send({
        meta,
        token: "123",
        data: result,
      });
    } else {
      let meta = {
        msg: "密码错误",
        status: 203,
      };
      res.send({
        meta,
      });
    }
  });
});

module.exports = Login;
