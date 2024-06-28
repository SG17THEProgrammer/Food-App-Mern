import React, { useEffect, useState } from 'react'
import '../css/Orders.css'
import Comments from '../components/Comments'
import FormatPrice from '../Helpers/FormatPrice'
import { useAuth } from '../components/Auth'
const Orders = ({ navbar, title ,handleStatus}) => {

    const { user } = useAuth()
    const [orders, setOrders] = useState();
    console.log(orders)

    const fetchOrders = async () => {
        try {

            const response = await fetch("http://localhost:8001/getOrder", {
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

    useEffect(() => {
        fetchOrders();
    }, [user._id])


    return (
        <>
            <div style={{ marginBottom: "100px" }}>{navbar}</div>
            <h1 className='title2'>{title ? title : "Your orders"}</h1>
            <div class="ctn1 mt-5 mb-5" style={{ border: "none" }}>
                <div class="d-flex justify-content-center row">
                    <div class="col-md-12">
                        <div class="rounded">
                            <div class="table-responsive table-borderless">
                                <table class="table">
                                    <thead>
                                        <tr>

                                            <th>S. No</th>
                                            <th>Order Id</th>
                                            {title=="All Orders" ? <th>Address</th> : ""}
                                            <th>Order Details</th>
                                            <th>No. of Items</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            {title=="All Orders"?"":<th></th>}
                                        </tr>
                                    </thead>
                                    <tbody class="table-body">

                                        {orders ? orders.map((elem, index) => {
                                            const { userId, items, amount, address, status, date ,_id } = elem;
                                            const { line1, city, state, postal_code, country } = address;
                                            return <>
                                                <tr class="cell-1">
                                                    <td>{++index}</td>
                                                    <td>{userId}</td>
                                                    {title=="All Orders" ? <><td style={{textWrap:"nowrap"}}>  <p>{line1 + " " + city + " , " + state}</p>
                                                        <p>{postal_code + " , " + country}</p>
                                                    </td></> : ""}
                                                    <td><p style={{ textWrap: "nowrap" }}>
                                                        {items ? items.map((item) => {
                                                            return <>{item.name} x {item.qty} {items.length > 1 ? "," : ""} <br />
                                                            </>
                                                        }) : ""}
                                                    </p></td>
                                                    <td><p style={{ fontWeight: "bold", textAlign: "center" }}>{orders.length}</p></td>
                                                    {title=="All Orders"?<td>
                                                        <select onChange={(e)=>handleStatus(e,_id,fetchOrders)} value={status}>
                                                            <option value="Food Processing">Food Processing</option>
                                                            <option value="Out for delivery">Out for delivery</option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>
                                                    </td>:<td><span class="badge badge-success">{status}</span></td>}
                                                    <td><FormatPrice price={amount}></FormatPrice></td>
                                                    <td>{date ? date.substring(0, 10) : ""}</td>
                                                    <td>{date ? date.substring(11, 19) : ""}</td>
                                                   {title=="All Orders"?"": <td><button className='button2' style={{marginTop:"-5px",width:"100px",height:"30px"}} onClick={fetchOrders}>Track Order</button></td>}
                                                </tr>
                                            </>
                                        }) : ""}

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