import React, { useEffect, useState } from 'react'
import '../../css/Orders/ShowOrders.css'
import { useParams } from 'react-router-dom'
import FormatPrice from '../../Helpers/FormatPrice'
import Comments from '../../components/Review/Comments'
import Navbar from '../../components/navbar'

const ShowOrders = () => {

    const { id } = useParams()
    //console.log(id)
    const [orders, setOrders] = useState();
    console.log(orders)
    // const {category,image,name,price,qty,rating ,total} = orders.items

    const fetchOrders = async () => {
        try {

            const response = await fetch("http://localhost:8001/showOrder", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: id })
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setOrders(data.data)
            }
            else {
                //console.log("Error: " + response)
            }
        } catch (error) {
            //console.log("Error while getting orders" + error)

        }

    }

    useEffect(() => {
        fetchOrders();
    }, [id])


    return (
        <div>
            <Navbar></Navbar>
                    {orders?.map((elem, index) => (
                <div className="projcard-container" style={{ marginTop: "100px" }}>
                                    {elem.items?.map((item)=>{
                                        return <div className="projcard projcard-blue" key={index}>
                                         <div className="projcard-innerbox" key={item._id}>
                                         <>
                                        <img className="projcard-img" src={`${item.image}`} alt="Card Image" />
                                    <div className="projcard-textbox">
                                        <div>
                                            <div className="projcard-title">{item.name}</div>
                                            <span className="projcard-subtitle" style={{ display: "inline" }}>
                                                <div>{item.category}</div>
                                                <span>{item.rating}⭐</span>
                                            </span>
                                            <div className="projcard-bar"></div>
                                            <div className="projcard-description">
                                                Price: <FormatPrice price={item.price}></FormatPrice>
                                            </div>
                                            <div className="projcard-description">
                                                Quantity: {item.qty}
                                            </div>
                                            <div className="projcard-description">
                                                Total: <FormatPrice price={item.total}></FormatPrice>
                                            </div>
                                        </div>
                                        <div>
                                            <Comments productId={item._id}></Comments>
                                        </div>
                                    </div>
                                        </>
                                </div>
                        </div>
                                    })}
                </div>
                    ))}
        

        </div>
    )
}

export default ShowOrders