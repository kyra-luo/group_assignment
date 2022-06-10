var express = require('express');
var router = express.Router();
const nodemailer =require("nodemailer");
/* mail.js文件，发送邮件模块*/
//配置邮箱
let temp=null;
router.post('/password/reset',function (req,res,next){
    temp=req.body.email;
    console.log('body:',req.body.email)
    console.log('temp:',temp)

    res.send({"result":true})
});
router.get('/email',function (req,res,next){
    console.log('email')
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        secureConnection: true, // use SSL
        port: 465,
        secure: true,
        auth: {
            user: "2929657051@qq.com",
            pass: "zmbigdvbupdvdfff",
        },
    })

     //let code =parseInt(Math.random()*1000000)
    //var email="1761449604@qq.com";
    let mailOptions = {
        from: '2929657051@qq.com',
        to:`${temp}`,
        subject: "email changed ",
        text: "You have changed the password",

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
