var express=require("express");
var cor=require("cors");
var path=require("path");
var app=express();

// var multer = require("multer");

var axios=require("axios");
require("./db/connection.js");
var dealRoute=require("./routes/deal.js");




app.use(express.json());
app.use(cor());
app.use('/images', express.static(path.join(__dirname, 'images')));

console.log(__filename,__dirname);


app.use("/deal",dealRoute.router);

app.get("/",async (req,res)=>{
res.send("hello world")
   

})
app.listen(8080,(err)=>{
    if(!err){
        console.log("server started ...");
    }else{
        console.log(err);
    }
})



