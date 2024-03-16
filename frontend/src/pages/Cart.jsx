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
import { clearCart} from '../redux/productSlide'
import FormatPrice from '../Helpers/FormatPrice'

const Cart = () => {

  
  const productCartItem = useSelector((state) => state.product.cartItem);
  console.log(productCartItem)  
  const dispatch = useDispatch()

  


  const {user} = useAuth()

const navigate = useNavigate()  

    const totalPrice = productCartItem.reduce((sum,curr)=>parseFloat(sum) + parseFloat(curr.total),0)
    console.log(totalPrice)

    const totalPriceceil = Math.ceil(totalPrice)

    const discount = Math.ceil(0.5*totalPrice,2);
    const tax= Math.ceil(totalPrice*0.22,2);
    const finalPrice =Math.ceil(totalPrice-discount+tax,2)

 

    const handlePayment=async()=>{
      // console.log(user.email)
      console.log(productCartItem)
      if(user.email){
        // const stripePromise = await loadStripe(`${import.meta.env.STRIPE_PUBLIC_KEY}`)
        // console.log(import.meta.env.STRIPE_PUBLIC_KEY)
        const stripePromise = await loadStripe("pk_test_51OkP1CSGM4q7z7zWyecwfKJL4fMfVV3dWiTTksC7PFH8LK5Xix3ADEV0C2UxJQBiY8y23JHqztqyNLeC2fkRsbAt00uIZcT3sD")
        console.log(JSON.stringify(productCartItem))

        const res = await fetch(`http://localhost:8001/create-checkout-session`,{
          method : "POST",
          headers  : {
            "Content-Type" : "application/json"
          },
          body :JSON.stringify(productCartItem),
        })
        console.log(res)  
        if(res.status=== 400) return;

        const session = await res.json()
        console.log(session)

      if(session){
        toast.success("Redirect to payment Gateway...!")
        // window.location.href=data.url;
        stripePromise.redirectToCheckout({sessionId : session.id}) 
    }
    else{
      console.log(session.error)
    }
  }
    else{
      toast("You haven't Logged In!")
      navigate("/login")
    }
  
    }

    // useEffect(()=>{
    //   getCartItemsFromLocalStorage()
    // },[])
//   const handlePayment = async()=>{
//     const stripe = await loadStripe(`${import.meta.env.STRIPE_PUBLIC_KEY}`);

//     const body = {
//         products:productCartItem
//     }
//     const headers = {
//         "Content-Type":"application/json"
//     }
//     const response = await fetch("http://localhost:8001/create-checkout-session",{
//         method:"POST",
//         headers:headers,
//         body:JSON.stringify(body)
//     });

//     const data = await response.json();
//     console.log(data)

//     const result = stripe.redirectToCheckout({sessionId:data.id});
    
//     if(result.error){
//         console.log(result.error);
//     }
// }




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
                  <button className='btn ' style={{position:"absolute" , right:"0" , top:"3px"}} onClick={()=>dispatch(clearCart())}>Clear Cart</button>
                  <h4 className="card-title mb-4" style={{ textDecoration: "underline" }}>YOUR SHOPPING CART </h4>
                  <br />
                  {productCartItem[0]?
                  <>
                 {productCartItem.map((elem)=>{
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
                  }
                </div>
                <div className="border-top pt-4 mx-4 mb-4">
                  <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elemit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip
                  </p>
                </div>
              </div>
            </div>
           
            <div className="" style={{ width: "250px" }}>
              <div className="card col-lg-15  ">
                <div className="card-body" >
                  SUMMARY
                </div>
              </div>
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2">{<FormatPrice price={totalPriceceil}></FormatPrice>}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount:</p>
                    <p className="mb-2 text-success">-{<FormatPrice price={discount}></FormatPrice>}</p>
                  </div>
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
                    <a className="btn  w-100  mb-2" onClick={handlePayment}> Make Purchase </a>
                    <NavLink to="/home" className="btn btn-light w-100 border mt-2"> Back to shop </NavLink>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- summary --> */}
          </div>
        </div>
      </section>
      <br /><br /><br />
      <Gallery heading={"More Products to Buy"}></Gallery>
      <Footer></Footer>
    </>
  )
}

export default Cart