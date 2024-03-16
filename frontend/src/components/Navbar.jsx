import { React, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
// import { useAuth } from './Auth.js'
import { toast } from 'react-toastify';
import '../css/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
// import { logoutRedux } from '../redux/userSlice.js'
import { useAuth } from './Auth.jsx'
import { useAuth0 } from "@auth0/auth0-react";



const Navbar = () => {

    //when using Auth0 authentication
    const { loginWithRedirect,isAuthenticated,logout } = useAuth0();
    // const {user} = useAuth0();


    const [toggleButton, setToggleButton] = useState(true);

    // const { LogoutUser } = useAuth();
    const { user } = useAuth();

    useEffect(() => {
        useAuth
    }, [user.image])

    const toggle = () => {
        setToggleButton(false)
    }

    // const userData = useSelector((state)=>state.user)

    // console.log(userData.user)

    // console.log(userData.image.toString())
    // const dispatch = useDispatch()
    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn);

    // const showToast=()=>{
    // toast.success("Logged out successfully")
    // }

    // const handleLogout=()=>{
    //     toast("Logout successfully");

    // }

    const cartItemNumber = useSelector((state) => state.product.cartItem)
    // console.log(cartItemNumber.length)

    return (
        <>
            <nav className="navbar navbar-expand-lg  w-100" style={{ borderBottom: "1px solid #F3D7CA", backgroundColor: "#DDD0C8", zIndex: "99", position: "fixed", top: "0", height: "70px" }}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand ml-4 pb-2" to='/' href="/"><h5 style={{ height: "15px" }}>RadheRadhe</h5></NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation" onClick={toggle}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${toggleButton ? "show" : ""} `} id="navbarSupportedContent" style={{ backgroundColor: "#DDD0C8", opacity: "0.9" }}>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link ml-2" to='/' >Home <span className="sr-only"></span></NavLink>
                            </li>
                            {user.email === "shray@gmail.com" ? <li className="nav-item active">
                                <NavLink className="nav-link ml-2" to='/admin' >Admin <span className="sr-only"></span></NavLink>
                            </li> : ""}

                            <li className="nav-item active">
                                <NavLink className="nav-link ml-2" to='/menu/65f0051c41232f736a963d8d' >Menu <span className="sr-only"></span></NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link ml-2" to='/aboutUs' >AboutUs <span className="sr-only"></span></NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link ml-2" to='/contact' style={{ marginRight: "-10px" }}>Contact <span className="sr-only"></span></NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link ml-2 blink" to='/foodmall' style={{ marginRight: "-10px" }}>FoodMall <sup>New</sup><span className="sr-only"></span></NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link ml-2 blink" to='/mallmenu/65eff59f41232f736a963d5c' style={{ marginRight: "-10px" }}>MallMenu <sup>New</sup><span className="sr-only"></span></NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link ml-2 cart" to='/cart'>                                 <div className='cart'><i className="fa-solid fa-cart-shopping fa-sm  icon" style={{ position: "relative" }} ></i><span className='superscript count'>{cartItemNumber.length}</span></div>
                                    {/* <span className="sr-only">Cart</span> */}
                                </NavLink>
                            </li>
                            {user.image && isLoggedIn
                                ?
                                <>
                                    <NavLink to='/about'><img src={user.image} alt="error" className='image' /></NavLink>
                                </> : ""}



                                {/* new way to login/logout using AuthO */}
                            {isAuthenticated ? <>
                                <li className="nav-item active">
                                    <button className='btn nav-link  mr-4 ml-1 mt-2'  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                    >Logout</button> <span className="sr-only"></span>
                                </li>
                                {/* <li>{user.name}</li> */}
                            </> :
                            <li className="nav-item active">
                                    <button className='btn nav-link  mr-4 ml-1 mt-2'  onClick={() => loginWithRedirect()}
                                    >Login</button> <span className="sr-only"></span>
                                </li>
                            }




                            {/* standard way to login/logout */}
                            {/* {isLoggedIn? <>
                                <li className="nav-item active">
                                    <NavLink className="nav-link  mr-4 ml-2" to="/logout"><button className='btn' 
                                    >Logout</button> <span className="sr-only"></span></NavLink>
                                </li>
                            </> :
                                <li className="nav-item active">
                                    <NavLink className="nav-link  mr-4 ml-2" to='/login' ><button className='btn' >Login</button> <span className="sr-only"></span></NavLink>
                                </li>
                            } */}





                            {/* <li className="nav-item active">
                                <NavLink className="nav-link ml-1 mr-3" to='/profile' >                                    <i class="fa-solid fa-circle-user fa-sm" style={{position:"relative" ,fontSize:"20px",paddingTop:"13px"}}></i>
                                    <span className="sr-only"></span></NavLink>
                            </li> */}

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )

}

export default Navbar