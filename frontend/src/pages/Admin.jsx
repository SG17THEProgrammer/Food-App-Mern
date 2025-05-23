import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { toast } from 'react-toastify'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import '../css/Admin.css'
import { FaUpload } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setDataProduct } from '../redux/productSlide'

const Admin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  const [foodData, setFoodData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    database: "",
    rating:"",
    description: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setFoodData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }

  const uploadImage = async (e) => {
    const imgData = await ImagetoBase64(e.target.files[0])
    // //console.log(imgData)

    setFoodData((prev) => {
      return {
        ...prev,
        image: imgData
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //console.log(foodData)

    const { name, image, category, price ,description , database} = foodData

    if (name && image && category && price && description && database) {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/addnewitem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(foodData)
      })

      const res = await response.json()

      console.log(res)
      toast.success(res.message)

      dispatch(setDataProduct(res.allItems))
      setTimeout(() =>{
        // window.location.reload()
        navigate('/allproducts')
      },2000)


      setFoodData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          database: "",
          rating:"",
          description: ""
        }
      })
    }
    else {
      toast.error("Enter all required Fields")
    }
  }


  return (
    <>
      <Navbar></Navbar>
      <h2 style={{ margin:"90px 0 20px 40px" , textAlign:"center" ,textDecoration:"underline" ,fontFamily:"cursive"}}>Add Product</h2>
      <div style={{ display: "flex", justifyContent: "center",marginTop:"0px" }}>
        <div className="topDiv">
          <div className='leftDiv'>
            <img src="images/bg-heading-02.jpg" alt="error" className='image3' />
          </div>
          <form onSubmit={handleSubmit}>
            <ul className='ul' >
              <div className='lstitmdiv'>
                <li className='listitem' style={{marginTop:"-5px"}}><label htmlFor='name'>Name</label>
                  <input type="text" name="name" className='dropdown' onChange={handleOnChange} required value={foodData.name} /></li>
                <li className='listitem' style={{marginTop:"-5px"}}>
                <label htmlFor='database'>Item Type</label>
                  <select name="database" id="database" className='dropdown' value={foodData.database} required onChange={handleOnChange}>
                    <option value="other">Select Item Type</option>
                    <option value="fooditem">FoodItem</option>
                    <option value="mallitem">MallItem</option>
                  </select>
                </li>

                <li className='listitem' style={{marginTop:"-5px"}}>
                  <label htmlFor='category'>Category</label>

{foodData.database?foodData.database && foodData.database==='mallitem'?
                  <select className='dropdown' id='category' name='category' required onChange={handleOnChange}
                    value={foodData.category}>
                    <option value="other" >Select Category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Icecream">Icecream</option>
                    <option value="Dosa">Dosa</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Rice">Rice</option>
                    <option value="Cake">Cake</option>
                    <option value="Burger">Burger</option>
                    <option value="Paneer">Paneer</option>
                    <option value="Sandwich">Sandwich</option>
                  </select>:
                  <select className='dropdown' id='category' name='category' required onChange={handleOnChange}
                    value={foodData.category}>
                    <option value="other" >Select Category</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                    <option value="NightMunchies">Night Munchies</option>
                    <option value="Rice">Rice</option>
                  </select>:<select className='dropdown' id='category' name='category' required onChange={handleOnChange}
                    value={foodData.category}>
                    {!foodData.database==null?<option value="other" >Select Category</option>:
                    <option value="other" >Choose Item Type First</option>}
                    </select>}



                </li>
                <li className='listitem' style={{marginTop:"-5px"}}>
                  <label htmlFor='image'>Image
                    <div className='outerimgdiv'>
                      {
                        foodData.image ? <div className='imgDiv1'>
                          <img src={foodData.image} className='fitimage' />              
                      <FaUpload style={{position:"absolute",left:"45%",bottom:"35%" , fontSize:"25px",cursor:"pointer",opacity:"0.4" }} title='Upload image'></FaUpload>
                          </div>
                          :
                          <div className='imgDiv1'>
                            <img width="80" height="80" src="https://plus.unsplash.com/premium_photo-1677093905912-a653c6301260?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="add-image" className='image2' />
                            <p className='para'>Tap to insert the image </p>
                          </div>
                      }
                      <input type="file" accept="image/*" id="image" onChange={uploadImage}  className="hidden" />
                    </div>
                  </label>
                </li>

                <li className='listitem' style={{ marginTop: "21px" }}>

                  <label htmlFor='price' className='my-2'>Price</label>
                  <input type="number" className='dropdown' name='price' onChange={handleOnChange} required value={foodData.price} />            </li>

                <li className='listitem' style={{marginTop:"-15px"}}>

                  <label htmlFor='rating' className='my-2'>Rating</label>
                  <input type="number" className='dropdown' name='rating' onChange={handleOnChange} required value={foodData.rating} max="5" min="0" step="0.1"/>            </li>
                <li className='listitem' style={{marginTop:"-5px"}}>
                  <label htmlFor='description'>Description</label>
                  <textarea value={foodData.description} style={{ height: "85px" }} name='description' required onChange={handleOnChange} className='dropdown'></textarea>            </li>
                <li className='listitem'>
                  <button className='dropdown btn' style={{ marginTop: "0px", marginBottom:"20px", textAlign: "center" }}>Save</button>            </li>
              </div>
            </ul>
          </form>
        </div>
      </div>
    </>
  )
}

export default Admin