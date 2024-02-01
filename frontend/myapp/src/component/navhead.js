import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useState,useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Producteditnav() {
  const defdata={
    Name: "",
    Price: "",
    Status: "",
    DealShowTo:[],
    Description: "",
    Images: null,
    Imagechoose:"",
  }
  const [show, setShow] = useState(false);
  const [optimage,setoptimage]=useState([{
    url:"hello"
  },{
    url:"hello bye"
  }])
  //   const [data, setdata] = useState({});
  const [renderCount, setRenderCount] = useState(0);
  const [inputs, setInputs] = useState(defdata);
  const [Err, setErr] = useState({});
  const navigate = useNavigate();
  const handleClose = () =>{
    setRenderCount(0);
    setShow(false)};
  const handleShow = () =>{
    // setRenderCount(0);
    setShow(true)};

  const handleChangeFile = (event) => {
    const name = event.target.name;
    const fileArray = event.target.files;

    const files = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      files.push(file);
    }

    setInputs((values) => ({ ...values, [name]: files }));
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (name=="DealShowTo"){
             const {checked}=event.target
             if(checked){
              const {DealShowTo}=inputs
             console.log({"deal":inputs})
              setInputs((values) => ({ ...values, [name]: [...DealShowTo,value] }));
             }else{
              const {DealShowTo}=inputs
             const newdata= DealShowTo.filter((ele)=>ele !==value) 

             setInputs((values) => ({ ...values, [name]: [newdata] }));
             }

    }
   
  };

  async function toChooseImage(){
    const response=await axios.post("http://localhost:8080/deal/gimage",{inputs})
    setoptimage(response?.data)
   
  }
 useEffect(()=>{
  setRenderCount((old)=>old+1)
  if(renderCount>1){
    handleError();
  }
  toChooseImage()
  console.log(optimage)
 },[inputs])

