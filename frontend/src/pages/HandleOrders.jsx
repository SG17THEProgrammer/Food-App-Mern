import React from 'react'
import Orders from './Orders'
import Navbar from '../components/Navbar'

const HandleOrders = () => {
  return (
    <div>
    <Navbar></Navbar>
        <Orders title={"All Orders"}></Orders>
    </div>
  )
}

export default HandleOrders