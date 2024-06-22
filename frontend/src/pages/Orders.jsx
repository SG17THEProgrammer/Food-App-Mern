import React from 'react'
import '../css/Orders.css'
import Comments from '../components/Comments'
import FormatPrice from '../Helpers/FormatPrice'
const Orders = ({cartItems}) => {
  return (
    <>
    <h1 className='title2'>Your Order</h1>
    {cartItems && cartItems.length > 0?<div className="projcard-container">
        {cartItems && cartItems.length > 0 && cartItems.map((item, index) => (
            <div className="projcard projcard-blue" key={index}>
                <div className="projcard-innerbox">
                    <img className="projcard-img" src={`${item.image}`} alt="Card Image" />
                    <div className="projcard-textbox">
                        <div><div className="projcard-title">{item.name}</div>
                        <span className="projcard-subtitle" style={{display:"inline"}}>
                        <div >{item.category}</div>
                        <span>{item.rating}⭐</span>
                        </span>
                        <div className="projcard-bar"></div>
                        <div className="projcard-description">
                            Price : <FormatPrice price={item.price}></FormatPrice>
                        </div>
                        <div className="projcard-description">
                            Qunatity : {item.qty}
                        </div>
                        <div className="projcard-description">
                            Total : <FormatPrice price={item.total}> </FormatPrice>
                        </div>
                    </div>
                    <div>
                        <Comments productId={item._id}></Comments>
                    </div>
                    </div>
                </div>
            </div>
        ))}
    </div>: <h1 className='title3'>No order placed yet</h1>}
</>

  )
}

export default Orders