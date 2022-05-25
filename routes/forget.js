const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
// 引入数据库
const mysql = require('../../Desktop/newproject/newproject/mysql/mysql')
var connection = null;
router.post('/forget/user', (req, res) => {
    if (req.body.name === undefined || req.body.pwd === undefined || req.body.pwd1 === undefined) {
        res.send({
            code: 400,
            msg: '必填参数不能为空，请仔细检查'
        })
    } else {
        if (req.body.pwd === req.body.pwd1) {// 数据库连接
            connection = mysql.createConnection();
            connection.connect();
            var result1
            var sql = "SELECT * From user_table Where uname=?"
            var params = req.body.name
            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.log('查询忘记密码邮箱数据库异常')
                    return
                } else {
                    if (result.length !== 0) {
                        let sql = 'UPDATE user_table set upwd = ? WHERE uname= ?'
                        let params = [req.body.pwd, req.body.name]
                        connection.query(sql, params, (err, result) => {
                            if (err) {
                                result1 = {
                                    code: 401,
                                    msg: 'user数据库异常，请稍后重试!'
                                }
                            } else {
                                result1 = {
                                    code: 200,
                                    msg: '密码修改成功，请返回登录'
                                }
                            }
                            // 返回结果，关闭数据库连接
                            res.send(result1)
                            connection.end();
                        })

                    } else {
                        result1 = {
                            code: 401,
                            msg: '暂无此用户，请先去注册!'
                        }
                        // 返回结果，关闭数据库连接
                        res.send(result1)
                        connection.end();
                    }
                }

            })
        } else {
            res.send({
                code: 400,
                msg: '两次密码输入不一致，请仔细检查'
            })
        }

    }
})


module.exports = router
