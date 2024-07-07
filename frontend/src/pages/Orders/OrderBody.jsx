import React, { useEffect, useState } from 'react'
import FormatPrice from '../../Helpers/FormatPrice'
import { NavLink } from 'react-router-dom'
import '../../css/Orders/Orders.css'
import { useAuth } from '../../components/Auth'
import { toast } from 'react-toastify'

const OrderBody = ({ elem, address, idx, handleStatus, totalQuantities, title, fetchOrders, orders }) => {
    const { user, getCartItems } = useAuth()
    const [cartItem, setCartItem] = useState()
    const [delDetails, setDelDetails] = useState(false)
    console.log(orders)
    let index = idx


    const addToCart = (index1) => {
        try {
            // Get existing items from localStorage
            let existingItems = JSON.parse(localStorage.getItem(user._id)) || [];
    
            // Get new items to be added from orders
            let allItems = [];
            [orders[index1]].forEach((elem) => {
                elem?.items?.forEach((item) => {
                    allItems.push(item);
                });
            });
    
            // Combine existing items and new items
            const combinedItems = existingItems.concat(allItems);
    
            // Filter out duplicates by item ID
            const uniqueItemsMap = new Map();
            combinedItems.forEach(item => {
                if (!uniqueItemsMap.has(item._id)) {
                    uniqueItemsMap.set(item._id, item);
                }
            });
    
            // Convert the map back to an array of unique items
            const uniqueItems = Array.from(uniqueItemsMap.values());
    
            // Determine if any new items were added
            const newItemsAdded = uniqueItems.length > existingItems.length;
    
            // Update the cart state and localStorage with unique items
            setCartItem(uniqueItems);
            localStorage.setItem(`${user._id}`, JSON.stringify(uniqueItems));
    
            // Show appropriate toast message
            if (newItemsAdded) {
                toast.success("Item added to Cart successfully");
            } else {
                toast.error("Item already exists in cart");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    


    useEffect(() => {
        getCartItems();
    }, [user._id, cartItem])


    return (
        <>

            <td>{++index}</td>
            <td>{elem.userId}</td>
            {title == "All Orders" ? <><td style={{ textWrap: "nowrap" }}>  <p>{address.line1 + " " + address.city + " , " + address.state}</p>
                <p>{address.postal_code + " , " + address.country}</p>
            </td></> : ""}
            <td><p style={{ textWrap: "nowrap" }}>
                {elem.items?.map((item, index) => {
                    return <>{item.name} x {item.qty} {index == elem.items.length - 1 ? "" : ","} <br />
                    </>
                })}
            </p></td>
            <td><p style={{ fontWeight: "bold", textAlign: "center" }}>{totalQuantities[idx]?.totalQty}</p></td>
            {title == "All Orders" ? <td>
                <select onChange={(e) => handleStatus(e, elem._id, fetchOrders)} value={elem.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </td> : <td><span class="badge badge-success">{elem.status}</span></td>}



            <td><FormatPrice price={elem.amount}></FormatPrice></td>
            <td>{elem.date?.substring(0, 10)}</td>
            <td>{elem.date?.substring(11, 19)}</td>


            {title == "All Orders" ? "" : <td><NavLink to={`/showOrder/${elem._id}`} style={{ textDecoration: "none" }}><button className='button2' style={{ marginTop: "-5px", width: "100px", height: "30px" }}>Show More</button></NavLink></td>}



            {title == "Your Order Summary" ? "" : <td><button className='button2' style={{ marginTop: "-5px", width: "100px", height: "30px" }} onClick={() => addToCart(`${orders.length - 1 - idx}`)}>Add to Cart</button></td>}
            

{ orders && orders[orders.length - 1 - idx].status === "Out for delivery" ?            <td><button className='button2' style={{ marginTop: "-5px", width: "100px", height: "30px" }} onClick={()=>setDelDetails(!delDetails)}>Track Order</button></td>:""}


            {
  title === "All Orders" ? (
    ""
  ) : (
    <>
      {delDetails && orders && orders[orders.length - 1 - idx].status === "Out for delivery" ? (
        <td className='delmandet'>
          <span className='delmandet'>
            <p className='para5'>Delivery Man Name: {orders[idx]?.delManDetails?.name?orders[idx]?.delManDetails?.name:'Not found'}</p>
            <p className='para5'>Phone No: {orders[idx]?.delManDetails?.phone?orders[idx]?.delManDetails?.phone:"Not Found"}</p>
            <button className='button2' style={{ height: "30px", marginTop: "-5px", width: "100px" }}>
              See location
            </button>
          </span>
        </td>
      ) : (
        ""
      )}
    </>
  )
}


        </>


    )
}

export default OrderBody