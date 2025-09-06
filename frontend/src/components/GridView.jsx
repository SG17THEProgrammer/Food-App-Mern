import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import FormatPrice from '../Helpers/FormatPrice'
import "../css/FoodMall.css"
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../redux/productSlide'
import { useAuth } from './Auth'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'


const GridView = ({ name, category, price, rating, image, id }) => {
    const{user,isLoggedIn,getReviews} = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleAddCartProduct = (e) => {
        isLoggedIn?dispatch(addCartItem({
            _id: id,
            name: name,
            price: price,
            category: category,
            image: image,
            rating: rating
        })):toast.error("You must be logged in")
    }
    const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
    const productDisplay = mallproductData.filter((elem) => elem._id === id)[0];
// //console.log(productDisplay)

const handleReadMore=(e)=>{
    e.preventDefault();
    navigate(`/mallmenu/${id}`)
    window.scrollTo({ top: "0", behavior: "smooth" })
    getReviews(id,user?.name)
}
    return (
        <>
            <div className="card mb-4  " key={id} style={{ boxShadow: '10px 10px 8px #888888', margin: "10px 0 0px 20px", backgroundColor: "#FFF7D4" }}>

                <div className="col-md-14 ctn">
                    {/* <NavLink style={{ textDecoration: "none", color: "black" }}
                        to={`/mallmenu/${id}`}
                        onClick={handleReadMore}> */}
                        <img src={`${image}`} className="img8 " alt="error" style={{ width: "90%", margin: "10px 0 0 11.5px" ,cursor:"pointer" }} onClick={handleReadMore} />
                        <div className="middle" onClick={handleReadMore}>
                            <div className="txt">Read More</div>
                        </div>

                    {/* </NavLink> */}



                </div>
                <div className="col-md-30">
                    <div className="card-body ">
                        <h5 className="card-name" style={{ marginBottom: "3px" }}>{name} </h5>
                        <p className="card-text" style={{ fontSize: '16px', color: "#BF3131", marginBottom: "3px" }}>{category}</p>

                        <div className='priceRat'>
                        <div className="card-text"><small className="text-muted" style={{ fontSize: "15px" }}>Price: {<FormatPrice price={price}></FormatPrice>}
                        </small></div>


                        {/* <h5 style={{ position: "absolute", left: "160px", bottom: "80px", fontSize: "16px" }}> <i className="fa-solid fa-star fa-xs" style={{ margin: "5px 25px 0 0", color: "#BF3131" }}></i>
                            {rating}</h5> */}

                            <div className='rating1' s>
                            <div>

                              <FaStar style={{fontSize:"15px", color:"red"}}/>
                            </div>

                            <div>
                              {rating}</div>
                          </div>

                          </div>

                    <div className='btndiv'>

                        <button className='btn'
                            onClick={handleAddCartProduct}>Add to Cart</button>
&nbsp; &nbsp;
                        <NavLink to="/cart"> <button className='btn' onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>Go to Cart</button></NavLink>
                        {user.email=="shray@gmail.com"? <NavLink to={`/edit/${productDisplay._id}`}><button className='btn' style={{marginLeft:"-5px",marginTop:"5px"}} >Edit Product</button></NavLink>:""}
                        {/* {user.email=="shray@gmail.com"? <NavLink to={`/edit/${productDisplay._id}`}><button className='btn' style={{marginLeft:"5px",marginTop:"5px"}} >Delete</button></NavLink>:""} */}
                       
                        {/* <p style={{ fontSize: '12px', paddingTop: '20px', bottom: '0px' }}>Prices may vary for different occasions</p> */}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GridView