import React from 'react'
import { NavLink } from 'react-router-dom'
import FormatPrice from '../Helpers/FormatPrice'
import "../css/FoodMall.css"
import { useDispatch } from 'react-redux'
import { addCartItem } from '../redux/productSlide'


const GridView = ({ name, category, price, rating, image, id }) => {
    console.log(id)
    const dispatch = useDispatch()

    const handleAddCartProduct = (e) => {
        dispatch(addCartItem({
            _id: id,
            name: name,
            price: price,
            category: category,
            image: image,
            rating: rating
        }))
    }

    return (
        <>
            <div className="card mb-4  " key={id} style={{ maxWidth: '245px', height: "300px", boxShadow: '10px 10px 8px #888888', margin: "10px 0 0px 20px", backgroundColor: "#FFF7D4" }}>

                <div className="col-md-14 ctn">
                    <NavLink style={{ textDecoration: "none", color: "black" }}
                        to={`/mallmenu/${id}`}
                        onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                        <img src={`${image}`} className="img8 " alt="error" style={{ width: "90%", margin: "10px 0 0 11.5px" }} />
                        <div class="middle">
                            <div class="txt">Read More</div>
                        </div>

                    </NavLink>



                </div>
                <div className="col-md-30">
                    <div className="card-body ">
                        <h5 className="card-name" style={{ marginBottom: "3px" }}>{name} </h5>
                        <p className="card-text" style={{ fontSize: '16px', color: "#BF3131", marginBottom: "3px" }}>{category}</p>
                        <p className="card-text"><small className="text-muted" style={{ marginBottom: "-10px", fontSize: "15px" }}>Price: {<FormatPrice price={price}></FormatPrice>}
                        </small></p>


                        <h5 style={{ position: "absolute", left: "160px", bottom: "50px", fontSize: "16px" }}> <i className="fa-solid fa-star fa-xs" style={{ margin: "5px 25px 0 0", color: "#BF3131" }}></i>
                            {rating}</h5>


                        <button className='btn' style={{ marginLeft: "-5px", marginTop: "-14px" }}
                            onClick={handleAddCartProduct}>Add to Cart</button>

                        <NavLink to="/cart"> <button className='btn' style={{ marginLeft: "4px", marginTop: "-7px", position: "absolute" }}>Go to Cart</button></NavLink>
                        {/* <p style={{ fontSize: '12px', paddingTop: '20px', bottom: '0px' }}>Prices may vary for different occasions</p> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GridView