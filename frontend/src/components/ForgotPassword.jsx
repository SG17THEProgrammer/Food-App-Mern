import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../css/ForgotPassword.css'
import { FaLock } from "react-icons/fa";
import { MdForwardToInbox } from "react-icons/md";
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [email,setEmail] = useState({
        email: "",

    })

    const handleInput =(e)=>{
        const {name,value} = e.target
        setEmail({
            ...email,
            [name]: value
        })
    }

    const handleSubmit= async()=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/forgotPassword`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(email)
            })
            console.log(response)

            const data = await response.json()
            console.log(data)

            if(response.status==400){
                toast.error(data.msg)
            }

            else{
                toast.success(data.msg)
                setEmail("")
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <Navbar></Navbar>
    <div className='forgotPass'>   
    <div className=" card5">
        <p className="lock-icon"><FaLock style={{marginLeft:"-20px"}}></FaLock></p>
        <h2 className='h2'><b>Forgot Password?</b></h2>
        <p className='p'>You can reset your Password here</p>
        <span className="passInput" >
        <input type="text" style={{background: "transparent",paddingLeft:"50px"
}} placeholder="Email address" name='email' value={email.email} onChange={handleInput}/>
        <MdForwardToInbox className='icn1'></MdForwardToInbox>
        </span>
        <button className='button4' onClick={handleSubmit}>Send My Password</button>
    </div>
    </div>
    </>
  )
}

export default ForgotPassword