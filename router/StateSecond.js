const express = require("express");
const StateSecond = express.Router();
const db = require("./mysql");
const dayjs = require("dayjs");
const multer = require("multer");
const fs = require("fs");

//将pdf文件存进数据库
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "C:/Users/YF/Desktop/校友管理信息系统/back/" + "/upload/doc");
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
// 动态查询
const upload = multer({ storage });
StateSecond.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log(file);
  const time = dayjs().format("YYYY-MM-DD HH:mm");
  file.originalname = file.originalname.replace(".pdf", "");
  const sql = `insert into state(pdfName,filename,time,path) values ('${file.originalname}','${file.filename}','${time}','${file.path}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
    }
  });
});

// 获取动态列表
StateSecond.get("", (req, res) => {
  let query = req.query;
  if (query.query == "") {
    let pageNum = Number(query.pageNum);
    let pageSize = Number(query.pageSize);
    let start = (pageNum - 1) * pageSize;
    let total = null;
    const sql = `select * from state limit ${start},${pageSize}`;
    const sql1 = `select count(*) total from state`;
    const sql2 = `select * from state`;
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
        result[i].time = dayjs(result[i].time).format("YYYY-MM-DD HH:mm");
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
 
    const sql2 = `select * from state`;
    db.query(sql2, (err, result) => {
      console.log(result);
      let meta = {};
      if (err) {
        return (meta = { status: 0, msg: "失败" });
      }
      for (let i = 0; i < result.length; i++) {
        result[i].time = dayjs(result[i].time).format("YYYY-MM-DD HH:mm");
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

// 展示修改
StateSecond.get("/:id", (req, res) => {
  const sql = `select * from state where id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
      let meta = {
        status: 201,
        msg: "查询失败",
      };
      res.send({ meta });
    } else {
      let meta = {
        status: 200,
        msg: "查询成功",
      };
      res.send({ meta, data: result });
    }
  });
});

// 修改更新
StateSecond.put("/:id", (req, res) => {
  let body = req.body;
  const sql = `update state set pdfName = '${body.pdfName}' where id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
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

// 删除
StateSecond.delete("/:id", (req, res) => {
  let params = req.params;
  const sql = `select * from state where id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    fs.unlink(`C:/Users/YF/Desktop/校友管理信息系统/back/upload/doc/${result[0].filename}`, function (err) {
      if (err) {
        console.log(err);
        let meta = {
          status: 201,
          msg: "删除失败",
        };
        res.send({ meta });
      } else {
        const sql1 = `delete from state where id = '${params.id}'`;
        db.query(sql1, (err, result) => {
          if (err) {
            console.log(err.message);
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
      }
    });
  });
});

module.exports = StateSecond;
