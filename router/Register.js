const express = require("express");

const Register = express.Router();

const db = require("./mysql");
const dayjs = require("dayjs");
const multer = require("multer");

let number = "";
Register.post("", (req, res) => {
  let body = req.body;
  number = body.number;
  let college = body.collegeClass[0];
  let class1 = body.collegeClass[1];
  let time = dayjs(body.time).format("YYYY-MM-DD");
  const sql1 = `select * from user where number = '${body.number}'`;
  const sql = `insert into user(name,number,sex,password,telephone,title,company,address,photo,time,work_address,college,class,status) values ('${body.name}','${body.number}','${body.sex}','${body.password}','${body.telephone}','${body.title}','${body.company}','${body.address}','1','${time}','${body.work_address}','${college}','${class1}','普通用户')`;
  db.query(sql1,(req,result)=>{
    if (result.length == 1) {
      let meta = {
        msg: "用户已存在",
        status: 202,
      };
      res.send({
        meta,
      });
    } else{
      db.query(sql, (err, result1) => {
        if (err) {
          console.log(err.message);
          let meta = {
            message: "注册插入失败",
            status: 201,
          };
          res.send({ meta });
        } else {
          let meta = {
            message: "注册插入成功",
            status: 200,
          };
          res.send({ meta });
        }
      });
    }
  })

});

// 头像上传
const storage3 = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "C:/Users/YF/Desktop/校友管理信息系统/back/" + "upload/pic/pic2");
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const upload3 = multer({ storage: storage3 });

Register.post("/upload", upload3.single("file"), (req, res) => {
  let picName = req.file.originalname;
  const sql = `update user set photo = '${picName}' where number = '${number}'`;
  db.query(sql, (err, result) => {
    console.log(1);
    if (err) {
      console.log("@", err.message);
    } else {
      console.log("成功@");
    }
  });
});

module.exports = Register;
