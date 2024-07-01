import React, { useEffect, useState } from 'react'
import '../css/Cart.css'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardProducts from '../components/CardProducts'
import { toast } from 'react-toastify'
import {loadStripe} from '@stripe/stripe-js';
import { useAuth } from '../components/Auth'
import Gallery from '../Image Gallery/Gallery'
import { clearCart, fetchCartItems} from '../redux/productSlide'
import FormatPrice from '../Helpers/FormatPrice'

const Cart = () => {

  const productCartItem = useSelector((state) => state.product.cartItem);

  const dispatch = useDispatch()

  


  const {user,getCartItems,cartItems} = useAuth()
  // console.log(cartItems)

    const totalPrice = productCartItem.reduce((sum,curr)=>parseFloat(sum) + parseFloat(curr.total),0)
    // //console.log(totalPrice)

    const totalPriceceil = Math.ceil(totalPrice)

    const tax= Math.ceil(totalPrice*0.12,2);
    const finalPrice =Math.ceil(totalPrice+tax,2)


      const handlePurchase=()=>{
       productCartItem.length==0?toast.error("No item in cart "):""
      }
 

useEffect(()=>{
  getCartItems();
},[user._id,productCartItem])

useEffect(() => {
  dispatch(fetchCartItems(user._id));
}, [dispatch, user._id]);


  return (
    <>
      <Navbar></Navbar>
      
      <section className="mainCtn" >
        <div className="">
          <div className="row">
            {/* <!-- cart --> */}
            <div className="col-lg-9">
              <div className="card border " style={{ width: "800px"}}>
                <div className="m-4" >
                  <button className='btn ' style={{position:"absolute" , right:"0" , top:"3px"}} onClick={()=>dispatch(clearCart(user._id))}>Clear Cart</button>
                  <h4 className="card-title mb-4" style={{ textDecoration: "underline" }}>YOUR SHOPPING CART </h4>
                  <br />
               {cartItems && cartItems.length>0?
                  <>
                 {cartItems.map((elem)=>{
                  return(
                  <CardProducts
                 
                  key={elem._id}
                  id={elem._id}
                  name={elem.name}
                  image={elem.image}
                  category={elem.category}
                  qty={elem.qty}
                  total={elem.total}
                  price={elem.price}
                  ></CardProducts>
                 )})}
</>:<> <h4 style={{marginTop:"45px",textAlign:"center", textDecoration:"underline" , color:"crimson"}}>Cart is Empty</h4></>
                  }</div>
                <div className="border-top pt-4 mx-4 mb-4">
                  <p><i className="fas fa-truck text-muted fa-lg"></i>Delivery charges according to location and terms and conditions</p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elemit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip
                  </p>
                </div>
              </div>
            </div>
           
            <div className="" style={{ width: "250px" }}>
              <div className="card col-lg-15  ">
                <div className="card-body">
                  SUMMARY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {/* <span style={{textDecoration:"underline"}}>{productCartItem.length>0 && productCartItem?productCartItem.length:0} items</span> */}
                  <span style={{textDecoration:"underline"}}>{ cartItems?cartItems.length:0} items</span>
                </div>
              </div>
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2">{<FormatPrice price={totalPriceceil}></FormatPrice>}</p>
                  </div>
                  {/* <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount:</p>
                    <p className="mb-2 text-success">-{<FormatPrice price={discount}></FormatPrice>}</p>
                  </div> */}
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">TAX:</p>
                    <p className="mb-2 text-danger">+{<FormatPrice price={tax}></FormatPrice>}</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Final price:</p>
                    <p className="mb-2 fw-bold">{<FormatPrice price={finalPrice}></FormatPrice>}</p>
                  </div>

                  <div className="mt-3">
                    {productCartItem.length!=0?<NavLink to="/delivery" style={{color:"black"}}>
                    <a className="btn  w-100  mb-2" onClick={handlePurchase}> Proceed To Checkout </a>
                    </NavLink>:<NavLink to="/cart" style={{color:"black"}}>
                    <a className="btn  w-100  mb-2" onClick={handlePurchase}> Proceed To Checkout </a>
                    </NavLink>}
                    <NavLink to="/home" className="btn btn-light w-100 border mt-2"> Back to shop </NavLink>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- summary --> */}
          </div>
        </div>
      </section>

      {/* <Gallery heading={"More Products to Buy"}></Gallery> */}
      <Footer></Footer>
    </>
  )
}


export default Cart