import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Menu from './pages/Menu'
import { setDataProduct } from './redux/productSlide'
import { setmallDataProduct } from './redux/mallproductSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Success from './pages/Success'
import Failed from './pages/Failed'
import Logout from './pages/Logout'
import AboutUs from './pages/AboutUs'
import FoodMall from './pages/FoodMall'
import MallMenu from './pages/MallMenu'

const App = () => {

  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)

  useEffect(()=>{
    (async()=>{
      const res = await fetch(`http://localhost:8001/getproduct/`)
      const resData = await res.json()
      // console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  },[])

  useEffect(()=>{
    (async()=>{
      const res = await fetch(`http://localhost:8001/getMallproduct/`)
      const resData = await res.json()
      // console.log(resData)
      dispatch(setmallDataProduct(resData))
    })()
  },[])
  
  return (
    <>
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
            <Route path='/foodmall' element={<FoodMall></FoodMall>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/logout' element={<Logout></Logout>}></Route>
            <Route path='/success' element={<Success></Success>}></Route>
            <Route path='/failed' element={<Failed></Failed>}></Route>
          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
