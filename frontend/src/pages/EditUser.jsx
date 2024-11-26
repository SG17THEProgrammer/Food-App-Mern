import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/Auth'
import { useNavigate, useParams } from 'react-router-dom';
import '../css/EditUser.css'
import Navbar from '../components/navbar';
import { toast } from 'react-toastify';
const EditUser = () => {
    
        const {allUsers} = useAuth()
        const { id } = useParams();
        const navigate = useNavigate();
    const particularUser = allUsers.filter((elem) => elem._id === id)[0];
    const [userData, setUserData] = useState(true)
    const [user , setUser] = useState({
        name : "",
        email:"",
        phone:"",
    })

    if (userData && particularUser) {
        setUser({
            name: particularUser.name,
            email: particularUser.email,
            phone: particularUser.phone,
        });
        setUserData(false);
    }

    const handleInput = (e) => {
        // //console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
        });
    };


    const updateUser = async (id) => {
        // //console.log(params.id)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/about/update/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)

            });
            //console.log(response)
            const data = await response.json();
            //console.log(data)

            if (response.ok) {
                toast.success(data.message[0])
                setTimeout(() =>{
                    navigate('/about')
                    //window.location.reload()
                },3000)

            }
            else {
                toast.error(data.message[0])
            }
        }

        catch (error) {
            toast.error("Something went wrong")
        }
    }

    useEffect(()=>{

    },[allUsers])
  return (
      <>
    <Navbar></Navbar>
<div class='box'>
  <div class='box-form'>
    <div class='box-login-tab'></div>
    <div class='box-login-title'>
      <h2 className='h2'>Edit User</h2>
    </div>
    <div class='box-login'>
      <div class='fieldset-body' id='login_form'>
               	<p class='field'>
          <label className='label3' for='user'>E-MAIL</label>
          <input type='text' className='input1'  name='email'  onChange={handleInput}  value={user.email} title='Username' style={{marginBottom:"20px"}} />
          <label className='label3' for='user' >Name</label>
          <input type='text' className='input1'  name='name' onChange={handleInput} value={user.name}  title='Username' style={{marginBottom:"20px"}}/>
          <label className='label3' for='user'>Phone</label>
          <input type='number' className='input1'  name='phone' onChange={handleInput} value={user.phone}  title='Username' style={{marginBottom:"20px"}}/>
        </p>
      	 
        	<input type='submit' id='do_login' value='Update' title='Update' onClick={()=>updateUser(particularUser._id)} />
      </div>
    </div>
  </div>
  <div class='box-info'>
					    
  				</div>
</div>

    </>
  )
}

export default EditUser