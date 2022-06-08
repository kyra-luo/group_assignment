const mysql = require('mysql')
var express = require('express');
var jwt = require('jsonwebtoken')
var router = express.Router();
var temp=null;
router.post('/login',function(req,res,next){
    //get connection with database
    req.pool.getConnection(function (err,connection){
        if (err)
        {
            res.sendStatus(500)
            return console.log(err.message,1)
        }
        var name=req.body.name;
        var psw=req.body.psw;
        var A_type=req.body.A_type;



        var query="select * from User where User_name=? and User_PIN = ?";
        if(A_type==="User"){
            A_type="user";
            query="select * from User where User_name=? and User_PIN = ?";
        }else if(A_type==="Admin"){
            A_type="user";
            query="select * from Admin where admin_name=? and admin_PIN = ?";
        }



        connection.query(query,[name,psw],function (err,rows){
            connection.release()
            if(err){
                res.sendStatus(500);
                return console.log(err.message,2);
            }
            if(rows.length===0){
                res.send({"result":false});
            }else{
                temp = name
                const token=jwt.sign({
                    username:rows[0].name
                },'Secret Key',{expiresIn:'90s'})
                res.send({"result":true,token})
            }
        });
    });
});

//infor
router.get('/information',function (req,res,next){
    req.pool.getConnection(function (err,connection) {
        if (err) {
            res.sendStatus(500)
            return console.log(err.message, 1)
        }
        let query = "select * from User where User_name = ?";

        connection.query(query,temp,function (err,rows) {
            if (err)
            {
                return console.log(err.message)
            }

            res.send(`
            <div><p style="font-size: 50px">Frist Name: ${rows[0].First_name}</p>
                <p style="font-size: 50px">Last Name: ${rows[0].Last_name}</p>
                <p style="font-size: 50px">User Name: ${rows[0].User_name}</p>
                <p style="font-size: 50px">Password: ${rows[0].User_PIN}</p>
                <p style="font-size: 50px">User ID: ${rows[0].User_id}</p>
                <p style="font-size: 50px">Email address: ${rows[0].email_address}</p>
               </div>`)
        })

    });
})


module.exports = router;