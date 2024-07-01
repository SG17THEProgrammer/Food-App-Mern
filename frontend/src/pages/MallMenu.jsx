import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import FormatPrice from '../Helpers/FormatPrice';
import '../css/MallMenu.css'
import Star from '../Helpers/Star';
import Footer from '../components/Footer';
import { addCartItem } from '../redux/productSlide';
import MallMenuOtherProducts from '../components/MallMenuOtherProducts';
import { useAuth } from '../components/Auth';
import { toast } from 'react-toastify';
import Review from '../components/Review';
import Comments from '../components/Comments';


const MallMenu = () => {


  const { id } = useParams();
  const {user,getCartItems,isLoggedIn} =useAuth()
  const productCartItem = useSelector((state) => state.product.cartItem);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
  //console.log(mallproductData)

  const productDisplay = mallproductData.filter((elem) => elem._id === id)[0];
  //console.log(productDisplay)

  //   const handleAddCartProduct = (e) => {
  //     dispatch(addCartItem(productDisplay))
  //   }; 

  const handleBuy = () => {
    isLoggedIn? <>{dispatch(addCartItem(productDisplay))}
    {setTimeout(() => {
      navigate("/cart")
    }, "1000")}</>:toast.error("You must be logged in")
  }

  let image = productDisplay ? `https://source.unsplash.com/random/400x500?${productDisplay.name}`:"";
  const [mainImage, setMainImage] = useState(productDisplay? `${productDisplay.image}`:"");

  useEffect(()=>{
    getCartItems();
  },[user,productCartItem])

  return (

    <>
    {productDisplay?<><Review productId={id} userName={user.name}></Review>
      <Navbar></Navbar>
      <div className="outer">
        <div className="lftdiv">
          <div className="vertical">
            <img src={`${productDisplay.image}`} alt="error" className='img' style={{ width: "106px", marginBottom: "10px", marginRight: "10px" }} onClick={() => setMainImage(`${productDisplay.image}`)} />
            <img src={`${image}`} alt="error" className='img' style={{ marginRight: "10px" }} onClick={() => setMainImage(image)} />
            <img src={`${image}`} alt="error" className='img' style={{ margin: "10px 10px" }} onClick={() => setMainImage(image)} />
            <img src={`${image}`} alt="error" className='img' style={{ marginRight: "10px" }} onClick={() => setMainImage(image)} />
          </div>
          <div className="horizontal">
            <img src={`${mainImage}`} alt="error" className='img1' />
          </div>
        </div>
        
        <div className="rgtdiv">
          <h3>{productDisplay.name}</h3>
          <h5>{productDisplay.category}</h5>
          <span className='star'><Star rating={productDisplay.rating}></Star>&nbsp;<span className='spantxt'>{productDisplay.rating} </span>
          </span>

          <p>MRP: {<FormatPrice price={productDisplay.price}></FormatPrice>}</p>
          <p>{productDisplay.description}</p>
          <div className='service'>
            <div className='serDiv'>
              <div className='icondiv'>
                <i className="fa-solid fa-truck-fast fa-xl icon" ></i>
              </div>
              <p className="" >Free Delivery</p>
            </div>
            <div className='serDiv'>
              <div className='icondiv'>

                <i className="fa-solid fa-recycle fa-xl icon" style={{ right: "9px" }} ></i>
              </div>
              <p className="" >30 days replacement</p>
            </div>

            <div className='serDiv'>
              <div className='icondiv'>

                <i className="fa-solid fa-truck-fast fa-xl icon" ></i>
              </div>
              <p className="" >Home Delivered</p>
            </div>

            <div className='serDiv'>
              <div className='icondiv'>

                <i className="fa-solid fa-award fa-xl icon " style={{ right: "12px" }}></i>
              </div>
              <p className="" >30 days self life</p>
            </div>


          </div>
          <br />
          <span>
          <button className='butn' style={{ width: "100px" , marginRight:"20px" }} onClick={handleBuy}>Buy Now</button>
          {user.email=="shray@gmail.com"?<NavLink to={`/edit/${productDisplay._id}`}><button className='butn' style={{ width: "fit-content" }} >Edit Product</button></NavLink>:""}
          {user.email=="shray@gmail.com"?<NavLink to={`/edit/${productDisplay._id}`}><button className='butn' style={{ width: "fit-content" , marginLeft:"20px" }} >Delete Product</button></NavLink>:""}
          </span>
        </div>
      </div>
      <div className='comment'>
      <Comments productId={id} title={"Menu"}></Comments>
      </div>

    <MallMenuOtherProducts heading={"Other Mall Products"} ></MallMenuOtherProducts>
      <Footer></Footer></>:""}
    </>

  )
}

export default MallMenu