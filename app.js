var express=require('express');
var app=express();
var db = require('./db/connection.js');
var connection = db.getPool();

//app.listen(8082);
app.listen(3000, function() {
  console.log('Your node is running on port 3000 !!!')
});

app.get('/index', function (req, res) {
    res.sendFile( __dirname + "/" + "views/index.htm" );
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


app.get('/records', function(req,res){
    connection.query('select * from users', function(err,result){
        if(result){
            console.log('result is:',result.rows);
            res.send(result.rows);
        }else{
            console.log('error is:',err);
            res.send(err);
        }
    })
});

