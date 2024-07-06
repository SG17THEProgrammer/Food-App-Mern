import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import '../../css/Auth/Login.css'
import '../../css/Auth/Register.css'
// import img from '../images/bg-registration-form-3.jpg'
import { NavLink, useNavigate } from 'react-router-dom'
// import img2 from '../images/profile-user.jpg'
import {ImagetoBase64} from '../../utility/ImagetoBase64'
import { toast } from 'react-toastify'
import { useAuth } from '../../components/Auth'
import Authorize from '../../components/Authorize'

const Register = () => {

  const navigate = useNavigate()
  const {storeTokensInLS,isLoggedIn} = useAuth() 


  const [registerUser , setregisterUser] =useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    image:"",

  })

  const [showPassword,setshowPassword] = useState(false)
  const handleshowPassword=()=>{
    setshowPassword(prev =>!prev)
  }

  const handleInput=(e) => {
    let name = e.target.name;
    let value = e.target.value;

    setregisterUser({
      ...registerUser,
      [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
    });
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    //console.log(registerUser);

    try {
      const response = await fetch(`http://localhost:8001/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerUser),
      });
      //console.log("response data : ", response);
      
      const resData = await response.json();
      //console.log(resData);

      if (response.ok) {
        
        //storing tokens in LS through context api 
        storeTokensInLS(resData.token)
        
        
        //storing tokens in LS in simple way
        // localStorage.setItem('token',resData.token);
        
        // setregisterUser({ name:"", email: "", phone: "", password: "",image:""});
        navigate('/home')
        toast.success(resData.message[0]); 
         setTimeout(()=>{
           window.location.reload();
         },2000)
        //console.log(resData);
      } else {
        // toast.error(resData.extraDetails?resData.extraDetails:resData.message)
        toast.error(resData.message[0]);  

        //console.log("error inside response ", "error");
      }
    } catch (error) {
      //console.error("Error", error);
    }

    // try {
    //     const api = "http://localhost:7000/signup"
    //     const response = await axios.get(api)
    //     //console.log(response);
    // } catch (error) {
    //     //console.log(error);
    // }
  };


  const handleUploadProfileImage = async(e)=>{
    // //console.log(e.target.files[0])
    const registerUser = await ImagetoBase64(e.target.files[0])


    setregisterUser((prev)=>{
        return{
          ...prev,
          image : registerUser
        }
    })

}


  return (
<>
{!isLoggedIn?<><Navbar></Navbar>
<div className="container" style={{marginTop:"110px" ,height:"490px"}}>
        <div className="cover">
          <div className="front">
            <img src="images/bg-registration-form-3.jpg" alt="error" />
            <div className="text">
              <span className="text-1">Every new friend is a <br /> new adventure</span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            {/* <div className="login-form">
              <div className="title">Login</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input type="text" placeholder="Enter your email" required />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Enter your password" required />
                  </div>
                  <div className="text" ><a   style={{color:"#B19470"}} href="#">Forgot password?</a></div>
                  <div className="button input-box">
                    <input type="submit" value="Sumbit" />
                  </div>
                  <div className="text sign-up-text">Don't have an account? <label for="flip"><NavLink to="/register"    style={{color:"#B19470"}} >Sigup now</NavLink></label></div>
                </div>
              </form>
            </div> */}
            <div className="signup-form">
              <div className="title" style={{marginBottom:"-11px"}}>Signup</div>
              <div className='pic' > 
              <img src={registerUser.image ?registerUser.image :"images/profile-user.jpg"} alt="error" style={{height:"60px" ,width:"60px",borderRadius:"50%"}} />
              <div>

              <label htmlFor='file' className='label' style={{color:"white"}}>Upload</label>
              <input type='file' id='file' className='inp' name='file' accept='image/*' onChange={handleUploadProfileImage} ></input>

              </div>
              </div>
              <form  onSubmit={handleSubmit}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-user" style={{marginRight:"17px"}}></i>
                    <input type="text" placeholder="Enter your name" required onChange={handleInput} value={registerUser.name}  name='name'/>
                  </div>
                  <div className="input-box">
                    <i className="fas fa-envelope" style={{marginRight:"17px"}}></i>
                    <input type="text" placeholder="Enter your email" required onChange={handleInput} value={registerUser.email} name='email'/>
                  </div>
                  <div className="input-box">

                  {showPassword?<i className="fa-solid fa-eye" style={{marginRight:"41px"}} title='Show Password' onClick={handleshowPassword}></i>:
                  <i className="fa-solid fa-eye-slash"  style={{marginRight:"40px"}} title='Show Password' onClick={handleshowPassword}></i>}
                    
                    <i className="fas fa-lock" style={{marginRight:"17px"}}></i>
                    <input type={showPassword?"text":"password"} placeholder="Enter your password" required onChange={handleInput} value={registerUser.password} name='password'/>
                  </div>
                  <div className="input-box">
                    <i className="fas fa-phone" style={{marginRight:"17px"}}></i>
                    <input type="number" placeholder="Enter your Phone number" required onChange={handleInput} value={registerUser.phone} name='phone'/>
                  </div>
              
                  <div className="button input-box">
                    <input type="submit" value="Register" />
                  </div>
                  <div className="text sign-up-text">Already have an account? <label htmlFor="flip"><NavLink to="/login" style={{color:"#B19470"}}>Login now</NavLink></label></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div></>:<Authorize></Authorize>}
    </>
		  )
}

export default Register