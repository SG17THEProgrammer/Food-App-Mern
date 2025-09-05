import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import Navbar from '../../components/navbar';
import '../../css/Delivery/Address.css'
import { IoIosArrowForward } from "react-icons/io";
import Delivery from '../../pages/Delivery/Delivery';
import { useAuth } from '../../components/Auth';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Address = ({title}) => {
    const {user} = useAuth()
    const [showComponent, setShowComponent] = useState(false);
    const [delAddress , setDelAddress] = useState();
    const handleClick = () => {
      setShowComponent(!showComponent);
    };
    //console.log(delAddress)

    const getDeliveryAddress = async() => {
        try {
            const address = await fetch(`${import.meta.env.VITE_BACKEND_API}/getDeliveryAddress`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userId:user._id})
            })
            // //console.log(address)

            const response = await address.json()
            // //console.log(response)

            setDelAddress(response.data)
            if(response.ok){
                //console.log("Got delivery address successfully")
            }
            
        } catch (error) {
            console.log("Error in fetching api" +error)


        }
    }   


    const handleDeleteAddress=async(id)=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/deleteDeliveryDetails`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({addId:id})
            })

            const resData = await response.json()
            console.log(resData)


            toast.success(resData.msg)
            setDelAddress(resData.allAddress)


        } catch (error) {
            console.log(error)

        }
    }



    useEffect(()=>{
        getDeliveryAddress()
    },[showComponent,delAddress])

  return (
    <div>
    <Navbar></Navbar>
            <div className="inner1" onClick={handleClick}>
             <div style={{fontSize:"15px"}} className='address' ><FaPlus />  Add Address <IoIosArrowForward style={{marginLeft:"40px"}}/></div>
            </div>
            {showComponent && <Delivery title={"address"} setShowComponent={setShowComponent}/>}
            
    { title===undefined ?       <div className="ctn2">
            {delAddress?.length>0 ? delAddress.map((elem,idx)=>{
                const {address,city,state,pincode,_id} = elem
                return <div className="card4" key={idx} >
                <MdDelete className='delBtn1' title='Delete Address' onClick={()=>handleDeleteAddress(_id)}/>
        <h3><b>Address :</b> {address}</h3>
        <h4 ><b>City :</b>  {city}</h4>
        <h5 ><b>State :</b>  {state}</h5>
        <p ><b>Pincode :</b>  {pincode}</p>
  </div> 
            }): <h2 style={{width:"70vw",textAlign:"center",textDecoration:"underline"}}>No address found</h2>}
   
  
</div>:""}

    </div>
  )
}

export default Address