var {addDealModel}=require("../model/dealmodel");
var {handleError}=require("../middleware/validation")
var axios=require("axios");
var gis = require('g-i-s');

const addDeal=async (req,res)=>{

  
    const data = req.body;
    const myimages = req.files
// console.log( data.Name);
// console.log(myimages);
    let Images=[]

    myimages.forEach(element => {
        Images.push(element?.filename)
    });
try{
    const conn = new addDealModel({ ...data, Images });
    await conn.save();
    res.send(conn);
}catch(error){
    console.log(error);
}
}


const allData=async(req,res)=>{
    try{
   const getData= await addDealModel.find({})
   res.send(getData)
    }catch(err){
        console.log(err);
    }

}

const allImages=async(req,res)=>{
    console.log(req.body.inputs)
    const searchimg=req?.body?.inputs?.Name
    if(searchimg.length>1){
    try{
        gis(searchimg, logResults);

        function logResults(error, results) {
          if (error) {
            console.log(error);
          }
          else {
            res.send(results.slice(0,10))
           
          }
        }

    }catch(err){
         console.log(err);
    }
}
}

module.exports={addDeal,allData,allImages}