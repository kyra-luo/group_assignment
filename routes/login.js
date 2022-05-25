const express = require('express')
const router = express.Router()
// token生成插件模块
const jwt = require('jsonwebtoken');
// Token签名
var secret = 'I LOVE LXD';
// 引入数据库
const mysql = require('../../Desktop/newproject/newproject/mysql/mysql')
var connection = null;
router.post('/login', (req, res) => {
    // 数据库连接
    connection = mysql.createConnection();
    connection.connect();
    // 查询语句
    var sql = 'SELECT * FROM user_table Where uname=? and ustatus=?';
    // 前端传来参数
    var params = [req.body.name, req.body.status]
    //登录验证
    connection.query(sql, params, function (err, result) {
        // 存储返回结果
        var result1
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            result1 = {
                code: 501,
                msg: '数据库链接失败...'
            }
            return;
        } else {
            // 用户没有输入时
            if (req.body.name === undefined || req.body.pwd === undefined || req.body.status === undefined) {
                result1 = {
                    code: 401,
                    msg: '用户名或密码不能为空',
                    xl: 0
                }
                res.send(result1)
            } else {
                if (result.length !== 0) {
                    console.log(result)
                    for (let i = 0; i < result.length; i++) {
                        // 用户名或者密码不正确的时候
                        if (req.body.name !== result[i].uname || req.body.pwd !== result[i].upwd || req.body.status !== result[i].ustatus) {
                            result1 = {
                                code: 400,
                                result: '用户名或者密码错误!',
                                xl: 1
                            }
                        }
                        // 邮箱和密码输入正确
                        if (req.body.name === result[i].uname && req.body.pwd === result[i].upwd || req.body.status === result[i].ustatus) {
                            // 获取客户端的ip地址
                            var clientIp = getIp(req)
                            // 传输的token内容
                            let payload = { uid: result[i].uid, ip: clientIp };
                            let token = jwt.sign(payload, secret);
                            let sql = "SELECT * from user_token where uname = ?"
                            connection.query(sql, req.body.name, (err, result) => {
                                if (err) {
                                    result1 = {
                                        code: 401,
                                        msg: 'token数据库异常，请稍后重试!'
                                    }
                                } else {
                                    if (result.length !== 0) {
                                        let sql = 'UPDATE user_token set token= ? , updtime = ? WHERE uname = ? '
                                        let params = [token, timestampToTime(Date.now()), req.body.name]
                                        connection.query(sql, params, (err, result) => {
                                            if (err) {
                                                result1 = {
                                                    code: 401,
                                                    msg: 'token数据库异常，请稍后重试!'
                                                }
                                            } else {
                                                result1 = {
                                                    code:200,
                                                    token: token,
                                                    msg: '信息正确，返回登录',
                                                    xl: 2,
                                                    ip: clientIp
                                                }
                                            }
                                            console.log("用户信息存储token:" + token)
                                            // 写入cookie中
                                            res.cookie('tooken', token, { httpOnly: true, signed: true, maxAge: 3600000, path: '/login'})
                                            
                                            // 返回结果
                                            res.send(result1)
                                        })
                                    } else {
                                        let sql = "INSERT INTO user_token(uname,token,updtime) VALUES(?,?,?)"
                                        let params = [req.body.name, token, timestampToTime(Date.now())]
                                        connection.query(sql, params, (err, result) => {
                                            if (err) {
                                                result1 = {
                                                    code: 401,
                                                    msg: 'token数据库异常，请稍后重试!'
                                                }
                                            } else {
                                                result1 = {
                                                    code:200,
                                                    token: token,
                                                    msg: '信息正确，返回登录',
                                                    xl: 3,
                                                    ip: clientIp
                                                }
                                            }
                                            console.log("用户信息存储token:" + token)
                                            // 写入cookie中
                                            res.cookie('tooken', token, { httpOnly: true, signed: true, maxAge: 3600000, path: '/login' })
                                            // 返回结果
                                            res.send(result1)
                                        });

                                    }

                                }
                                
                            });

                        }
                    }
                }
                else {
                    result1 = {
                        code: 402,
                        msg: '账号不存在请注册!'
                    }
                    res.send(result1)
                }
                // 
            }
        }
    })
})
//通过req的hearers来获取客户端ip
var getIp = function (req) {
    var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    return ip;
};
// 时间转换以及补零操作
function timestampToTime(timestamp) {
    var date = new Date(timestamp)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1).toString().padStart(2, '0') + '-'
    var D = date.getDate().toString().padStart(2, '0') + ' '
    var h = date.getHours().toString().padStart(2, '0') + ':'
    var m = date.getMinutes().toString().padStart(2, '0') + ':'
    var s = date.getSeconds().toString().padStart(2, '0')
    return Y + M + D + h + m + s
}
// 返回router，映射出去
module.exports = router
