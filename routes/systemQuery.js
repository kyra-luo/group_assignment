const express = require('express')
const router = express.Router()
// token生成插件模块
const jwt = require('jsonwebtoken');
// Token签名
var secret = 'abcd1234';
const nodemailer = require('nodemailer');
// 引入数据库
const mysql = require('../../Desktop/newproject/newproject/mysql/mysql')
var connection = null;
router.post('/user', (req, res) => {
    // 数据库连接
    connection = mysql.createConnection();
    connection.connect();
    // 查询语句
    let sql = 'SELECT * from user_token WHERE token = ?'
    var Cookies = {};
    if (req.headers.cookie != null) {
        req.headers.cookie.split(';').forEach(l => {
            var parts = l.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    if (Cookies.tooken) {
        connection.query(sql, Cookies.tooken, (err, result) => {
            if (err) {
                console.log('查询信息异常，请稍后重试!')
                return
            } else {
                if (result.length !== 0) {
                    var d1 = new Date(result[0].updtime);//已知时间戳
                    var d2 = new Date();//当前时间戳
                    let minute = parseInt(parseInt(d2 - d1) / 1000 / 3600) //算出相差的小时
                    if (minute > 1) {
                        res.send({ "code": 400, "msg": "请先进行登录!" })
                    } else {
                        let sql = 'SELECT * from user_table WHERE uname = ?'
                        connection.query(sql, result[0].uname, (err, result) => {
                            if (err) {
                                console.log('查询信息异常，请稍后重试!')
                                return
                            } else {
                                res.send({
                                    "code": 200, "msg": {
                                        "FirstName": result[0].FirstName,
                                        "LastName": result[0].LastName,
                                        "uname": result[0].uname,
                                        "uid": result[0].uid,
                                        "uemail": result[0].uemail,
                                        "sex": result[0].sex,
                                        "upwd": result[0].upwd
                                    }
                                })

                            }
                        })


                    }

                } else {
                    res.send({ "code": 400, "msg": "请先进行登录!" })
                }
            }

        })

    } else {
        res.send({ "code": 400, "msg": "请先进行登录!" })
    }

})

router.post('/users', (req, res) => {
    // 数据库连接
    connection = mysql.createConnection();
    connection.connect();
    // 查询语句
    let sql = 'SELECT * from user_token WHERE token = ?'
    var Cookies = {};
    if (req.headers.cookie != null) {
        req.headers.cookie.split(';').forEach(l => {
            var parts = l.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    if (Cookies.tooken) {
        connection.query(sql, Cookies.tooken, (err, result) => {
            if (err) {
                console.log('查询信息异常，请稍后重试!')
                return
            } else {
                if (result.length !== 0) {
                    var d1 = new Date(result[0].updtime);//已知时间戳
                    var d2 = new Date();//当前时间戳
                    let minute = parseInt(parseInt(d2 - d1) / 1000 / 3600) //算出相差的小时
                    if (minute > 1) {
                        res.send({ "code": 400, "msg": "请先进行登录!" })
                    } else {
                        let sql = 'SELECT * from user_table WHERE uname = ?'
                        connection.query(sql, result[0].uname, (err, result) => {
                            if (err) {
                                console.log('查询信息异常，请稍后重试!')
                                return
                            } else {
                                if (result[0].ustatus == '0') {
                                    let sql = 'SELECT * from user_table'
                                    connection.query(sql, result[0].uname, (err, result) => {
                                        if (err) {
                                            console.log('查询信息异常，请稍后重试!')
                                            return
                                        } else {
                                            res.send({
                                                "code": 200, "msg": result
                                            })
                                        }
                                    })
                                } else {
                                    res.send({ "code": 400, "msg": "您没有权限!" })
                                }

                            }
                        })
                    }

                } else {
                    res.send({ "code": 400, "msg": "请先进行登录!" })
                }
            }

        })

    } else {
        res.send({ "code": 400, "msg": "请先进行登录!" })
    }

})

router.post('/upduser', (req, res) => {
    // 数据库连接
    connection = mysql.createConnection();
    connection.connect();
    // 查询语句
    let sql = 'SELECT * from user_token WHERE token = ?'
    var Cookies = {};
    if (req.headers.cookie != null) {
        req.headers.cookie.split(';').forEach(l => {
            var parts = l.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    if (Cookies.tooken) {
        connection.query(sql, Cookies.tooken, (err, result) => {
            if (err) {
                console.log('查询信息异常，请稍后重试!')
                return
            } else {
                if (result.length !== 0) {
                    var d1 = new Date(result[0].updtime);//已知时间戳
                    var d2 = new Date();//当前时间戳
                    let minute = parseInt(parseInt(d2 - d1) / 1000 / 3600) //算出相差的小时
                    if (minute > 1) {
                        res.send({ "code": 400, "msg": "请先进行登录!" })
                    } else {
                        let sql = 'SELECT * from user_table WHERE uname = ?'
                        connection.query(sql, result[0].uname, (err, result) => {
                            if (err) {
                                console.log('查询信息异常，请稍后重试!')
                                return
                            } else {
                                if (result[0].ustatus == '0') {
                                    if (req.body.uname === undefined || req.body.FirstName === undefined || req.body.LastName === undefined || req.body.sex === undefined || req.body.upwd === undefined) {
                                        result1 = {
                                            code: 401,
                                            msg: '必填项不能为空',
                                        }
                                        res.send(result1)
                                    } else {
                                        let sql = 'UPDATE user_table set FirstName=?, LastName = ?, sex=?, upwd=? WHERE uname=?'
                                        var params = [req.body.FirstName, req.body.LastName, req.body.sex, req.body.upwd, req.body.uname]
                                        connection.query(sql, params, (err, result) => {
                                            if (err) {
                                                console.log('修改信息异常，请稍后重试!')
                                                return
                                            } else {
                                                res.send({
                                                    "code": 200, "msg": "修改成功!"
                                                })

                                            }
                                        })
                                    }
                                } else {
                                    let sql = 'UPDATE user_table set FirstName=?, LastName = ?, sex=?, upwd=? WHERE uname=?'
                                    var params = [req.body.FirstName, req.body.LastName, req.body.sex, req.body.upwd, result[0].uname]
                                    connection.query(sql, params, (err, result) => {
                                        if (err) {
                                            console.log('修改信息异常，请稍后重试!')
                                            return
                                        } else {
                                            res.send({
                                                "code": 200, "msg": "修改成功!"
                                            })

                                        }
                                    })
                                }

                            }
                        })
                    }

                } else {
                    res.send({ "code": 400, "msg": "请先进行登录!" })
                }
            }

        })

    } else {
        res.send({ "code": 400, "msg": "请先进行登录!" })
    }

})

router.post('/deluser', (req, res) => {
    // 数据库连接
    connection = mysql.createConnection();
    connection.connect();
    // 查询语句
    let sql = 'SELECT * from user_token WHERE token = ?'
    var Cookies = {};
    if (req.headers.cookie != null) {
        req.headers.cookie.split(';').forEach(l => {
            var parts = l.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    if (Cookies.tooken) {
        connection.query(sql, Cookies.tooken, (err, result) => {
            if (err) {
                console.log('查询信息异常，请稍后重试!')
                return
            } else {
                if (result.length !== 0) {
                    var d1 = new Date(result[0].updtime);//已知时间戳
                    var d2 = new Date();//当前时间戳
                    let minute = parseInt(parseInt(d2 - d1) / 1000 / 3600) //算出相差的小时
                    if (minute > 1) {
                        res.send({ "code": 400, "msg": "请先进行登录!" })
                    } else {
                        let sql = 'SELECT * from user_table WHERE uname = ?'
                        connection.query(sql, result[0].uname, (err, result) => {
                            if (err) {
                                console.log('查询信息异常，请稍后重试!')
                                return
                            } else {
                                if (result[0].ustatus == '0') {
                                    if (req.body.uid === undefined) {
                                        result1 = {
                                            code: 401,
                                            msg: '参数错误',
                                        }
                                        res.send(result1)
                                    } else {
                                        let sql = 'DELETE from user_table WHERE uid=?'
                                        if (req.body.uid === result[0].uid) {
                                            res.send({ "code": 400, "msg": "您没有权限!" })
                                        } else {
                                            connection.query(sql, req.body.uid, (err, result) => {
                                                if (err) {
                                                    console.log('删除信息异常，请稍后重试!')
                                                    return
                                                } else {
                                                    res.send({
                                                        "code": 200, "msg": "删除成功!"
                                                    })

                                                }
                                            })
                                        }

                                    }
                                } else {
                                    res.send({ "code": 400, "msg": "您没有权限!" })
                                }

                            }
                        })
                    }

                } else {
                    res.send({ "code": 400, "msg": "请先进行登录!" })
                }
            }

        })

    } else {
        res.send({ "code": 400, "msg": "请先进行登录!" })
    }

})

router.post('/signout', (req, res) => {
    // 数据库连接
    connection = mysql.createConnection();
    connection.connect();
    // 查询语句
    let sql = 'SELECT * from user_token WHERE token = ?'
    var Cookies = {};
    if (req.headers.cookie != null) {
        req.headers.cookie.split(';').forEach(l => {
            var parts = l.split('=');
            Cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    if (Cookies.tooken) {
        connection.query(sql, Cookies.tooken, (err, result) => {
            if (err) {
                console.log('查询信息异常，请稍后重试!')
                return
            } else {
                if (result.length !== 0) {
                    var d1 = new Date(result[0].updtime);//已知时间戳
                    var d2 = new Date();//当前时间戳
                    let minute = parseInt(parseInt(d2 - d1) / 1000 / 3600) //算出相差的小时
                    if (minute > 1) {
                        res.send({ "code": 400, "msg": "请先进行登录!" })
                    } else {
                        let sql = 'UPDATE user_token set token=? where token=?'
                        let token = jwt.sign({"ip":"127.0.0.1"}, secret);
                        var params = [token,Cookies.tooken]
                        connection.query(sql, params, (err, result) => {
                            if (err) {
                                console.log('删除信息异常，请稍后重试!')
                                return
                            } else {
                                res.send({
                                    "code": 200, "msg": "退出成功!"
                                })

                            }
                        })
                    }

                } else {
                    res.send({ "code": 400, "msg": "请先进行登录!" })
                }
            }

        })

    } else {
        res.send({ "code": 400, "msg": "请先进行登录!" })
    }

})

// 映射出
module.exports = router


