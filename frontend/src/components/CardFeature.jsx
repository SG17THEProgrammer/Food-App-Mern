import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink}   from 'react-router-dom'
import '../css/Slider.css'
import { addCartItem } from '../redux/productSlide'
import FormatPrice from '../Helpers/FormatPrice'
import { useAuth } from './Auth'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'

const CardFeature = ({ image, name, price, category, id ,rating}) => {
  // const actualprice =price.props.price
  
    const productCartItem = useSelector((state) => state.product.cartItem);
    // //console.log(productCartItem)  
const {user,saveCartItemsToLS,isLoggedIn} = useAuth()
// //console.log(user)


  const dispatch = useDispatch()

  const handleAddCartProduct = () => {
    isLoggedIn?dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image,  
      rating: rating
    })):toast.error("Pls login to add cart")
  }
  
  useEffect(()=>{
    user?saveCartItemsToLS(productCartItem,user._id):""
  },[productCartItem])


  return (
    <>
         <div className="sliderCards" >
          <NavLink style={{textDecoration:"none" , color: "black"}}
            to={`/mallmenu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="imgDiv">
              <img src={image}  style={{height:"147px" , width:"198px" , marginLeft:"2.9px" }} className='img'/>
            </div>
            <div className='content'>
            <h1 className="name">
              {name}
            </h1>
            <h4  style={{paddingLeft:"10px",color:"#BF3131"}}>{category}</h4>
            <h5>
              <span  style={{paddingLeft:"10px"}}></span>
              <span><FormatPrice price={price}></FormatPrice></span>
            </h5>
            {/* <h5 style={{position:"absolute" , left:"130px" , bottom:"0.1px" }}> <i className="fa-solid fa-star fa-xs" style={{margin:"6px 30px 0 0" ,color: "#BF3131"}}></i>
{rating}</h5> */}
<div className='rating1' style={{marginTop:"10px"}}>
                              <FaStar style={{fontSize:"15px",marginRight:"2px" , color:"#BF3131"}}/>
                            <p style={{marginTop:"-2px"}}>
                              {rating}</p>
                              {/* <i className="fa-solid fa-star fa-xs"></i> */}
                          </div>
          </div>
          </NavLink>
          <div style={{display:"flex"}}>
          <span><button
            className="btn" style={{margin:"10px 0px 5px 4px"}}
            onClick={handleAddCartProduct}
          >
            Add Cart
          </button></span>
          <NavLink to="/cart"><span><button className="btn" style={{margin:"10px 0px 5px 4px"}} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}> Go to Cart </button></span></NavLink>
          </div>  
    
    </div>
    </>
  )
}

export default CardFeature