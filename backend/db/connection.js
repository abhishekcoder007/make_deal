const mongoose = require('mongoose');

(async function (){
    try{
   await  mongoose.connect('mongodb://127.0.0.1:27017/deal').then(()=>{
    console.log("db connected")
   })
   }catch(err){
         console.log(err)
   }


})();




