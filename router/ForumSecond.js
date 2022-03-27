const express = require("express");
const ForumSecond = express.Router();
const db = require("./mysql");
const multer = require("multer");
const fs = require("fs");
const dayjs = require("dayjs");

//获取论坛列表
ForumSecond.get("", (req, res) => {
  const sql = `select * from forum`;
  db.query(sql, (err, result) => {
    if (err) {
      let meta = {
        msg: "论坛获取数据失败",
        status: 201,
      };
      res.send({ meta });
    } else {
      let meta = {
        msg: "论坛获取数据成功",
        status: 200,
      };
      let data = result;
      res.send({ meta, data });
    }
  });
});

const storage4 = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(
      null,
      "C:/Users/YF/Desktop/校友管理信息系统/back/" + "/upload/forum/pic1"
    );
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
const upload4 = multer({ storage: storage4 });
ForumSecond.post("/upload1", upload4.single("file"), (req, res) => {
  let pic1 = req.file.originalname;
  const sql = `update forum set pic1 = '${pic1}' where time = '${time}'`;
  db.query(sql, (err, result) => {});
});

const storage5 = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(
      null,
      "C:/Users/YF/Desktop/校友管理信息系统/back/" + "/upload/forum/pic2"
    );
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
const upload5 = multer({ storage: storage5 });
ForumSecond.post("/upload2", upload5.single("file"), (req, res) => {
  let pic2 = req.file.originalname;
  const sql = `update forum set pic2 = '${pic2}' where time = '${time}'`;
  db.query(sql, (err, result) => {});
});

const storage6 = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(
      null,
      "C:/Users/YF/Desktop/校友管理信息系统/back/" + "/upload/forum/pic3"
    );
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
const upload6 = multer({ storage: storage6 });
ForumSecond.post("/upload3", upload6.single("file"), (req, res) => {
  let pic3 = req.file.originalname;
  const sql = `update forum set pic3 = '${pic3}' where time = '${time}'`;
  db.query(sql, (err, result) => {});
});

const storage7 = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(
      null,
      "C:/Users/YF/Desktop/校友管理信息系统/back/" + "/upload/forum/pic4"
    );
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
const upload7 = multer({ storage: storage7 });
ForumSecond.post("/upload4", upload7.single("file"), (req, res) => {
  let pic4 = req.file.originalname;
  const sql = `update forum set pic4 = '${pic4}' where time = '${time}'`;
  db.query(sql, (err, result) => {});
});

// 文字发布
ForumSecond.post("", (req, res) => {
  let body = req.body;
  let userData = 0;
  let time = dayjs().format("YYYY-MM-DD hh:mm:ss");
  const sql1 = `select * from user where number = ${body.number}`;
  db.query(sql1, (err, result) => {
    if (err) {
      let meta = {
        msg: "文字发布插入失败",
        status: 201,
      };
      res.send({ meta });
    } else {
      userData = result[0];
      const sql = `insert into forum(number,article,time,name,photo) values('${body.number}','${body.data.article}','${time}','${userData.name}','${userData.photo}')`;
      db.query(sql, (err, result) => {
        if (err) {
          let meta = {
            msg: "文字发布插入失败",
            status: 201,
          };
          res.send({ meta });
        } else {
          let meta = {
            msg: "文字发布插入成功",
            status: 200,
          };
          res.send({ meta });
        }
      });
    }
  });
});

// 图文发布
let time = "";
ForumSecond.post("/up", (req, res) => {
  let body = req.body;
  let userData = 0;
  time = dayjs().format("YYYY-MM-DD hh:mm:ss");
  const sql1 = `select * from user where number = ${body.number}`;
  db.query(sql1, (err, result) => {
    if (err) {
      let meta = {
        msg: "图文发布插入失败",
        status: 201,
      };
      res.send({ meta });
    } else {
      userData = result[0];
      const sql = `insert into forum(number,article,time,name,photo) values('${body.number}','${body.data.article}','${time}','${userData.name}','${userData.photo}')`;
      db.query(sql, (err1, result1) => {
        if (err1) {
          let meta = {
            msg: "图文发布插入失败",
            status: 201,
          };
          res.send({ meta });
        } else {
          let meta = {
            msg: "图文发布插入成功",
            status: 200,
          };
          res.send({ meta });
        }
      });
    }
  });
});

// 删除
ForumSecond.delete("/:idforum", (req, res) => {
  let params = req.params;
  let err1 = false;
  let err2 = false;
  let err3 = false;
  let err4 = false;
  const sql = `select * from forum where idforum = '${req.params.idforum}'`;
  db.query(sql, (err, result) => {
    if (result[0].pic1 == null) {
      err1 = true;
    } else {
      fs.unlink(
        `C:/Users/YF/Desktop/校友管理信息系统/back/upload/forum/pic1/${result[0].pic1}`,
        (err) => {
          if (err) {
            err1 = false;
          } else {
            err1 = true;
          }
        }
      );
    }
    if (result[0].pic2 == null) {
      err2 = true;
    } else {
      fs.unlink(
        `C:/Users/YF/Desktop/校友管理信息系统/back/upload/forum/pic2/${result[0].pic2}`,
        (err) => {
          if (err) {
            err2 = false;
          } else {
            err2 = true;
          }
        }
      );
    }
    if (result[0].pic3 == null) {
      err3 = true;
    } else {
      fs.unlink(
        `C:/Users/YF/Desktop/校友管理信息系统/back/upload/forum/pic3/${result[0].pic3}`,
        (err) => {
          if (err) {
            err3 = false;
          } else {
            err3 = true;
          }
        }
      );
    }
    if (result[0].pic4 == null) {
      err4 = true;
    } else {
      fs.unlink(
        `C:/Users/YF/Desktop/校友管理信息系统/back/upload/forum/pic4/${result[0].pic4}`,
        (err) => {
          if (err) {
            err4 = false;
          } else {
            err4 = true;
          }
        }
      );
    }

    if (err1 || err2 || err3 || err4) {
      const sql1 = `delete from forum where idforum = '${req.params.idforum}'`;
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
    } else {
      let meta = {
        status: 201,
        msg: "删除失败",
      };
      res.send({ meta });
    }
  });
});

ForumSecond.post("/give", (req, res) => {
  let give = req.body.give + 1;
  const sql = `update forum set give = '${give}' where time = '${req.body.time}'`;
  db.query(sql, (err, result) => {
    if (!err) {
      let meta = {
        msg: "点赞成功",
        status: 200,
      };
      res.send({ meta });
    }
  });
});

module.exports = ForumSecond;
