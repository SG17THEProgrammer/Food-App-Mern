import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../css/ForgotPassword.css'
import { FaLock } from "react-icons/fa";
import { MdForwardToInbox } from "react-icons/md";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


const ResetPassword = () => {
    const { token } = useParams();
    const [password,setPassword] = useState({
        password: "",
    })

    
    const handleInput =(e)=>{
        const {name,value} = e.target
        setPassword({
            ...password,
            [name]: value
        })
    }


    const handleSubmit= async()=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/resetpassword/${token}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(password)
            })
            console.log(response)

            const data = await response.json()
            console.log(data)

            if(response.status==400){
                toast.error(data.msg)
            }

            else{
                toast.success(data.msg)
                setPassword('')
            }

        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <>
        <Navbar></Navbar>
    <div className='forgotPass'>   
    <div className="card card5">
        <p className="lock-icon"><FaLock style={{marginLeft:"-20px"}}></FaLock></p>
        <h2 className='h2'><b>Change Password</b></h2>
        <h3 className='h2'>The only constant is change</h3>
        <p className='p1'>Enter the Password</p>
        <span className="passInput" >
        <input type="text" style={{background: "transparent",paddingLeft:"50px"
}} placeholder="Password" name='password' value={password.password} onChange={handleInput}/>
        <MdForwardToInbox className='icn1'></MdForwardToInbox>
        </span>
        <button className='button4' onClick={handleSubmit}>Change Password</button>
    </div>
    </div>
    </>
  )
}

export default ResetPassword