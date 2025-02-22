import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../css/FoodMall.css"
import FormatPrice from '../Helpers/FormatPrice'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../redux/productSlide'
import { useAuth } from './Auth'
import { toast } from 'react-toastify'


const ListView = ({ id, name, image, category, price, rating, description }) => {
  const {user,isLoggedIn,getReviews} = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAddCartProduct = (e) => {
      isLoggedIn?dispatch(addCartItem({
        _id : id,
        name : name,
        price : price,
        category : category,
        image : image  ,
        rating:rating
      })):toast.error("You must be logged in")}
      const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
      const productDisplay = mallproductData.filter((elem) => elem._id === id)[0];
//console.log(productDisplay)

const handleReadMore=(e)=>{
  e.preventDefault();
  navigate(`/mallmenu/${id}`)
  window.scrollTo({ top: "0", behavior: "smooth" })
  getReviews(id,user?.name)
}

  return (
    <>
    <div className='listDiv'>
        <div className="card mb-3" style={{maxWidth:"",backgroundColor:"#FFF7D4", margin:"20px"}} key={id}>
                  <div className="row g-0">
                    <div className="col-md-3 shine-effect" onClick={handleReadMore}>
                    {/* <NavLink style={{ textDecoration: "none", color: "black" }}
                          to={`/mallmenu/${id}`}
                          onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}> */}
                      <img src={`${image}`} className="img9 "  alt="error" style={{cursor:"pointer"}} onClick={handleReadMore}></img> 
                      {/* </NavLink> */}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h4 className="card-title">{name}</h4>
                        <p>{category}</p>
                        <div>
                        <h5 className="card-text"><FormatPrice price={price}></FormatPrice></h5><br />
                        <p className="card-text para2">⭐{rating}</p>
                        </div>
                        <p className="card-text">{description}</p>
                        <button className='btn' onClick={handleAddCartProduct} >Add to Cart</button> &nbsp;
                        <NavLink to='/cart'><button className='btn' onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>Go to Cart</button> </NavLink> &nbsp;
                        {/* <NavLink to={`/mallmenu/${id}`} > */}
                        <button className='btn' onClick={handleReadMore}>Read More</button>
                        {/* </NavLink> */}
                        &nbsp;&nbsp;
                        {user.email=="shray@gmail.com"? <NavLink to={`/edit/${productDisplay._id}`}><button className='btn' >Edit Product</button></NavLink>:""}
                        {/* {user.email=="shray@gmail.com"? <NavLink to={`/edit/${productDisplay._id}`}><button className='btn' style={{marginLeft:"10px"}}>Delete Product</button></NavLink>:""} */}

                      </div>
                    </div>
                  </div>
                </div>
                </div>
    </>
  )
}

export default ListView