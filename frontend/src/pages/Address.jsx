import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import Navbar from '../components/navbar';
import '../css/Address.css'
import { IoIosArrowForward } from "react-icons/io";
import Delivery from '../pages/delivery';
import { useAuth } from '../components/Auth';

const Address = ({title}) => {
    const {user} = useAuth()
    const [showComponent, setShowComponent] = useState(false);
    const [delAddress , setDelAddress] = useState();
    const handleClick = () => {
      setShowComponent(!showComponent);
    };
    console.log(delAddress)

    const getDeliveryAddress = async() => {
        try {
            const address = await fetch("http://localhost:8001/getDeliveryAddress",{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userId:user._id})
            })
            // console.log(address)

            const response = await address.json()
            // console.log(response)

            setDelAddress(response.data)
            if(response.ok){
                console.log("Got delivery address successfully")
            }
            
        } catch (error) {
            console.log("Error in fetching api" +error)


        }
    }   

    useEffect(()=>{
        getDeliveryAddress()
    },[user._id])

  return (
    <div>
    <Navbar></Navbar>
            <div className="inner1" onClick={handleClick}>
             <div style={{fontSize:"15px"}} className='address' ><FaPlus />  Add Address <IoIosArrowForward style={{marginLeft:"40px"}}/></div>
            </div>
            {showComponent && <Delivery title={"address"}/>}
            
    { title==undefined ?       <div className="ctn2">
            {delAddress ? delAddress.map((elem)=>{
                const {address,city,state,pincode} = elem
                return <div className="card4">
        <h3><b>Address :</b>   {address} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste sint beatae deserunt molestias et? Doloribus, corporis architecto</h3>
        <h4 ><b>City :</b>  {city}</h4>
        <h5 ><b>State :</b>  {state}</h5>
        <p ><b>Pincode :</b>  {pincode}</p>
  </div> 
            }):""}
   
  
</div>:""}

    </div>
  )
}

export default Address