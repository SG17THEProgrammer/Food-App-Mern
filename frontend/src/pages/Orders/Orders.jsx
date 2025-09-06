import React, { useEffect, useState } from 'react'
import '../../css/Orders/Orders.css'
import { useAuth } from '../../components/Auth'
import OrderBody from './OrderBody'

const Orders = ({ navbar, title, handleStatus, btn }) => {
  const { user } = useAuth()
  const [orders, setOrders] = useState()
  const [allOrders, setAllOrders] = useState()

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
      } else {
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
      } else {
        console.log("Error: " + response)
      }
    } catch (error) {
      console.log("Error while getting orders" + error)
    }
  }

  // compute total quantities separately
  const totalQuantitiesAll = allOrders
    ? allOrders.map(order => ({
        totalQty: order.items.reduce((acc, item) => acc + item.qty, 0),
      }))
    : []

  const totalQuantitiesUser = orders
    ? orders.map(order => ({
        totalQty: order.items.reduce((acc, item) => acc + item.qty, 0),
      }))
    : []

  useEffect(() => {
    fetchOrders()
    fetchAllOrders()
  }, [user._id])

  return (
    <>
      <div style={{ marginBottom: "85px" }}>{navbar}</div>
      <span>
        <h1 className='title2'>{title ? title : "Your orders"}</h1>
        {title === "Your Order Summary" ? btn : ""}
      </span>
      <div className="ctn3 mt-3 mb-5" style={{ border: "none" }}>
        <div style={{ marginBottom: "200px" }}>
          <div>
            <div className="rounded">
              <div className="table-responsive table-borderless">
                <table className="table">
                  <thead>
                    <tr>
                      {orders?.length > 0 ? (
                        <>
                          <th>S. No</th>
                          <th>Order Id</th>
                          {title === "All Orders" ? <th>Address</th> : ""}
                          <th>Order Details</th>
                          <th>No. of Items</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Date</th>
                          <th>Time</th>
                          {title === "All Orders" ? "" : <th></th>}
                          {title === "All Orders" ? "" : <th></th>}
                          {title === "All Orders" ? "" : <th></th>}
                          {title === "Your Order Summary" ? "" : <th></th>}
                        </>
                      ) : (
                        <h2>No orders found</h2>
                      )}
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {title === "All Orders" ? (
                      allOrders?.slice().reverse().map((elem, index) => (
                        <tr className="cell-1" key={index}>
                          <OrderBody
                            elem={elem}
                            address={elem.address}
                            idx={index}
                            title={title}
                            handleStatus={handleStatus}
                            totalQuantities={totalQuantitiesAll}
                            fetchOrders={fetchOrders}
                            allOrders={allOrders}
                          />
                        </tr>
                      ))
                    ) : (
                      orders?.slice().reverse().map((elem, index) => (
                        <tr className="cell-1" key={index}>
                          <OrderBody
                            elem={elem}
                            address={elem.address}
                            idx={index}
                            title={title}
                            totalQuantities={totalQuantitiesUser}
                            orders={orders}
                          />
                        </tr>
                      ))
                    )}
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