const handleImageChoose=(e)=>{
  const name=e.target.name
  const value=e.target.value
  setInputs((values) => ({ ...values, [name]: value }));
 
}

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if(handleError()){
    console.log(inputs);
    const formData = new FormData();

    // DealShowTo
    formData.append("Name", inputs.Name);
    formData.append("Price", inputs.Price);
    formData.append("Status", inputs.Status);
    formData.append("Description", inputs.Description);
    formData.append("DealShowTo", inputs.DealShowTo);
    formData.append("Imagechoose", inputs.Imagechoose);

    // formData.append("Images", inputs.Images);
    Object.values(inputs.Images).forEach((file) => {
      formData.append("Images", file);
    });

    try {
      const response = await axios.post(
        `http://localhost:8080/deal/add?age=30`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (typeof response.data == "string") {
        alert(response.data);
      }
      if (response?.data?._id) {
        alert("data is inserted successfully");
        handleClose();
        setInputs({
          Name: "",
          Price: "",
          Status: "",
        
          Description: "",
          Images: null,
        });
        handleClose();
     
        
      }
    } catch (error) {
      console.error(error);
    }

  }
  };

  const handleMove = () => {
    navigate("/product");
  };


  function handleError(){
    setErr({})
    if((inputs.Name==="")&&(inputs.Name?.length<2)){
      setErr((old)=> ({...old,["NameError"]:" name input field should not empty"}));
      
    } if((inputs.Description==="")&&(inputs.Description?.length<5)){
      setErr((old)=> ({...old,["DescriptionError"]:" Description field should not empty and greater than lenght 5"}));
      
    } if((inputs.DealShowTo?.length<0)){
     
      setErr((old)=> ({...old,["DealShowToError"]:"DealShowTo field should not empty "}));
     
    } if((inputs.Status==="")){
      setErr((old)=> ({...old,["StatusError"]:"Status field should not empty "}));
     
    }
    if((inputs.Price==="")){
      setErr((old)=> ({...old,["PriceError"]:"Price field should not empty "}));
     
    }
    if(!(inputs?.Images)){
      setErr((old)=> ({...old,["ImagesError"]:"IMAGEfield should not empty "}));
     
    }
    if((!inputs.Imagechoose)){
      setErr((old)=> ({...old,["ImagechooseError"]:"Imagechoose field should not empty "}));
     
    }
    if(Object.keys(Err).length<1){
      return true;
    }
   
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="d-flex justify-content-around align-items-center shadow-sm bg-secondary"
      >
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>
        <button type="button" onClick={handleMove} className="btn btn-primary">
          Edit Product
        </button>
      </Navbar>
        {/* {JSON.stringify(Err)} */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" for="form6Example1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control"
                    name="Name"
                    value={inputs?.Name}
                    onChange={handleChange}
                  />
                 {Err.NameError&&<p className="text-danger ">{Err.NameError}</p>}
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" for="form6Example2">
                    Price
                  </label>
                  <input
                    type="text"
                    id="form6Example2"
                    className="form-control"
                    name="Price"
                    value={inputs?.Price}
                    onChange={handleChange}
                  />
                  {Err.PriceError&&<p className="text-danger ">{Err.PriceError}</p>}
                </div>
              </div>
            </div>


    <div data-mdb-input-init className="form-outline mb-4">
  <label className="form-label" for="form6Example3">
    Status
  </label>
  <div className="form-check">
    <input
      type="radio"
      id="form6Example35"
      className="form-check-input"
      name="Status"
      value="Active"
      onChange={handleChange}
    />
    <label className="form-check-label " for="form6Example35">
      Active
    </label>
  </div>
  <div className="form-check">
    <input
      type="radio"
      id="form6Example42"
      className="form-check-input"
      name="Status"
      value="Inactive"
      onChange={handleChange}
    />
    <label className="form-check-label" for="form6Example42">
      Inactive
    </label>
    {Err.StatusError&&<p className="text-danger ">{Err.StatusError}</p>}
  </div>
</div>
  

<div data-mdb-input-init className="form-outline mb-4">
{/* <select >
       
        
       
       {optimage.map((ele)=>(
       <>
       <option value={ele.url}> {ele.url} </option>
       </>
     ))} */}
    
   {/* </select> */}
  <select className="w-50" name="Imagechoose" onClick={handleImageChoose}>
    <option>CHOOSE ANY URL</option>
   {optimage?.map((ele)=>(
    <>
    <option className="w-80" value={ele.url}>{ele.url}</option>
    </>
  ))}
 
  </select>
  {Err.ImagechooseError&&<p className="text-danger ">{Err.ImagechooseError}</p>}
  </div>
           
         

            

            {/* image  */}
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label" for="form6Example67">
                Images
              </label>
              <input
                type="file"
                id="form6Example67"
                className="form-control"
                accept="image/png"
                name="Images"
                onChange={handleChangeFile}
                multiple
              />
              {Err.ImagesError&&<p className="text-danger ">{Err.ImagesError}</p>}
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label" for="form6Example7">
                Description
              </label>
              <textarea
                className="form-control"
                id="form6Example7"
                rows="4"
                name="Description"
                value={inputs?.Description}
                onChange={handleChange}
              ></textarea>
              {Err.DescriptionError&&<p className="text-danger ">{Err.DescriptionError}</p>}
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label">
              Deal show to
              </label><br/>

              <input type="checkbox" value="users" onChange={handleChange} name='DealShowTo'  id="checkboxid1" />
              <label className="form-label" for="checkboxid1">
              users
              </label><br/>
              <input type="checkbox" value="admin" onChange={handleChange} name='DealShowTo'  id="checkboxid1" />
              <label className="form-label" for="checkboxid1">
              admin
              </label><br/>
              <input type="checkbox" value="standarduser" onChange={handleChange} name='DealShowTo'  id="checkboxid1" />
              <label className="form-label" for="checkboxid1">
              standard user
              </label><br/>
              {Err.DealShowToError&&<p className="text-danger ">{Err.DealShowToError}</p>}
              </div>

            <button
              data-mdb-ripple-init
              type="submit"
              className="btn btn-primary btn-block mb-4"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Producteditnav;
