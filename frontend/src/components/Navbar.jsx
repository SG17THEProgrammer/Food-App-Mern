import { React, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../css/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from './Auth.jsx'
import { fetchCartItems } from '../redux/productSlide.js';
// import { useAuth0 } from "@auth0/auth0-react";
import { BsList } from "react-icons/bs";



const Navbar = () => {
    const [dropdownMenu, setdropdownMenu] = useState(false)
    const dropdownRef = useRef(null);

    const handleDocumentClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setdropdownMenu(false);
      }
    };
  
    useEffect(() => {
      if (dropdownMenu) {
        document.addEventListener('mousedown', handleDocumentClick);
      } else {
        document.removeEventListener('mousedown', handleDocumentClick);
      }
      return () => {
        document.removeEventListener('mousedown', handleDocumentClick);
      };
    }, [dropdownMenu]);


    //when using Auth0 authentication
    // const { loginWithRedirect,isAuthenticated,logout } = useAuth0();
    // const {user} = useAuth0();
    const productCartItem = useSelector((state) => state.product.cartItem);
    //console.log(productCartItem)

    const [toggleButton, setToggleButton] = useState(true);

    const { user, isLoggedIn, cartItems } = useAuth();

    const dispatch = useDispatch()

    const toggle = () => {
        setToggleButton(false)
    }

    //console.log(isLoggedIn);
    // //console.log(cartItems);

    // const cartItemNumber = useSelector((state) => state.product.cartItem)
    // //console.log(cartItemNumber)


    useEffect(() => {
        dispatch(fetchCartItems(user._id));
    }, [dispatch, user._id]);

    return (
        <>
            <nav className="navbar navbar-expand-lg  w-100" style={{ borderBottom: "1px solid #F3D7CA", backgroundColor: "#DDD0C8", zIndex: "99", position: "fixed", top: "0", height: "70px" }}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand ml-4 pb-2" to='/' ><h5 style={{ height: "15px" }}>Swad-E Hindustan</h5></NavLink>

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
                                <NavLink className="nav-link ml-2" to='/menu/6676c2ff1782239b95fa1fcf' >Menu <span className="sr-only"></span></NavLink>
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
                                <NavLink className="nav-link ml-2 blink" to='/mallmenu/6676c1731782239b95fa1fb6' style={{ marginRight: "-10px" }}>MallMenu <sup>New</sup><span className="sr-only"></span></NavLink>
                            </li>
                            {isLoggedIn?<li className="nav-item active">
                                <BsList style={{ fontSize: "30px", marginTop: "3px" , cursor:"pointer"}} className='list' onClick={() => setdropdownMenu(!dropdownMenu)} />
                                {dropdownMenu ? <div className='dropdown2' ref={dropdownRef}>
                                   {user.email=="shray@gmail.com"?<NavLink className='navlink' to='/allproducts'><p className='para4' >All Products </p></NavLink>:""}
                                    <NavLink className='navlink' to='/orders'><p className='para4' >Your Orders </p></NavLink>
                                    {user.email=="shray@gmail.com"?<NavLink className='navlink' to='/handleOrders'><p className='para4' >Handle Orders </p></NavLink>:""}
                                    <NavLink className='navlink' to='/address'> <p className='para4'>Address Book</p></NavLink>
                                    <NavLink className='navlink' to='/reservation'> <p className='para4'>Reserve a Table </p> </NavLink>
                                    <NavLink className='navlink blink' to='/recommend'> <p className='para4'>Food Recommendation <sup>Premium</sup> </p> </NavLink>
                                </div> : ""}
                            </li>:""}
                            <li className="nav-item active">
                                <NavLink className="nav-link ml-2 cart" to='/cart'>                                 <div className='cart'><i className="fa-solid fa-cart-shopping fa-sm  icon" style={{ position: "relative" }} ></i><span className='superscript count'>{cartItems ? cartItems?.length : 0}</span></div>
                                    {/* <span className="sr-only">Cart</span> */}
                                </NavLink>
                            </li>
                            {isLoggedIn
                                ?
                                <>
                                    <NavLink to='/about'><img src={user?.image} alt="error" className='image' /></NavLink>
                                </> : ""}



                            {/* new way to login/logout using AuthO */}
                            {/* {isAuthenticated ? <>
                                <li className="nav-item active">
                                    <button className='btn nav-link  mr-4 ml-1 mt-2'  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                    >Logout</button> <span className="sr-only"></span>
                                </li>
                                <li>{user.name}</li>
                            </> :
                            <li className="nav-item active">
                                    <button className='btn nav-link  mr-4 ml-1 mt-2'  onClick={() => loginWithRedirect()}
                                    >Login</button> <span className="sr-only"></span>
                                </li>
                            } */}




                            {/* standard way to login/logout */}
                            {isLoggedIn ? <>
                                <li className="nav-item active">
                                    <NavLink className="nav-link  mr-4 ml-2" to="/logout"><button className='btn'
                                    >Logout</button> <span className="sr-only"></span></NavLink>
                                </li>
                            </> : <><li className="nav-item active">
                                <NavLink className="nav-link " to='/login' ><button className='btn' >Login</button> <span className="sr-only"></span></NavLink>
                            </li>
                                <li className="nav-item active">
                                    <NavLink className="nav-link mr-4"  to='/register' ><button className='btn' >SignUp</button> <span className="sr-only"></span></NavLink>
                                </li>
                            </>

                            }





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