import React, { useEffect, useState } from 'react'
import '../css/ShowOrders.css'
import { useParams } from 'react-router-dom'
import FormatPrice from '../Helpers/FormatPrice'
import Comments from '../components/Comments'
import Navbar from '../components/navbar'

const ShowOrders = () => {

    const { id } = useParams()
    console.log(id)
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
                setOrders(data.data.items)
            }
            else {
                console.log("Error: " + response)
            }
        } catch (error) {
            console.log("Error while getting orders" + error)

        }

    }

    useEffect(() => {
        fetchOrders();
    }, [id])


    return (
        <div>
            <Navbar></Navbar>
            {orders && orders.length > 0 ? (
                <div className="projcard-container" style={{ marginTop: "100px" }}>
                    {orders.map((elem, index) => (
                        <div className="projcard projcard-blue" key={index}>
                                <div className="projcard-innerbox" key={elem._id}>
                                    <img className="projcard-img" src={`${elem.image}`} alt="Card Image" />
                                    <div className="projcard-textbox">
                                        <div>
                                            <div className="projcard-title">{elem.name}</div>
                                            <span className="projcard-subtitle" style={{ display: "inline" }}>
                                                <div>{elem.category}</div>
                                                <span>{elem.rating}⭐</span>
                                            </span>
                                            <div className="projcard-bar"></div>
                                            <div className="projcard-description">
                                                Price: <FormatPrice price={elem.price}></FormatPrice>
                                            </div>
                                            <div className="projcard-description">
                                                Quantity: {elem.qty}
                                            </div>
                                            <div className="projcard-description">
                                                Total: <FormatPrice price={elem.total}></FormatPrice>
                                            </div>
                                        </div>
                                        <div>
                                            <Comments productId={elem._id}></Comments>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h1 className="title3">No order placed yet</h1>
            )}

        </div>
    )
}

export default ShowOrders