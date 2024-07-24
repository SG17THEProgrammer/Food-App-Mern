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
    useEffect(() => {
      setIsLoading(true)
      setTimeout(()=>{
          toast.error("Pls login to get access")
            navigate("/login")
          },2000)
        }, [isLoggedIn])
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