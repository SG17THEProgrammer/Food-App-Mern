import React from 'react'
import '../css/Error.css'
import Navbar from '../components/navbar'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
<body>
<Navbar></Navbar>
    <div class="container container3">        
        <img src="https://images.unsplash.com/photo-1697530152990-2c47d3cf7d7a?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" className='img9'/>
        <h1 className='h11'>404</h1>
        <p className='p'>Oops! Page not found</p>
        <NavLink to='/home' style={{color:"white"}}>

        <a className='a'>Go back to homepage</a>
        </NavLink>
      </div>
</body>
  )
}

export default Error