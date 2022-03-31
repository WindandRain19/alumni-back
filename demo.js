const express = require("express");
// post
const bodyParser = require("body-parser");
// 日期解析
const dayjs = require("dayjs");
const app = express();
// 引入数据库插件
const path = require("path");
// 跨域
const cors = require("cors");
const Connection = require("mysql/lib/Connection");
const { Dayjs } = require("dayjs");
// 文件处理

const mysql = require("mysql");
// const Connection = require("mysql/lib/Connection");
app.use(cors());
const multer = require("multer");
const fs = require("fs");
const url = require("url");
const mine = require("mime");
app.use(express.static(__dirname));

var multiparty = require("multiparty");

const Menu = require("./router/Menu");
const Login = require("./router/Login");
const Register = require("./router/Register");
const Options = require("./router/Options");
const UserFirst = require("./router/UserFirst");
const UserSecond = require("./router/UserSecond");
const RequestFirst = require("./router/RequestFirst");
const RequestSecond = require("./router/RequestSecond");

const StateSecond = require("./router/StateSecond");
const ShowFirst = require("./router/ShowFirst");
const showSecond = require("./router/showSecond");

const ForumSecond = require("./router/ForumSecond");

// post请求解析
app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());

// 菜单
app.use("/menus", Menu);
// 登录
app.use("/Login", Login);
// 注册
app.use("/Register", Register);
// 学院学校
app.use("/Options", Options);
//用户列表
app.use("/Home/userFirst", UserFirst);
// 个人中心
app.use("/Home/UserSecond", UserSecond);
// 校友申请
app.use("/Home/requestFirst", RequestFirst);
// 校友申请列表
app.use("/Home/requestSecond", RequestSecond);

// 学校动态上传
app.use("/Home/stateSecond", StateSecond);
//校友风采
app.use("/Home/showFirst", ShowFirst);
//校友风采管理
app.use("/Home/showSecond", showSecond);

// 论坛管理
app.use("/Home/ForumSecond", ForumSecond);

app.listen(5001, () => {
  console.log("端口5001的服务器已经打开");
});
