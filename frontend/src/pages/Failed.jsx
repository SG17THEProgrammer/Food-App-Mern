import React from 'react'
import '../css/Success.css'
import { NavLink } from 'react-router-dom'

const Failed = () => {
  return (
    <div className="row justify-content-center">
    <div className="col-md-5">
        <div className="message-box _success _failed">
             <i className="fa fa-times-circle icon1" aria-hidden="true"></i>
            <h2> Your payment failed </h2>
     <p>  Try again later </p> 
     <NavLink to="/home">
     <button className='butn' style={{marginTop:"50px"}}>Back To Home 🏠</button>
     </NavLink>     

 
    </div> 
</div> 
</div> 

  )
}

export default Failed