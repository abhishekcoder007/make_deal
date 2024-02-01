function handleError(req,res,next){
    let inputs=req.body
    let imgfile=req.files
    console.log(inputs,req.files)
    let dataError={}
    if((inputs.Name==="")&&(inputs.Name?.length<2)){
     let dataError= {...dataError,["NameError"]:" name input field should not empty"}
    res.send(dataError) ; 
    return
    
      
    } if((inputs.Description==="")&&(inputs.Description?.length<5)){
     let dataError= {...dataError,["DescriptionError"]:" Description field should not empty and greater than lenght 5"}
    res.send(dataError) ; 
    return 

    } if((inputs.DealShowTo.length<0)){
     let dataError= {...dataError,["DealShowToError"]:"DealShowTo field should not empty "}
    res.send(dataError) ; 
    return

    } if((inputs.Status==="")){
     let dataError= {...dataError,["StatusError"]:"Status field should not empty "}
    res.send(dataError) ; 
    return

    }
    if((inputs.Price==="")){
     let dataError= {...dataError,["PriceError"]:"Price field should not empty "}
    res.send(dataError) ; 
    return 

    }
    if(!(imgfile?.length>0)){
     let dataError= {...dataError,["ImagesError"]:"IMAGEfield should not empty "}
    res.send(dataError) ; 
    return
    }
    if((!inputs.Imagechoose)){
     let dataError= {...dataError,["ImagechooseError"]:"Imagechoose field should not empty "}
     res.send(dataError) ; 
     return
    }
    if(Object.keys(dataError).length<1){
        next()
    return 
    }
   
  }


  module.exports={handleError}