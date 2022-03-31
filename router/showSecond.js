const express = require("express");
const showSecond = express.Router();
const db = require("./mysql");
const multer = require("multer");
const dayjs = require("dayjs");
// 提交校友风采
let showName = "";
showSecond.post("", (req, res) => {
  let query = req.body;
  showName = query.name;
  const time = dayjs().format("YYYY-MM-DD HH:mm");
  const sql = `insert into show1(name,info,picName,pdfName,time) values ('${query.name}','${query.info}',1,1,'${time}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
      let meta = {
        status: 201,
        msg: "插入数据库失败",
      };
      res.send({ meta });
    } else {
      let meta = {
        status: 200,
        msg: "插入数据库成功",
      };
      res.send({ meta });
    }
  });
});
//风采提交pdf文件
const storage1 = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "C:/Users/YF/Desktop/校友管理信息系统/back/" + "/upload/pic/pic1");
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
const upload1 = multer({ storage: storage1 });
//风采提交pic文件
const storage2 = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "C:/Users/YF/Desktop/校友管理信息系统/back/" + "/upload/doc2");
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
const upload2 = multer({ storage: storage2 });
showSecond.post("/upload1", upload1.single("file"), (req, res) => {
  let picName = req.file.originalname;
  const sql = `update show1 set picName = '${picName}' where name = '${showName}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("@", err.message);
    } else {
      console.log("成功@");
    }
  });
});
showSecond.post("/upload2", upload2.single("file"), (req, res) => {
  let pdfName = req.file.originalname;
  const sql = `update show1 set pdfName = '${pdfName}' where name = '${showName}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("@@", err.message);
    } else {
      console.log("成功@@");
    }
  });
});

// 获取列表
showSecond.get("/:id", (req, res) => {
  const sql = `select * from show1 where id = '${req.params.id}'`;
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

// 更新
showSecond.put("/:id", (req, res) => {
  let body = req.body;
  const sql = `update show1 set name = '${body.name}',info = '${body.info}' where id = '${req.params.id}'`;
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
showSecond.delete("/:id", (req, res) => {
  let params = req.params;
  const sql = `select * from show1 where id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    fs.unlink(
      `C:/Users/YF/Desktop/校友管理信息系统/back/upload/pic/pic1/${result[0].picName}`,
      function (err) {
        if (err) {
          let meta = {
            status: 201,
            msg: "删除失败",
          };
          res.send({ meta });
        } else {
          fs.unlink(
            `C:/Users/YF/Desktop/校友管理信息系统/back/upload/doc2/${result[0].pdfName}`,
            function (err) {
              if (err) {
                let meta = {
                  status: 201,
                  msg: "删除失败",
                };
                res.send({ meta });
              } else {
                const sql1 = `delete from show1 where id = '${params.id}'`;
                db.query(sql1, (err, result) => {
                  if (err) {
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
            }
          );
        }
      }
    );
  });
});

module.exports = showSecond;
