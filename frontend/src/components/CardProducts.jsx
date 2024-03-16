import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteCartItem ,increaseQty,decreaseQty} from '../redux/productSlide'
import '../css/Cart.css'
import FormatPrice from '../Helpers/FormatPrice'

const CardProducts = ({qty,total,price,id,name,category,image}) => {
    const dispatch = useDispatch()
  //   console.log(price.props.price)
  // const actualprice =price.props.price;
console.log(total)





    
    const priceInNumber = parseFloat(price)
    console.log(priceInNumber)
    // const priceTill3Dec = priceInNumber.toFixed(2)
    // // console.log(priceNo)
    // console.log(typeof(priceInNumber))

  return (
    <>
         <div className="row  mb-5">
                    <div className="col-lg-5">
                      <div className="me-lg-5">
                        <div className="d-flex">
                          <img src={`${image}`} style={{ width: "96px", height: "96px" }} />
                          <div className="about">
                            <NavLink to="" className="nav-link" style={{marginBottom:"10px"}}>{name}</NavLink>
                            <p className="text-muted" style={{color:"red"}}>{category}</p>
                          </div>
                        </div>
                      </div>
                    </div>


                    
                    <div className="col-lg-5  d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                      <div className="butn3" >
                      <p style={{textAlign:"center"}}>Quantity</p>
                      <div className='btn3'>
                        <button  className='butn btn'  
                        // style={{margin:"-2px 0 0 -18px" ,padding:"1px"}}
                        //  onClick={minus}
                        onClick={()=>dispatch(decreaseQty(id))}
                         >➖</button>

                        <span  className='input' 
                        // onChange={handleInput} 
                        // value={inputValue}

                       >{qty}</span> 

                        <button className='butn btn'
                        //  style={{padding:"1px"}} 
                        // onClick={alert("hi")}
                        onClick={()=>dispatch(increaseQty(id))}
                        
                        
                >➕</button>
                </div>


                      </div>
                      <div className="text">
                        <p className="h6">
                        Total Price :   &nbsp;
                        {/* {priceTill3Dec*qty} */}
                        {<FormatPrice price={Math.ceil(total)}></FormatPrice>}
                        </p>
                        <small className="text-muted text-nowrap" style={{marginTop:"-50px"}}> {priceInNumber}/ per item </small>
                      </div>
                    </div>
                    <div className="col-lg col-sm-6 d-flex  justify-content-xl-end ">
                      <div className="float-md-end">
                        <button  className="btn btn-light border text-danger icon-hover-danger" onClick={()=>dispatch(deleteCartItem(id))}> Remove</button>
                      </div>
                    </div>
                  </div>
    </>
  )
}

export default CardProducts