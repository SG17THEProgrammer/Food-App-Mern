import React, { useEffect } from 'react'
import Loader from '../../components/Loader'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
const VerifyOrder = () => {

    const navigate = useNavigate()
    const [searchParams , setSearchParams] = useSearchParams()
    const success =searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment =async()=>{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/verify`,{success,orderId})
        if(response.data.success){
            navigate(`/success/${orderId}`)
        }
        else{
            navigate('/failed')
        }
    } 

    useEffect(()=>{
        verifyPayment()
    },[])
  return (
    <div>
    <Loader></Loader>
    </div>
  )
}

export default VerifyOrder