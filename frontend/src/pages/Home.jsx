import React, { useState } from 'react'
import Navbar from '../components/navbar'
import '../css/Home.css'
import SlidingButton from '../components/SlidingButton'
import Gallery from '../Image Gallery/Gallery'
import Slider from '../components/Slider'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'
import FormatPrice from '../Helpers/FormatPrice'
// import Menu from './Menu'
const Home = () => {

  const productData = useSelector((state) => state.product.productList)
  // console.log(productData)

  const homeProductList = productData.slice(0, 6)


  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <div className="left">
          <SlidingButton></SlidingButton>
          <h1 style={{ marginBottom: "40px" }}>The Best Ordering and Delivery at your home</h1>
          <h5 style={{ marginBottom: "50px", fontWeight: "normal" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur laboriosam, vel hic sequi vero eveniet reiciendis blanditiis illum ipsum enim. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium recusandae rem ab fuga maxime aliquam quisquam quasi, molestias in, aut modi nesciunt consequuntur? Saepe suscipit molestias aut hic blanditiis?</h5>
          <button className='butn'>Order Now</button>
        </div>


        <div className="right" >
          {

            homeProductList.map((val) => {
              const { id, name, image, category, price ,_id , rating} = val;
              return (

                        <NavLink style={{ textDecoration: "none", color: "black" }}
                          to={`/menu/${_id}`}
                          onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                <div className="card mb-5" key={id} style={{ maxWidth: '200px', height: "240px", boxShadow: '10px 10px 8px #888888', marginRight: "20px", backgroundColor: "#FFF7D4" }}>
                  <div className="">

                    <div className="col-md-14">

                      <img src={image} className="img-fluid img" alt="error" style={{ }} />
                    
                    </div>
                    <div className="col-md-30">
                      <div className="card-body ">
                          <h5 className="card-name" style={{ marginBottom: "3px" }}>{name} </h5>
                          <p className="card-text" style={{ fontSize: '16px', color: "#BF3131", marginBottom: "3px" }}>{category}</p>
                          <p className="card-text"><small className="text-muted" style={{ marginBottom: "-10px" ,fontSize:"15px"}}>Price: {<FormatPrice price={price}></FormatPrice>}
</small></p>
                          <h5 style={{position:"absolute" , left:"150px" , bottom:"25px", fontSize:"16px" }}> <i className="fa-solid fa-star fa-xs" style={{margin:"4px 25px 0 0" ,color: "#BF3131"}}></i>
{rating}</h5>
                        {/* <button className='btn' style={{ marginLeft: "-10px", marginTop: "10px" }}>Add to Cart</button> */}
                        {/* <p style={{ fontSize: '12px', paddingTop: '20px', bottom: '0px' }}>Prices may vary for different occasions</p> */}
                      </div>
                    </div>
                  </div>
                </div>
                        </NavLink>

              )
            })
          }
        </div>
      </div>
      <Slider></Slider>
      <Gallery heading={"All products"}></Gallery>
      {/* <Menu></Menu> */}
      <Footer></Footer>
    </>
  )
}

export default Home