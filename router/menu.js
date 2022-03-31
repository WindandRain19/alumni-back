const express = require("express");
const Menu = express.Router();

Menu.get("", (req, res) => {
  if (req.query.status == "普通用户") {
    res.send({
      data: [
        {
          id: 101,
          authName: "校友留言板",
          path: null,
          children: [
            {
              id: 1011,
              authName: "留言板",
              path: "Home/forumFirst",
              children: [],
            },
          ],
        },
        {
          id: 102,
          authName: "校友用户",
          path: null,
          children: [
            {
              id: 1022,
              authName: "个人中心",
              path: "Home/userSecond",
              children: [],
            },
          ],
        },
        {
          id: 103,
          authName: "校友申请",
          path: null,
          children: [
            {
              id: 1031,
              authName: "校友申请",
              path: "Home/requestFirst",
              children: [],
            },
          ],
        },
        {
          id: 104,
          authName: "学校动态",
          path: null,
          children: [
            {
              id: 1041,
              authName: "学校动态",
              path: "Home/stateFirst",
              children: [],
            },
          ],
        },
        {
          id: 105,
          authName: "校友风采",
          path: null,
          children: [
            {
              id: 1051,
              authName: "校友风采",
              path: "Home/showFirst",
              children: [],
            },
          ],
        },
      ],
      status: 200,
      msg: "获取菜单成功",
    });
  } else {
    res.send({
      data: [
        {
          id: 101,
          authName: "校友留言板管理",
          path: null,
          children: [
            // {
            //   id: 1011,
            //   authName: "论坛",
            //   path: "Home/forumFirst",
            //   children: [],
            // },
            {
              id: 1012,
              authName: "留言板管理",
              path: "Home/forumSecond",
              children: [],
            },
          ],
        },
        {
          id: 102,
          authName: "校友用户管理",
          path: null,
          children: [
            {
              id: 1021,
              authName: "用户列表",
              path: "Home/userFirst",
              children: [],
            },
            // {
            //   id: 1022,
            //   authName: "个人中心",
            //   path: "Home/userSecond",
            //   children: [],
            // },
          ],
        },
        {
          id: 103,
          authName: "校友申请管理",
          path: null,
          children: [
            // {
            //   id: 1031,
            //   authName: "校友申请",
            //   path: "Home/requestFirst",
            //   children: [],
            // },
            {
              id: 1032,
              authName: "申请列表",
              path: "Home/requestSecond",
              children: [],
            },
          ],
        },
        {
          id: 104,
          authName: "学校动态管理",
          path: null,
          children: [
            // {
            //   id: 1041,
            //   authName: "学校动态显示",
            //   path: "Home/stateFirst",
            //   children: [],
            // },
            {
              id: 1042,
              authName: "学校动态上传",
              path: "Home/stateSecond",
              children: [],
            },
          ],
        },
        {
          id: 105,
          authName: "校友风采管理",
          path: null,
          children: [
            // {
            //   id: 1051,
            //   authName: "校友风采",
            //   path: "Home/showFirst",
            //   children: [],
            // },
            {
              id: 1052,
              authName: "校友风采管理",
              path: "Home/showSecond",
              children: [],
            },
          ],
        },
      ],
      status: 200,
      msg: "获取菜单成功",
    });
  }
});

module.exports = Menu;
