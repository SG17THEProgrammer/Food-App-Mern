import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from './Loader';

const Authorize = ({isLoggedIn}) => {
  const navigate = useNavigate();
	const[isLoading ,setIsLoading] = useState(false)

const [hasMounted, setHasMounted] = useState(false);

useEffect(() => {
  if (!hasMounted) {
    setIsLoading(true)
    setHasMounted(false);
    setTimeout(() =>{
      navigate('/')
      // isLoggedIn ? toast.error("You're already logged in") :  toast.error("Login to get access") 
    },2000)
    return;
    }
  },
    [hasMounted, navigate])


  return (
    <>
    {isLoading?<Loader></Loader>:""}
    </>
  )
}

export default Authorize