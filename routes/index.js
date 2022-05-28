var express = require('express');
var router = express.Router();
const mysql = require('mysql')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
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

      connection.query(query,[name,psw],function (err,rows,fields){
        connection.release()
          if(err){
              res.sendStatus(500);
              return console.log(err.message,2);
          }
          if(rows.length===0){
              res.send({"result": false});
          }else{
              res.send({"result":true})
      }
    });
  });
});

module.exports = router;
