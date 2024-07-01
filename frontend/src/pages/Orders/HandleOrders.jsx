import React from 'react'
import Orders from './Orders'
import Navbar from '../../components/Navbar'
import axios from 'axios';
import { toast } from 'react-toastify';

const HandleOrders = () => {

  const handleStatus=async(e,orderId,fetchOrders)=>{
    try {
        const response = await axios.post('http://localhost:8001/updateDeliveryStatus',{
          orderId,status:e.target.value
        })
//console.log(response)
        if(response.data.success) {
          await fetchOrders()
          toast.success(response.data.message[0]);
          // setTimeout(()=>{
          //   window.location.reload()
          // },2000)
        }
        else{
            //console.log("Response Not Found")
        }
    } catch (error) {
      //console.log("Error" + error)
    }
  }
  return (
    <div>
    <Navbar></Navbar>
        <Orders title={"All Orders"} handleStatus={handleStatus}></Orders>
    </div>
  )
}

export default HandleOrders