const mysql = require('mysql')
var express = require('express');
// var jwt = require('jsonwebtoken')
var router = express.Router();
router.post('/register', function (req,res,next){
req.pool.getConnection(function (err,connection){
    var email_add= req.body.email_add;
    var  u_name = req.body. u_name;
    var f_name = req.body.f_name;
    var l_name=req.body.l_name;
    var Pin_1= req.body.Pin_1;
    //Gender: Gender,
    var  A_type= req.body.A_type
    var query = "select * from User where email_address=?"
    req.pool.getConnection(function (err,connection){
        if (err)
        {
            res.sendStatus(500)
            return console.log(err.message,1)
        }
        connection.query(query,email_add,function (err,result){
         if(err){
             res.send({
                 code:400,
                 message:"error"
             })
         }if(result.length===1){
             res.send({
                 code:401,
                 message:"The email address already used"
             })

            }if(result.length===0){
                 let sql ="INSERT into User(First_name, Last_name, User_id, User_name, User_PIN, email_address, User_Gender) VALUES(?,?,UUID(),?,?,?,?)"
                let params = [f_name,l_name,u_name,Pin_1,email_add,A_type]
                connection.query(sql,params,function (err,result){
                    connection.release()
                    if(err){
                        console.log(1)
                        res.sendStatus(500);
                        res.send({"result":false});
                    }else{
                        console.log(2)
                        res.send({"result":true});
                    }
                })
            }
        });
    });

})
});
module.exports = router;