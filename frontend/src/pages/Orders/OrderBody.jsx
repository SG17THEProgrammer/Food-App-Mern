import React from 'react'
import FormatPrice from '../../Helpers/FormatPrice'
import { NavLink } from 'react-router-dom'
import '../../css/Orders/Orders.css'
const OrderBody = ({elem,address,idx,handleStatus,totalQuantities,title,fetchOrders}) => {
    // console.log(totalQuantities[3].totalQty)
    let index = idx
  return (
    <>
    
                                                    <td>{++index}</td>
                                                    <td>{elem.userId}</td>
                                                    { title=="All Orders" ? <><td style={{textWrap:"nowrap"}}>  <p>{address.line1 + " " + address.city + " , " + address.state}</p>
                                                        <p>{address.postal_code + " , " + address.country}</p>
                                                    </td></>:"" }
                                                    <td><p style={{ textWrap: "nowrap" }}>
                                                        {elem.items?.map((item,index) => {
                                                            return <>{item.name} x {item.qty} {index==elem.items.length-1 ? "" : ","} <br />
                                                            </>
                                                        })}
                                                    </p></td>
                                                    <td><p style={{ fontWeight: "bold", textAlign: "center" }}>{totalQuantities[idx]?.totalQty}</p></td>
                                                    { title=="All Orders"?<td>
                                                        <select onChange={(e)=>handleStatus(e,elem._id,fetchOrders)} value={elem.status}>
                                                            <option value="Food Processing">Food Processing</option>
                                                            <option value="Out for delivery">Out for delivery</option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>
                                                    </td>:<td><span class="badge badge-success">{elem.status}</span></td>}
                                                    <td><FormatPrice price={elem.amount}></FormatPrice></td>
                                                    <td>{ elem.date?.substring(0, 10) }</td>
                                                    <td>{ elem.date?.substring(11, 19) }</td>
                                                   {/* { title=="All Orders"?"": <td><button className='button2' style={{marginTop:"-5px",width:"100px",height:"30px"}} onClick={fetchOrders}>Track Order</button></td>} */}
                                                   {title=="All Orders"?"": <td><NavLink to={`/showOrder/${elem._id}`} style={{textDecoration:"none"}}><button className='button2' style={{marginTop:"-5px",width:"100px",height:"30px"}}>Show More</button></NavLink></td>}
    </>
  )
}

export default OrderBody