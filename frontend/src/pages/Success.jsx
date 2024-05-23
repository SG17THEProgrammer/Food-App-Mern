import React, { useEffect, useState } from 'react'
import '../css/Success.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../components/Auth'
import { useSelector } from 'react-redux'
import Orders from './Orders'

const Success = () => {
  const {user,cartItems,getCartItems}=useAuth()
  const productCartItem = useSelector((state) => state.product.cartItem);

  useEffect(()=>{
    getCartItems();
  },[user,productCartItem])

  console.log(cartItems)
  return (  
    <>
    <div className="">
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="message-box _success">
                     <i className="fa fa-check-circle icon1" aria-hidden="true"></i>
                    <h2> Your payment was successful </h2>
                   <p> Thank you for your payment.<br/> We will 
be in contact with more details shortly </p> 
<NavLink to="/home">
     <button className='butn' style={{marginTop:"50px"}}>Back To Home 🏠</button>
     </NavLink>              </div> 
        </div> 
    </div> 
</div>
<Orders cartItems={cartItems}></Orders>
    </>
  )
}

export default Success