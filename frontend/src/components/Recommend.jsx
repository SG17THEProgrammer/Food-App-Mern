import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import '../css/Recommend.css'
import axios from 'axios'
import FormatPrice from '../Helpers/FormatPrice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../redux/productSlide'
import { useAuth } from './Auth'

const Recommend = () => {
  const {isLoggedIn,user,getCartItems,saveCartItemsToLS,cartItems} = useAuth();
  const productCartItem = useSelector((state) => state.product.cartItem);
  
  
  
  const dispatch = useDispatch()
  
  const [age, setAge] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [recommProd, setrecommProd] = useState([]);
  
  const handleInputChange = (e) => {
    setAge(e.target.value);
  };
  


  const fetchRecommendations = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/recommendations`, { age,recommProd });
      // console.log(response);

        setRecommendations(response.data.recommendedProducts);
      
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message[0])
    }
  };

  const getRecommendedProducts = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/recommndProducts`);
        // console.log(response);
        setrecommProd(response.data.recommndProducts);
    } catch (error) {
      
    }
  }


  const addToCart = (id) => {
    // console.log(id)
    const productDisplay = recommendations.filter((elem) => elem._id === id)[0];
    // console.log(productDisplay);
    isLoggedIn?dispatch(addCartItem(productDisplay)):toast.error("You must be logged in")
}

useEffect(()=>{
  getRecommendedProducts()
},[])

useEffect(()=>{
    getCartItems();
  },[user,productCartItem,cartItems])

  useEffect(()=>{
    user?saveCartItemsToLS(productCartItem,user._id):""
  },[productCartItem])


  return (
<>
<Navbar></Navbar>
<div className='recommend'>
<h1 style={{marginLeft:"70px"}}>Age-based Food Recommendations</h1>
      <div className='divbtn'>
      <input
        type="number"
        value={age}
        onChange={handleInputChange}
        placeholder="Enter your age" className='inp3'
      />
      <button onClick={fetchRecommendations} className='btn5'>Get Recommendations</button>
      </div>
      <ul>
  <>
    {recommendations && recommendations.length > 0 ? (
      <ul>
            <div className='cardOutrDiv'>
        {recommendations?.map((elem, index) => {
          const {name, price,rating , image,description,_id} = elem
          return (
            <>

            <div className="card1">
  <img
    className="card1__background"
    src={`${image}`}
    alt="error"
    width={1300}
    height={100}
            
  />
  <div className="card1__content | flow">
    <div className="card1__content--container | flow">
      <h2 className="card1__title">{name}</h2>
      <h3 className="card1__description">
        {description}
      </h3>
      <h4 className="card1__description">
      Price: <FormatPrice price={price}></FormatPrice>
      </h4>
      <p className="card1__description">
       Rating :  {rating}⭐
      </p>
    </div>
    <span className='span' >
    <button className="card1__button" style={{marginRight:"20px"}}>Read more</button>
    <button className="card1__button" onClick={()=>addToCart(_id)}>Add to Cart</button>
    </span>
  </div>
</div>

            </>
          );
        })}
            </div>
      </ul>
    ) : (
      <h2 style={{marginLeft:"70px"}}></h2>
    )}
  </>


      </ul>
    </div>
</>  )
}

export default Recommend