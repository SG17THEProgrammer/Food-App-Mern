import React, { useEffect, useState } from 'react'
import '../../css/Orders/Orders.css'
import FormatPrice from '../../Helpers/FormatPrice'
import { useAuth } from '../../components/Auth'
import { NavLink } from 'react-router-dom'
import OrderBody from './OrderBody'
const Orders = ({ navbar, title, handleStatus, btn }) => {

    const { user } = useAuth()
    const [orders, setOrders] = useState();
    const [allOrders, setAllOrders] = useState();
    // console.log(orders)
    console.log(allOrders)
    // console.log(delMan)

    const fetchOrders = async () => {
        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/getOrder`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id })
            })

            if (response.ok) {
                const data = await response.json()
                setOrders(data.data)
            }
            else {
                console.log("Error: " + response)
            }
        } catch (error) {
            console.log("Error while getting orders" + error)

        }

    }

    const fetchAllOrders = async () => {
        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/getAllOrders`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                const data = await response.json()
                setAllOrders(data.data)
            }
            else {
                console.log("Error: " + response)
            }
        } catch (error) {
            console.log("Error while getting orders" + error)

        }

    }



    const totalQuantities = allOrders ? allOrders.map(order => {
        const totalQty = order.items.reduce((acc, item) => acc + item.qty, 0);
        return {
            totalQty
        };
    }) : "";
    console.log(totalQuantities)


    useEffect(() => {
        fetchOrders();
        fetchAllOrders();
    }, [user._id])

    console.log(orders)
    return (
        <>
            <div style={{ marginBottom: "85px" }}>{navbar}</div>
            <span>
                <h1 className='title2'>{title ? title : "Your orders"}</h1>
                {title == "Your Order Summary" ? btn : ""}
            </span>
            <div class="ctn3 mt-3 mb-5 " style={{ border: "none" }}>
                <div class="" style={{ marginBottom: "200px" }}>
                    <div class="">
                        <div class="rounded" >
                            <div class="table-responsive table-borderless">
                                <table class="table" >
                                    {/* table head is in orderbody */}
                                    <thead>
                                        <tr>
                                            {orders?.length > 0 ? <>
                                                {<th>S. No</th>}
                                                <th>Order Id</th>
                                                {title == "All Orders" ? <th>Address</th> : ""}
                                                <th>Order Details</th>
                                                <th>No. of Items</th>
                                                <th>Status</th>
                                                <th>Total</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                {/* {title == "All Orders" ? <th></th> : ""} */}
                                                {title == "All Orders" ? "" : <th></th>}
                                                {title == "All Orders" ? "" : <th></th>}
                                                {title == "All Orders" ? "" : <th></th>}
                                                {title == "Your Order Summary" ? "" : <th></th>} </> : <h2>No orders found</h2>}
                                        </tr>
                                    </thead>
                                    <tbody class="table-body">
                                        {title === "All Orders" ? (
                                            allOrders?.slice().reverse().map((elem, index) => {
                                                let idx = index;
                                                const { address } = elem;
                                                return (
                                                    <>
                                                        <tr className="cell-1" key={idx}>
                                                            <OrderBody elem={elem} address={address} idx={idx} title={title} handleStatus={handleStatus} totalQuantities={totalQuantities} fetchOrders={fetchOrders}  allOrders={allOrders}/>
                                                        </tr>
                                                                                 </>
                                                );
                                            })

                                        ) : title === "Your Order Summary" ? (

                                            orders?.slice().reverse().slice(0, 1).map((elem, index) => {
                                                let idx = index;
                                                const { address } = elem;
                                                return (
                                                    <>
                                                    <tr className="cell-1" key={idx}>
                                                        <OrderBody elem={elem} address={address} idx={idx} totalQuantities={totalQuantities} title={title} />
                                                    </tr>
                                                    
                                                   
                                                    </>
                                                    
                                                );
                                            })
                                        )
                                            : orders?.slice().reverse().map((elem, index) => {
                                                let idx = index;
                                                const { address } = elem;
                                                return (
                                                    <>
                                                        <tr className="cell-1" key={idx}>
                                                            <OrderBody elem={elem} address={address} idx={idx} totalQuantities={totalQuantities} orders={orders} title={title} />
                                                        </tr>
                                                        
                                                        
                                                            
                                                    </>
                                                );
                                            })}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Orders