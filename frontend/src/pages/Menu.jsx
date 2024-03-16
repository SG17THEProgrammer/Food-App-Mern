import React from 'react'
import Navbar from '../components/navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import '../css/Menu.css'
import Gallery from '../Image Gallery/Gallery';
import Footer from '../components/Footer';
import { addCartItem } from '../redux/productSlide';
import FormatPrice from '../Helpers/FormatPrice';
import Star from '../Helpers/Star';

const Menu = () => {

  const { id } = useParams();
  // console.log(id)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData)

  const productDisplay = productData.filter((elem) => elem._id === id)[0];
// console.log(productDisplay)

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay))
  }; 

  const handleBuy = ()=>{
    dispatch(addCartItem(productDisplay))
      navigate("/cart")
  }


  return (
    <>
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

              <span className='star1'><Star rating={productDisplay.rating}></Star>&nbsp;<span className='spantxt'>{productDisplay.rating} </span>
          </span>
              <p className="crd-body">{productDisplay.description}</p>
              <button className='butn' style={{ marginRight: "10px", marginLeft: "-5px" }} onClick={handleBuy}>Buy Now</button>
              <button className='butn' onClick={handleAddCartProduct}>Add To Cart</button>
            </div>
            <div className="crd-price"><FormatPrice price={productDisplay.price}></FormatPrice> </div>
          </div>

        </div>
      </div>

      <Gallery heading={"Related Products"} ></Gallery>
      <Footer></Footer>

    </>
  )
}

export default Menu