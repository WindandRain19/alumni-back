const express = require("express");
const RequestFirst = express.Router();
const db = require("./mysql");
const dayjs = require("dayjs");

// 校友申请提交
RequestFirst.post("", (req, res) => {
  let body = req.body.form;
  let number = req.body.number
  console.log(body);
  const sql = `insert into request(name,number,user,telephone,region,date1,date2,type,introduction,status) values ('${body.name}',${number},'${body.user}','${body.telephone}','${body.region}','${body.date1}','${body.date2}','${body.type}','${body.introduction}','未通过')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      let meta = { status: 201, msg: "添加失败" };
      res.send({
        meta,
      });
    } else {
      let meta = { status: 200, msg: "添加成功" };
      res.send({
        meta,
      });
    }
  });
});

module.exports = RequestFirst;
