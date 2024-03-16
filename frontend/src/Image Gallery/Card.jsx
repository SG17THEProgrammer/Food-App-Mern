import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../redux/productSlide'
import FormatPrice from '../Helpers/FormatPrice'

const Card = ({ id, image, name, price, category ,rating}) => {
    // console.log(items)
    // console.log(price.props.price)
    // const actualprice =price.props.price
    const dispatch = useDispatch()

    const handleAddCartProduct = (e) => {
      dispatch(addCartItem({
        _id : id,
        name : name,
        price : price,
        category : category,
        image : image  ,
        rating:rating
      }))}
    return (
        <>

                <div className="card mb-5" key={id} style={{ maxWidth: '270px', height: "350px", boxShadow: '10px 10px 8px #888888', backgroundColor: "#FFF7D4", borderRadius: "4px" ,marginLeft:"40px"}}>
                    <div className="row">

                        <div className="col-md-4 ctn">
                            <NavLink style={{ textDecoration: "none", color: "black" }}
                                to={`/menu/${id}`}
                                onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
                            >
                                <img src={`${image}`} className="img-fluid img2" alt="error" style={{ objectFit: 'cover', height: '180px' }} />
                                <div className="middle">
                                    <div className="txt">Read More</div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body " style={{ width: "270px" }}>
                                <h4 className="card-name">{name} </h4>
                                <h5 className="card-text" style={{ color: "#BF3131" }}>{category}</h5>
                                <h5 style={{ marginBottom: "15px" }} className="card-text"><small className="text-muted" >Price: {<FormatPrice price={price}></FormatPrice>}  </small></h5>
                                <h5 style={{position:"absolute" , left:"170px" , bottom:"47px" , fontSize:"18px "}}> <i className="fa-solid fa-star fa-xs" style={{margin:"6px 30px 0 0" ,color: "#BF3131"}}></i>
{rating}</h5>

                                <button className='btn' style={{ marginLeft: "-8px" }}
                                onClick={handleAddCartProduct}

                                >Add to Cart</button>


                                <NavLink to="/cart"><button className='btn' style={{ marginLeft: "10px" }}

>Go to Cart</button></NavLink>
                                {/* <p style={{ fontSize: '12px', paddingTop: '20px', bottom: '0px' }}>Prices may vary for different occasions</p> */}
                            </div>
                        </div>
                    </div>
                </div>

        </>
    )
}

export default Card