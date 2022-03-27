const express = require("express");
const UserFirst = express.Router();
const db = require("./mysql");

// 分页管理
UserFirst.get("", (req, res) => {
  let query = req.query;
  if (query.query == "") {
    let pageNum = Number(query.pageNum);
    let pageSize = Number(query.pageSize);
    let start = (pageNum - 1) * pageSize;
    let total = null;
    const sql = `select * from user limit ${start},${pageSize}`;
    const sql1 = `select count(*) total from user`;
    const sql2 = `select * from user`;
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
    const sql2 = `select * from user`;
    db.query(sql2, (err, result) => {
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

// 添加用户管理
UserFirst.post("/:number", (req, res) => {
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

// 修改用户信息
UserFirst.get("/:number", (req, res) => {
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

// 修改更新
UserFirst.put("/:number", (req, res) => {
  let body = req.body;
  const sql = `update user set name = '${body.name}' , college = '${body.college}' , class = '${body.class}' , telephone = '${body.telephone}' , title = '${body.title}' where number = '${body.number}'`;
  db.query(sql, (err, result) => {
    if (err) {
      let meta = {
        status: 201,
        msg: "更新失败",
      };
      res.send({ meta });
    } else {
      let meta = {
        status: 200,
        msg: "更新成功",
      };
      res.send({ meta });
    }
  });
});

// 删除用户信息
UserFirst.delete("/:number", (req, res) => {
  params = req.params;
  const sql = `delete from user where number = '${params.number}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      let meta = {
        status: 201,
        msg: "删除失败",
      };
      res.send({ meta });
    } else {
      let meta = {
        status: 200,
        msg: "删除成功",
      };
      res.send({ meta });
    }
  });
});

// 角色分配更新
UserFirst.put("/up", (req, res) => {
  console.log(req.body);
  let body = req.body;
  const sql = `update user set status = '${body.status}' where number = '${body.number}'`;
  db.query(sql, (err, result) => {
    if (err) {
      let meta = {
        status: 201,
        msg: "角色分配失败",
      };
      res.send({ meta });
    } else {
      let meta = {
        status: 200,
        msg: "角色分配成功",
      };
      res.send({ meta });
    }
  });
});

module.exports = UserFirst;
