const express = require("express");
const RequestSecond = express.Router();
const db = require("./mysql");
const dayjs = require("dayjs");

// 校友申请列表
RequestSecond.get("", (req, res) => {
  let query = req.query;
  if (query.query == "") {
    let pageNum = Number(query.pageNum);
    let pageSize = Number(query.pageSize);
    let start = (pageNum - 1) * pageSize;
    let total = null;
    const sql = `select * from request limit ${start},${pageSize}`;
    const sql1 = `select count(*) total from request`;
    const sql2 = `select * from request`;
    db.query(sql1, (err, result) => {
      total = result[0];
    });
    db.query(sql, (err, result) => {
      let meta = {};
      if (err) {
        return (meta = { status: 0, msg: "失败" });
      }
      meta = { status: 200, msg: "成功" };
      for (let i = 0; i < result.length; i++) {
        result[i].date1 = dayjs(result[i].date1).format("YYYY-MM-DD");
      }
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
    const sql2 = `select * from request`;
    db.query(sql2, (err, result) => {
      let meta = {};
      if (err) {
        return (meta = { status: 0, msg: "失败" });
      }
      for (let i = 0; i < result.length; i++) {
        result[i].date1 = dayjs(result[i].date1).format("YYYY-MM-DD");
      }
      let filterResult = result.filter((item) => {
        return item.user == query.query;
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

// 显示修改申请列表
RequestSecond.get("/:user", (req, res) => {
  let params = req.params;
  const sql = `select * from request where user = '${params.user}'`;
  db.query(sql, (err, result) => {
    if (err) {
      let meta = {
        status: 201,
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
      let data = result;
      res.send({
        data,
        meta,
      });
    }
  });
});

// 确认提交修改申请列表
RequestSecond.put("/:user", (req, res) => {
  let body = req.body;
  body.date1 = dayjs(body.date1).format("YYYY-MM-DD");
  const sql = `update request set name = '${body.name}' , telephone = '${body.telephone}' , region = '${body.region}' , date1 = '${body.date1}' , date2 = '${body.date2}', type = '${body.type}', introduction = '${body.introduction}' where user = '${body.user}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
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

// 删除申请
RequestSecond.delete("/:user", (req, res) => {
  params = req.params;
  const sql = `delete from request where user = '${params.user}'`;
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

// 申请
RequestSecond.get("/change/:id",(req,res)=>{
  const sql = `select * from request where idrequest='${req.params.id}'`
  db.query(sql,(err,result)=>{
    if (err) {
      let meta = {
        msg:'change查询失败',
        status:201
      }
      res.send({meta})
    }else{
      let meta = {
        msg:'change查询成功',
        status:200
      }
      res.send({meta,data:result})
    }
  })
})

// 申请状态
RequestSecond.post("/change",(req,res)=>{
  const sql = `update request set status='${req.body.status}' where idrequest='${req.body.idrequest}'`
  db.query(sql,(err,result)=>{
    if (err) {
      console.log(err);
      let meta = {
        msg:'change查询失败',
        status:201
      }
      res.send({meta})
    }else{
      let meta = {
        msg:'change查询成功',
        status:200
      }
      res.send({meta})
    }
  })
})

// 获取个人中心列表
RequestSecond.get("/user/:number",(req,res)=>{
  const sql = `select * from request where number = '${req.params.number}'`
  db.query(sql,(err,result)=>{
    if (err) {
      console.log(err);
      let meta= {
        msg:'个人查询申请失败',
        status:201
      }
      res.send({meta})
    }else{
      let meta= {
        msg:'个人查询申请成功',
        status:200
      }
      for (let i = 0; i < result.length; i++) {
        result[i].date1 = dayjs(result[i].date1).format("YYYY-MM-DD");
      }
      res.send({meta,data:result})
    }
  })
})
module.exports = RequestSecond;
