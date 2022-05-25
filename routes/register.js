const express = require('express')
const router = express.Router()
// 引入数据库
const mysql = require('../../Desktop/newproject/newproject/mysql/mysql')
var connection = null;
const nodemailer = require('nodemailer');
router.post('/register', (req, res) => {
    // 数据库连接
    connection = mysql.createConnection();
    connection.connect();
    // 查询语句
    var sql = 'SELECT * FROM user_table Where uemail=?';
    var params = req.body.email
    try {
        connection.query(sql, params, (err, result) => {
            if (err) {
                console.log('注册查重异常，请稍后重试!')
                return
            } else {
                var result1;
                // 查询结果数组长度不为零，就是有存在的数据
                if (result.length !== 0) {
                    res.send({
                        code: 202,
                        msg: '该邮箱已经存在，请重新输入!',
                        xl: 1
                    })
                } else {
                    // 没有数据时候，进行注册
                    // 获取客户端的ip地址
                    var clientIp = getIp(req)
                    // 插入数据的sql语句
                    let sql = "INSERT INTO user_table(uid,FirstName,LastName,sex,uname,upwd,uemail,utime,uintroduction,uip,ustatus) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
                    // 参数
                    if (req.body.pwd == req.body.pwd1 ) {
                        if (req.body.FirstName && req.body.LastName && req.body.sex && req.body.name && req.body.email){
                            let params = [YzId(6), req.body.FirstName, req.body.LastName, req.body.sex, req.body.name, req.body.pwd, req.body.email, timestampToTime(Date.now()), "用户太懒了，还没有简介...", clientIp, '1']
                        connection.query(sql, params, (err, result) => {
                            if (err) {
                                result1 = {
                                    code: 401,
                                    msg: '注册数据库异常，请稍后重试!'
                                }
                            } else {
                                result1 = {
                                    code: 200,
                                    result: {
                                        msg: "注册成功，请返回登录!",
                                        IP: clientIp,
                                        id: YzId(6)
                                    }
                                }
                                // 完成后进行验证码清空
                                code = ''
                            }
                            // 返回结果
                            res.send(result1)
                        })
                        }else{
                            res.send({ code: 400, msg: "信息不全，请认真填写!" })
                        }
                        
                    } else {
                        res.send({ code: 400, msg: "两次密码不一致，请认真填写!" })
                    }
                }
            }
            // 关闭数据库连接
            connection.end();
        })

    } catch (e) {
        // 异常情况
        res.send(e)
        connection.end();
    }
})
// 随机生成6位id
function YzId(n) {
    let str = "";
    const arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    ];
    for (let i = 0; i < n; i++) {
        str += arr[Math.floor(Math.random() * arr.length)];
    }
    return str;
}
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
// 映射出
module.exports = router
