import React, { useEffect, useState } from 'react'
import '../css/EditProduct.css'
import Navbar from '../components/navbar'
import { useSelector } from 'react-redux'
import { useAuth } from '../components/Auth'
import { useNavigate, useParams } from 'react-router-dom'
import { FaUpload } from 'react-icons/fa'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import CustomSelect from '../components/CustomSelect'
import { toast } from 'react-toastify'


const EditProduct = () => {
  const navigate = useNavigate()
  const {user,getCartItems} =useAuth()
  const { id } = useParams();
  console.log(id)
  const productCartItem = useSelector((state) => state.product.cartItem);
  const foodproductData = useSelector((state) => state.product.productList)
  const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
  const allproducts = [...foodproductData, ...mallproductData];

  const productDisplay = allproducts.filter((elem) => elem._id === id)[0];
    console.log(productDisplay)

  const [productData, setProductData] = useState(true)
  const [cardProduct, setcardProduct] = useState({
    name: "",
      description: "",
      category: "",
      price: "",
      image:"",
      database:""
    })


  if (productData && allproducts) {
      setcardProduct({
          name: productDisplay.name,
          description: productDisplay.description,
          price: productDisplay.price,
          image: productDisplay.image,
          category: productDisplay.category,
      });
      setProductData(false);
  }

  const handleInput = (e) => {
      // console.log(e);
      let name = e.target.name;
      let value = e.target.value;

      setcardProduct({
          ...cardProduct,
          [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
      });
  };
  
  
  
  const uploadImage = async (e) => {
    const imgData = await ImagetoBase64(e.target.files[0])
    // console.log(imgData)

    setcardProduct((prev) => {
      return {
        ...prev,
        image: imgData
      }
    })
  }

  const handleSubmit = async (e) => {
    console.log(1)
    e.preventDefault()

    const { name, image, price ,category,description,database} = cardProduct

    if (name && image && category && price && description && database ) {
      const response = await fetch(`http://localhost:8001/edititem/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cardProduct)
      })

      const res = await response.json()
      console.log(res)
      toast.success(res.message)
      setTimeout(() =>{
        window.location.reload()
        navigate("/")
      },2000)
      // setcardProduct(() => {
      //   return {
      //     name: "",
      //     category: "",
      //     image: "",
      //     price: "",
      //     description: ""
      //   }
      // })
    }
    else {
      toast.error("Enter all required Fields")
    }
  }



  useEffect(()=>{
    getCartItems();
  },[user,productCartItem])

  return (
    <>
      <Navbar></Navbar>
      <div className="wrapper"  >
          <form className='' onSubmit={handleSubmit}>
        <div className="inner">
          <div className="image-holder">
        <label htmlFor='image' className='imgDiv2'>
          {
                        cardProduct.image ? <div className='imgDiv2'>
                          <img src={cardProduct.image} className='img10' />              
                      <FaUpload style={{position:"absolute",left:"48%",bottom:"45%" , fontSize:"25px",cursor:"pointer",opacity:"0.8" }} title='Upload image'></FaUpload>
                      <p className='para3 para'>Tap to insert the image </p>
                          </div>
                          :
                          <label htmlFor="image" className='imgDiv2'>
                          <div className='imgDiv2'>
                            <img src={cardProduct.image} alt="add-image" className='img10' />
                            <FaUpload style={{position:"absolute",left:"48%",bottom:"45%" , fontSize:"25px",cursor:"pointer",opacity:"0.8" }} title='Upload image'></FaUpload>
                            <p className='para3 para'>Tap to insert the image </p>
                          </div>
                          </label>
                      }
                      <input type="file" accept="image/*" id="image" onChange={uploadImage}  className="hidden" />
          </label>
          </div>
          <div className='formDetail'>
            <h3 style={{textDecoration:"underline" , textAlign:"left"}}>Edit Products</h3>

            <div className="form-wrapper1 form-wrapper" style={{marginTop:"-10px"}}>
            <label  className='label2'>Name</label>
              <input type="text" placeholder="Name" className="form-control1 form-control" onChange={handleInput} name='name' value={cardProduct.name}/>

            </div>
            <div className="form-wrapper1 form-wrapper" style={{marginTop:"-7px",marginBottom:"7px"}}>
            <label htmlFor='database' className='label2'>Item Type</label>
                  <select name="database" id="database" className='dropdown1' value={cardProduct.database} required onChange={handleInput}>
                    <option value="other">Select Item Type</option>
                    <option value="fooditem">FoodItem</option>
                    <option value="mallitem">MallItem</option>
                  </select>
            </div>
            <div className="form-wrapper1 form-wrapper" >
            <label htmlFor="category" className='label2'>Category</label>
            {cardProduct.database?cardProduct.database && cardProduct.database==='mallitem'?
                  <select className='dropdown1' id='category' name='category' required onChange={handleInput}
                    value={cardProduct.category}>
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
                  <select className='dropdown1' id='category' name='category' required onChange={handleInput}
                    value={cardProduct.category}>
                    <option value="other" >Select Category</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                    <option value="NightMunchies">Night Munchies</option>
                    <option value="Rice">Rice</option>
                  </select>:<select className='dropdown1' id='category' name='category' required onChange={handleInput}
                    value={cardProduct.category}>
                    {!cardProduct.database==null?<option value="other" >Select Database</option>:
                    <option value="other" >Choose Database First</option>}
                    </select>}

              {/* <CustomSelect
        value={selectedOption}
        onChange={handleInput}
        cardProduct={cardProduct}
      /> */}
            </div>

            <br />
            <label htmlFor="description" className='label2'>Description</label>

            <div className="form-wrapper1 form-wrapper">
              <textarea type="number" placeholder="Description" className="form-control1 form-control" style={{ height: "85px" }}  name='description' onChange={handleInput} value={cardProduct.description} />

            </div>
            <label htmlFor="" className='label2'>Price</label>

            <div className="form-wrapper1 form-wrapper">
              <input type="number" placeholder="Price" className="form-control1 form-control" name='price' onChange={handleInput} value={cardProduct.price}/>

            </div>
            <button className='button2' type='submit'>Register
            </button>
        </div>
        </div>
          </form>
      </div>
    </>
  )
}

export default EditProduct;