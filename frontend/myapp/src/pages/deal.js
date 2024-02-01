import React,{useEffect,useState} from 'react'
import axios from "axios";

import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavBar from '../component/navbar';

const Deal = () => {
  const [dealdata,setdeal]=useState({})
  const baseUrl="http://localhost:8080/images"
    const fetchdata=async()=>{
      const {data}=  await axios.get("http://localhost:8080/deal/data");
              setdeal({data});
    }
    useEffect(()=>{
        fetchdata();
    },[])

  return (

       
        <>
        <div>
          <NavBar/>
        </div>
        {/* {JSON.stringify(dealdata)}
          <div className="container">
            <div className="row">
              {dealdata?.data?.map((obj) => (
                <div key={obj.id} className="col-lg-3 mb-3">
                  <Card
                    className="shadow pt-1 bg-white border-outline-none"
                    style={{ width: "100%", height: "21rem" }}
                  >
                    <Card.Img
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "11rem",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={obj.Imagechoose}
                    />
                    <Card.Body>
                      <Card.Title>{obj.Name}</Card.Title>
                      <Card.Text>Rs: {obj.Price}</Card.Text>
                      <Card.Text>Status: </Card.Text>
                      <Card.Text>DealShowTo: {obj.DealShowTo}</Card.Text>
                      <div className="d-flex justify-content-between">
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div> */}

          <table className='table table-striped m-auto  w-100'>
            <thead>
            <tr>
             <th>Deal_Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>DealShowTo</th>
            </tr>
            </thead>

            <tbody>
            {dealdata?.data?.map((obj) => (
              <>
              <tr>
                <td>{obj.Name}</td>
              <td>{obj.Price}</td>
              <td>{obj.Status}</td>
              <td>{obj.DealShowTo}</td>
              </tr>
              </>
              ))}
          </tbody>
          </table>
        </>
      
  

)}

export default Deal
