// 引入express框架
const express = require('express')
// 解析参数格式
const bodyParser = require('body-parser')
// 跨域
const cors = require('cors')
// 文件路径
const path = require('path')
// 操作cookie模块
const cookieParser = require('cookie-parser');
// 实例化
const app = express()
// 解决跨域问题
app.use(cors());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// 解析 application/json
app.use(bodyParser.json());
// 加入cookie签名
app.use(cookieParser('abcd1234')); //使用cookie中间件，加密值为：abcd1234
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

// 引入登录模块
const login = require('./router/login')
app.use(login)
// 引入注册模块
const register=require('./router/register')
app.use(register)
// 引入忘记密码模块
const forget=require('./router/forget')
app.use(forget)
//引入查询用户信息以及操作用户信息的模块
const systemQuery=require('./router/systemQuery')
app.use(systemQuery)

// 监听服务开启
app.listen('3333', '0.0.0.0', (res) => {
  console.log('Server running http://0.0.0.0:3333')
})
