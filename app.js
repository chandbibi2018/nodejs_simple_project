var express=require('express');
var app=express();
var db = require('./db/connection.js');
var connection = db.getPool();

app.listen(8082);

app.get('/index', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
 })
 
 app.get('/process_get', function (req, res) {
   
    // Prepare output in JSON format
    response = {
       first_name:req.query.firstName,
       last_name:req.query.lastName
    };
    console.log(response);
  connection.query('select * from insert_users($1, $2) ', [req.query.firstName, req.query.lastName], function(err,result){

if(result){
    console.log("5");
res.send("successfully inserted");
}
else{

console.log("4");
    console.log(err);
   res.status(400).send(err);
} 
            
        });
    });

