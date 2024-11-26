import React, { useEffect, useState } from 'react'
import '../../css/Auth/Login.css'
import Navbar from '../../components/Navbar'
// import img from '../images/all.avif'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux'
// import { loginRedux } from '../redux/userSlice'
import { useAuth } from '../../components/Auth';
import Authorize from '../../components/Authorize';
import Loader from '../../components/Loader';


const Login = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { storeTokensInLS , isLoggedIn} = useAuth()


  const [loginUser, setloginUser] = useState({
    email: "",
    password: "",
  })

  // const userData = useSelector(state => state)
  // //console.log(userData)

  // const dispatch = useDispatch()





  const [showPassword, setshowPassword] = useState(false)
  const handleshowPassword = () => {
    setshowPassword(prev => !prev)
  }

  const handleInput = (e) => {
    // //console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setloginUser({
      ...loginUser,
      [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      const resData = await response.json();

      if (response.ok) {
        // Storing tokens in LS through context API 
        storeTokensInLS(resData.token);

        // Storing tokens in LS in simple way
        // localStorage.setItem('token', resData.token);

        toast.success(resData.message[0]);
        setloginUser({ email: "", password: "" });

        
        setTimeout(() => {
          //window.location.reload();
          navigate('/home');
        }, 3000); 
      } else {
        toast.error(resData.message[0]);
      }
    } catch (error) {
      toast.error('Error fetching API');
    }
    finally {
      setIsLoading(false);

    }
  };

  return (
    <>
      {!isLoggedIn? <><Navbar></Navbar>
      <div className="container">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img src="images/all.avif" alt="error" />
            {/* <div className="text">
              <span className="text-1">Every new friend is a <br /> new adventure</span>
              <span className="text-2">Let's get connected</span>
            </div> */}
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form onSubmit={handleSubmit}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input type="text" placeholder="Enter your email" onChange={handleInput} value={loginUser.email} name='email' required />
                  </div>
                  <div className="input-box">
                    {showPassword ? <>
                      <i className="fa-solid fa-eye" style={{ marginRight: "25px" }} title='Show Password' onClick={handleshowPassword}></i>
                    </> : <>
                      <i className="fa-solid fa-eye-slash" style={{ marginRight: "25px" }} title='Show Password' onClick={handleshowPassword}></i>

                    </>}

                    <i className="fas fa-lock"></i>
                    <input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleInput} value={loginUser.password} name='password' required />


                  </div>
                  <div className="text" ><NavLink to='/forgotpassword' style={{ color: "#B19470" }}>
                    Forgot password?
                  </NavLink></div>
                  <div className="button input-box">
                    <input type="submit" value="Login" />
                  </div>
                  <div className="text sign-up-text">Don't have an account? <label htmlFor="flip"><NavLink to="/register" style={{ color: "#B19470" }} >Sigup now</NavLink></label></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div></>:<Authorize isLoggedIn={isLoggedIn}></Authorize>
 }     {isLoading ? <Loader></Loader> : ""}
    </>
  )
}

export default Login