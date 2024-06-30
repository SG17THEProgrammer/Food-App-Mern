import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import '../css/Menu.css'
import Gallery from '../Image Gallery/Gallery';
import Footer from '../components/Footer';
import { addCartItem } from '../redux/productSlide';
import FormatPrice from '../Helpers/FormatPrice';
import Star from '../Helpers/Star';
import { useAuth } from '../components/Auth';
import { toast } from 'react-toastify';
import Review from '../components/Review';
import Comments from '../components/Comments';

const Menu = () => {
const {isLoggedIn} = useAuth()
  const { id } = useParams();
  const{getCartItems,user} = useAuth()
  const productCartItem = useSelector((state) => state.product.cartItem);

  // console.log(id)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData)

  const productDisplay = productData.filter((elem) => elem._id === id)[0];
console.log(productDisplay)

  const handleAddCartProduct = (e) => {
    isLoggedIn?dispatch(addCartItem(productDisplay)):toast.error("You must be logged in")
  }; 

  const handleBuy = ()=>{
    isLoggedIn?<>
   { dispatch(addCartItem(productDisplay))}
    {setTimeout(()=>{
      navigate("/cart")

    },1000)}</>:toast.error("You must be logged in")
  }

  useEffect(()=>{
    getCartItems();
  },[user,productCartItem])

  return (
    <>
     {productDisplay? <><Review productId={productDisplay._id} userName={user.name}></Review>
      <Navbar></Navbar>
      <div className='upperDiv'>
        <div className="ctnr">
          <div className="crd">
            <div className="crd-image">
              <img src={`${productDisplay.image}`} className='img' />
            </div>
            <div className="crd-text">
              <p className="crd-meal-type">{productDisplay.category}</p>
              <h2 className="crd-title">{productDisplay.name}</h2>

              <span className='star1'><Star rating={productDisplay.rating}></Star>&nbsp;<span className='spantxt'>{(productDisplay.rating - Math.floor(productDisplay.rating)) !== 0 ?productDisplay.rating:productDisplay.rating+".0"}  </span>
          </span>
              <p className="crd-body">{productDisplay.description}</p>
              <button className='butn' style={{ marginRight: "10px", marginLeft: "-5px" }} onClick={handleBuy}>Buy Now</button>
              <button className='butn' style={{marginBottom:"10px"}} onClick={handleAddCartProduct}>Add To Cart</button>
             {user.email=="shray@gmail.com"? <NavLink to={`/edit/${productDisplay._id}`}><button className='butn' style={{marginLeft:"-5px"}} >Edit Product</button></NavLink>:""}
             {user.email=="shray@gmail.com"? <NavLink to={`/edit/${productDisplay._id}`}><button className='butn' style={{marginLeft:"5px"}} >Delete Product</button></NavLink>:""}
            </div>
            <div className="crd-price"><FormatPrice price={productDisplay.price}></FormatPrice> </div>
          </div>
          <div>
            <Comments productId={productDisplay._id} title={"Menu"}></Comments>
          </div>

        </div>
      </div>

      <Gallery heading={"Related Products"} ></Gallery>
      <Footer></Footer>

    </>:""}
    </>
  )
}

export default Menu