import React, { useState } from 'react'
import Navbar from '../components/navbar'
import { toast } from 'react-toastify'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import '../css/Admin.css'

const Admin = () => {

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
    // console.log(imgData)

    setFoodData((prev) => {
      return {
        ...prev,
        image: imgData
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(foodData)

    const { name, image, category, price ,description , database} = foodData

    if (name && image && category && price && description && database) {
      const response = await fetch(`http://localhost:8001/addnewitem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(foodData)
      })

      const res = await response.json()
      console.log(res)
      toast.success(res.message)

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
      <div style={{ display: "flex", justifyContent: "center",marginTop:"100px" }}>
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
                  <label htmlFor='category'>Category</label>
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
                  </select>
                </li>
                <li className='listitem' style={{marginTop:"-5px"}}>
                <label htmlFor='database'>Database</label>
                  <select name="database" id="database" className='dropdown' value={foodData.database} required onChange={handleOnChange}>
                    <option value="other">Select Database</option>
                    <option value="fooditem">FoodItem</option>
                    <option value="mallitem">MallItem</option>
                  </select>
                </li>
                <li className='listitem' style={{marginTop:"-5px"}}>
                  <label htmlFor='image'>Image
                    <div className='outerimgdiv'>
                      {
                        foodData.image ? <div className='imgDiv1'>
                          <img src={foodData.image} className='fitimage' />              </div>
                          :
                          <div className='imgDiv1'>
                            <img width="80" height="80" src="https://plus.unsplash.com/premium_photo-1677093905912-a653c6301260?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="add-image" className='image2' />
                            <p className='para'>Tap to insert the image </p>
                          </div>
                      }
                      <input type="file" accept="image/*" id="image" onChange={uploadImage} required className="hidden" />
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
                  <button className='dropdown btn' style={{ marginTop: "0px", textAlign: "center" }}>Save</button>            </li>
              </div>
            </ul>
          </form>
        </div>
      </div>
    </>
  )
}

export default Admin