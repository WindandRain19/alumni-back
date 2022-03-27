const express = require("express");
const Options = express.Router();

Options.get("", (req, res) => {
  res.send({
    data: [
      {
        value: "智能制造学院",
        label: "智能制造学院",
        children: [
          {
            value: "信息管理与信息系统",
            label: "信息管理与信息系统",
          },
          {
            value: "计算机科学与技术",
            label: "计算机科学与技术",
          },
          {
            value: "物联网工程",
            label: "物联网工程",
          },
          {
            value: "数字媒体技术",
            label: "数字媒体技术",
          },
          {
            value: "机械设计制造及其自动化",
            label: "机械设计制造及其自动化",
          },
          {
            value: "汽车服务工程",
            label: "汽车服务工程",
          },
          {
            value: "电气化工程及其自动化",
            label: "电气化工程及其自动化",
          },
          {
            value: "电子信息工程",
            label: "电子信息工程",
          },
        ],
      },
      {
        value: "建筑工程学院",
        label: "建筑工程学院",
        children: [
          {
            value: "土木工程",
            label: "土木工程",
          },
          {
            value: "安全工程",
            label: "安全工程",
          },
          {
            value: "工程管理",
            label: "工程管理",
          },
          {
            value: "园林",
            label: "园林",
          },
          {
            value: "城乡规划",
            label: "城乡规划",
          },
        ],
      },
      {
        value: "经济与金融学院",
        label: "经济与金融学院",
        children: [
          {
            value: "经济学",
            label: "经济学",
          },
          {
            value: "经济学（国际班）",
            label: "经济学（国际班）",
          },
          {
            value: "国际经济与贸易",
            label: "国际经济与贸易",
          },
          {
            value: "国际经济与贸易（国际班）",
            label: "国际经济与贸易（国际班）",
          },
          {
            value: "金融工程",
            label: "金融工程",
          },
          {
            value: "国际商务",
            label: "国际商务",
          },
          {
            value: "电子商务",
            label: "电子商务",
          },
        ],
      },
      {
        value: "管理学院",
        label: "管理学院",
        children: [
          {
            value: "工商管理",
            label: "工商管理",
          },
          {
            value: "市场营销",
            label: "市场营销",
          },
          {
            value: "公共事业管理",
            label: "公共事业管理",
          },
          {
            value: "旅游管理",
            label: "旅游管理",
          },
          {
            value: "酒店管理",
            label: "酒店管理",
          },
        ],
      },
      {
        value: "会计学院",
        label: "会计学院",
        children: [
          {
            value: "会计学",
            label: "会计学",
          },
          {
            value: "会计学（ACCA班）",
            label: "会计学（ACCA班）",
          },
          {
            value: "财务管理",
            label: "财务管理",
          },
          {
            value: "审计学",
            label: "审计学",
          },
        ],
      },
      {
        value: "外国语学院",
        label: "外国语学院",
        children: [
          {
            value: "英语",
            label: "英语",
          },
          {
            value: "法语",
            label: "法语",
          },
          {
            value: "日语",
            label: "日语",
          },
          {
            value: "翻译",
            label: "翻译",
          },
          {
            value: "商务英语",
            label: "商务英语",
          },
        ],
      },
      {
        value: "教育学院",
        label: "教育学院",
        children: [
          {
            value: "小学教育",
            label: "小学教育",
          },
        ],
      },
      {
        value: "文化传媒学院",
        label: "文化传媒学院",
        children: [
          {
            value: "汉语国际教育",
            label: "汉语国际教育",
          },
        ],
      },
      {
        value: "美术与设计学院",
        label: "美术与设计学院",
        children: [
          {
            value: "服装设计与工程",
            label: "服装设计与工程",
          },
          {
            value: "动画",
            label: "动画",
          },
          {
            value: "视觉传达设计",
            label: "视觉传达设计",
          },
          {
            value: "环境设计",
            label: "环境设计",
          },
          {
            value: "产品设计",
            label: "产品设计",
          },
          {
            value: "服装与服饰设计",
            label: "服装与服饰设计",
          },
          {
            value: "舍友",
            label: "舍友",
          },
        ],
      },
      {
        value: "音乐舞蹈学院",
        label: "音乐舞蹈学院",
        children: [
          {
            value: "音乐学",
            label: "音乐学",
          },
          {
            value: "舞蹈编导",
            label: "舞蹈编导",
          },
        ],
      },
    ],
  });
});

module.exports = Options;
