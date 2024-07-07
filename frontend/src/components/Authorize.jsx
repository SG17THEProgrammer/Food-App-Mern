import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from './Auth';
import Loader from './Loader';

const Authorize = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
	const[isLoading ,setIsLoading] = useState(false)


  {
    !isLoggedIn ?
      setTimeout(()=>{
        useEffect(() => {
          setIsLoading(true)
          toast.error("Pls login to get access")
            navigate("/login")
        }, [isLoggedIn])
      },2000)
      :
      useEffect(() => {
        setIsLoading(true)
          toast.error("You are already logged in")
          navigate("/")
      }, [isLoggedIn])
  }

  return (
    <>
    {isLoading?<Loader></Loader>:""}
    </>
  )
}

export default Authorize