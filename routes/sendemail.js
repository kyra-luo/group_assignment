var express = require('express');
var router = express.Router();
const nodemailer =require("nodemailer");
/* mail.js文件，发送邮件模块*/
//配置邮箱
router.get('/email',function (req,res,next){
    console.log('email')
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        secureConnection: true, // use SSL
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: "1761449604@qq.com",   //其他的不要动，更改邮箱
            pass: "olmcenkuhhiqcgbc",    // QQ邮箱需要使用的授权码
        },
    })
//参数：mail：需要发送的邮件地址；code：验证码

    // 设置邮件内容（谁发送什么给谁）
    let mailOptions = {
        from: '1761449604@qq.com',   // 发件人
        to: "1140222138@qq.com",     // 收件人
        subject: "邮箱验证",    // 主题
        text: '费任远最yue',   // 直接发送文本

    }
    transporter.sendMail(mailOptions,function (err,result){
        if(err){
            console.log(err)
        }else{
            console.log(result.response)
        }
    })

    res.end()
})

module.exports = router;
