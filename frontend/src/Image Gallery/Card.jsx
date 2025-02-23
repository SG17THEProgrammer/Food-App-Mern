import React, { useEffect, useState } from 'react'
import './style.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../redux/productSlide'
import FormatPrice from '../Helpers/FormatPrice'
import { useAuth } from '../components/Auth'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'

const Card = ({ id, image, name, price, category, rating }) => {
    // //console.log(items)
    // //console.log(price.props.price)
    // const actualprice =price.props.price

    const dispatch = useDispatch()
    const { user, saveCartItemsToLS, isLoggedIn,getReviews } = useAuth()
    const navigate = useNavigate()
    // //console.log(user)    

    const productCartItem = useSelector((state) => state.product.cartItem);
    // //console.log(productCartItem)
    const productData = useSelector((state) => state.product.productList)
    const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
    const allproducts = [...productData, ...mallproductData];

    const productDisplay = allproducts.filter((elem) => elem._id === id)[0];
    //   //console.log(productDisplay)




    const handleAddCartProduct = async (e) => {
        e.preventDefault();
        isLoggedIn ? dispatch(addCartItem({
            _id: id,
            name: name,
            price: price,
            category: category,
            image: image,
            rating: rating,
        })) : toast.error("You must be logged in")

    }

    const handleReadMore=(e)=>{
        e.preventDefault();
        navigate(`/menu/${id}`)
        window.scrollTo({ top: "0", behavior: "smooth" })
        getReviews(id,user?.name)
    }

    useEffect(() => {
        user ? saveCartItemsToLS(productCartItem, user._id) : ""
    }, [productCartItem])

    return (
        <>

            <div className="card mb-5" key={id} style={{ maxWidth: '260px', height: "fit-content", boxShadow: '10px 10px 8px #888888', backgroundColor: "#FFF7D4", borderRadius: "4px", marginLeft: "40px" }}>
                <div className="row">

                    <div className="col-md-12 ctn">
                        {/* <NavLink style={{ textDecoration: "none", color: "black" }}
                            to={`/menu/${id}`}
                           
                        > */}
                            <img src={`${image}`} className="img-fluid img2" alt="error" style={{ objectFit: 'cover', height: '180px', cursor:"pointer"}} onClick={handleReadMore}/>
                            <div className="middle" onClick={handleReadMore}>
                                <div className="txt" >Read More</div>
                            </div>
                        {/* </NavLink> */}
                    </div>
                    <div className="col-md-12">
                        <div className="card-body">
                            <h4 className="card-name">{name} </h4>
                            <h5 className="card-text" style={{ color: "#BF3131" }}>{category}</h5>
                            <div className='catRat' >

                            <h5 style={{ margin: "0 15px 15px 0 " }} className="card-text"><small className="text-muted" >Price: {<FormatPrice price={price}></FormatPrice>}  </small></h5>
                            {/* <h5 style={{position:"absolute" , left:"170px" , bottom:"47px" , fontSize:"18px "}}> <i className="fa-solid fa-star fa-xs" style={{margin:"6px 30px 0 0" ,color: "#BF3131"}}></i>
{rating}</h5> */}
<p style={{fontSize:"17px"}}> 
                                                            <FaStar style={{fontSize:"15px", color:"red",marginRight:"3px",marginBottom:"3px"}}/>
                              {rating}</p>
</div>
                                <div className='btnDiv1'>

                            <button className='btn' style={{ marginBottom: "5px" }}
                                onClick={handleAddCartProduct}

                            >Add to Cart</button>


                            <NavLink to="/cart"><button className='btn' style={{ marginBottom: "5px" }}

                                onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>Go to Cart</button></NavLink>
                            {user.email === "shray@gmail.com" ?
                                <NavLink to={`/edit/${productDisplay._id}`}><button className='btn' 
                                >Edit Product</button></NavLink> : ""}
                                </div>
                            {/* {user.email === "shray@gmail.com" ?
                                <NavLink to={`/edit/${productDisplay._id}`}><button className='btn' style={{ marginLeft: "8px" }}

                                >Delete Prod.</button></NavLink> : ""} */}
                            {/* <p style={{ fontSize: '12px', paddingTop: '20px', bottom: '0px' }}>Prices may vary for different occasions</p> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Card