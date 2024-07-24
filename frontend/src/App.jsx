import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Admin from './pages/Admin'
import Menu from './pages/Menus/Menu'
import { setDataProduct } from './redux/productSlide'
import { setmallDataProduct } from './redux/mallproductSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Success from './pages/Success'
import Failed from './pages/Failed'
import Error from './pages/Error'
import Logout from './pages/Auth/Logout'
import AboutUs from './pages/AboutUs'
import FoodMall from './pages/FoodMall'
import MallMenu from './pages/Menus/MallMenu'
import EditProduct from './pages/EditProduct'
// import Orders from './pages/Orders'
import GoToTopButton from './components/GoToTopButton'
import EditUser from './pages/EditUser'
import Delivery from './pages/Delivery/Delivery'
import Distance from './components/Distance'
import VerifyOrder from './pages/Orders/VerifyOrder'
import Orders from './pages/Orders/Orders'
import Navbar from './components/Navbar'
import HandleOrders from './pages/Orders/HandleOrders'
import Reservation from './pages/Reservation'
import ShowOrders from './pages/Orders/ShowOrders'
import Address from './pages/Delivery/Address'
import Location from './pages/Delivery/Location'
import Recommend from './components/Recommend'
import ChatBot from './components/ChatBot'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import AllProducts from './pages/AllProducts'

const App = () => {

  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)

  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getproduct/`)
      const resData = await res.json()
      // //console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  },[])

  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getMallproduct/`)
      const resData = await res.json()
      // //console.log(resData)
      dispatch(setmallDataProduct(resData))
    })()
  },[])
  
  return (
    <>
    <ChatBot></ChatBot>
    <GoToTopButton></GoToTopButton>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/aboutUs' element={<AboutUs></AboutUs>}></Route>
            <Route path='/admin' element={<Admin></Admin>}> </Route>
            <Route path='menu/:id' element={<Menu></Menu>}></Route>
            <Route path='mallmenu/:id' element={<MallMenu></MallMenu>}></Route>
            {/* <Route path='mallmenu' element={<MallMenu></MallMenu>}></Route> */}
            <Route path='/contact' element={<Contact></Contact>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/delivery' element={<Delivery></Delivery>}></Route>
            <Route path='/foodmall' element={<FoodMall></FoodMall>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/logout' element={<Logout></Logout>}></Route>
            <Route path='/edit/:id' element={<EditProduct></EditProduct>}></Route>
            <Route path='/editUser/:id' element={<EditUser></EditUser>}></Route>
            <Route path='/success/:id' element={<Success></Success>}></Route>
            <Route path='/failed' element={<Failed></Failed>}></Route>
            <Route path='/distance' element={<Distance></Distance>}></Route>
            <Route path='/verify' element={<VerifyOrder></VerifyOrder>}></Route>
            <Route path='/orders' element={<Orders navbar={<Navbar></Navbar>}></Orders>}></Route>
            <Route path='/handleOrders' element={<HandleOrders></HandleOrders>}></Route>
            <Route path='/reservation' element={<Reservation></Reservation>}></Route>
            <Route path='/address' element={<Address></Address>}></Route>
            <Route path='/recommend' element={<Recommend></Recommend>}></Route>
            <Route path='/location' element={<Location></Location>}></Route>
            <Route path='/forgotpassword' element={<ForgotPassword></ForgotPassword>}></Route>
            <Route path='/allproducts' element={<AllProducts></AllProducts>}></Route>
            <Route path='/showOrder/:id' element={<ShowOrders></ShowOrders>}></Route>
            <Route path='/resetpassword/:token' element={<ResetPassword></ResetPassword>}></Route>
            <Route path='*' element={<Error></Error>}></Route>
          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
