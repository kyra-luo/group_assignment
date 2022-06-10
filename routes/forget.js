const mysql = require('mysql')
var express = require('express');
var router = express.Router();
router.post('/reset',function (req,res,next){

    var name=req.body.name;
    var PIN=req.body.PIN;
    var con_PIN=req.body.con_PIN;
    var email=req.body.email;

    if(name==null||PIN==null||con_PIN==null){
        res.send({"result": false});
        res.sendStatus(400);
    }else {
        if(PIN==con_PIN){
            req.pool.getConnection(function (err,connection){

                var sql = "SELECT * From User Where User_name=? and email_address =? ";
                connection.query(sql,[name, email],function (err,result){
                    if(err){
                        res.sendStatus(500);
                        return console.log(err.message,2);
                    }
                    console.log(result)
                    if(result.length!==0){
                        let sql = 'UPDATE User set User_PIN = ? WHERE User_name= ? and email_address= ?'
                        connection.query(sql,[PIN,name,email],function (err,result){
                            console.log(result)
                            connection.release()
                            if(err){
                                res.sendStatus(500);
                                res.send({"result":false});
                            }
                            if(result.affectedRows===0){
                                res.send({"result": false});
                            }else{
                                res.send({"result":true});
                            }
                        });
                    }
                    else
                    {
                        res.send({"result":false});
                    }
                });
            });
        }else{
            res.send({"result": false});
        }
    }
})


module.exports = router;