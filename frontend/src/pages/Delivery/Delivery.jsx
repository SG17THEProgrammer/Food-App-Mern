import React, { useEffect, useState } from 'react'
import '../../css/Delivery/Delivery.css'
import Navbar from '../../components/navbar'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../components/Auth'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import FormatPrice from '../../Helpers/FormatPrice'
import { loadStripe } from '@stripe/stripe-js'
import Address from './Address'
import State from '../../components/Location/State'
const Delivery = ({title}) => {
  

  const [delAddress , setDelAddress] = useState();
  const [delMan, setdelMan] = useState();

//console.log(delAddress)

 const uniqueDelAddress = Array.from(new Set(delAddress? delAddress.map(item => item.address):""))
  .map(address => {
    return delAddress.find(item => item.address === address);
  });

  //console.log(uniqueDelAddress)

  const {user,cartItems,getCartItems} = useAuth();
  const productCartItem = useSelector((state) => state.product.cartItem);

  const totalPrice = productCartItem.reduce((sum,curr)=>parseFloat(sum) + parseFloat(curr.total),0)

  const tax= Math.ceil(totalPrice*0.12,2);
  const finalPrice =Math.ceil(totalPrice+tax,2)
  // //console.log(cartItems)

  let shippingCharges ;
if(finalPrice==0){
  shippingCharges=0
}
else if(finalPrice<500){
  shippingCharges=300;
}
else if (finalPrice<1000){
  shippingCharges=200;

}
else if (finalPrice<2000){
  shippingCharges=100;

}
else{
  shippingCharges=0;

}

// //console.log(shippingCharges)

const totalAmount = finalPrice+shippingCharges;

  const [delDetails,setDelDetails ] = useState({
    name:"",
    address:"",
    city:"",
    pincode:"",
    email:"",
    phone:"",
    state:"",
  })

  const [delData, setdelData] = useState(true)
  if (delData && user) {
		setDelDetails({
			name: user.name,
			email: user.email,
      phone:user.phone,
      address:"",
      city:"",
      pincode:"",
      state:"",
		});
		setdelData(false);
	}

  const handleInput=(e)=>{
    let {name,value} = e.target

    setDelDetails({
      ...delDetails,
      [name]:value
    })
  }
  const handleSelectInput = (e) => {
    const { value } = e.target;
    setDelDetails((prevDetails) => ({
      ...prevDetails,
      address: value,
    }));
  };

  const handleCityInput = (e) => {
    const { value } = e.target;
    setDelDetails((prevDetails) => ({
      ...prevDetails,
      city: value,
    }));
  };
  const handleStateInput = (e) => {
    const { value } = e.target;
    setDelDetails((prevDetails) => ({
      ...prevDetails,
      state: value,
    }));
  };

  
  const fetchDelMan = async () => {
    try {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/deliveryMan`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            const data = await response.json()
            setdelMan(data.data)
        }
        else {
            console.log("Error: " + response)
        }
    } catch (error) {
        console.log("Error while getting orders" + error)

    }

}


     const randomIndex = delMan?.length ? Math.floor(Math.random() * delMan?.length) : 0;  


  const handlePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    const customerInfo = {
      name: user.name,
      address: {
          line1:delDetails.address ,
          city: delDetails.city,
          state: delDetails.state,
         postal_code: delDetails.pincode,
          country: 'IN'
      }
  };


    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({products:cartItems,customerInfo:customerInfo , deliveryCharge:shippingCharges , tax:tax,userId:user._id , amount:totalAmount , delManDetails:delMan[randomIndex]
            })
          });
          
        if (!response.ok) {
          toast.error("Failed to create checkout session")
          throw new Error('Failed to create checkout session');

        }

        const data = await response.json();
        //console.log('Session data:', data);
        toast.success("Redirecting to checkout")
        setTimeout(async()=>{

          const result = await stripe.redirectToCheckout({ sessionId: data.id });
          //console.log('Stripe redirect result:', result);
        },1000 )

        if (result.error) {
            //console.error('Stripe redirect error:', result.error);
        }
    } catch (error) {
        //console.error('Error during payment handling:', error);
    }
};

    const handleSubmit=async(e)=>{
      e.preventDefault()
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/delivery`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId:user._id,delDetails})
        });
        const resData = await response.json();
			//console.log("response data : ", response);
			//console.log(resData);
      if(response.ok){
        setDelDetails({
          name: user.name,
          email: user.email,
          phone:user.phone,
          address:"",
          city:"",
          pincode:"",
          state:""
        });

        {title=="address"? "":handlePayment()}
        {title=="address"?toast.success(resData.message[0]):""}
      }
      else{
        toast.error(resData.message[0])
      }
      } catch (error) {
        toast.error("Couldn't place order ");
      }
    }

    const getDeliveryAddress = async() => {
      try {
          const address = await fetch(`${import.meta.env.VITE_BACKEND_API}/getDeliveryAddress`,{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({userId:user._id})
          })
          // //console.log(address)

          const response = await address.json()
          // //console.log(response)

          setDelAddress(response.data)
          if(response.ok){
              //console.log("Got delivery address successfully")
          }
          
      } catch (error) {
          //console.log("Error in fetching api" +error)


      }
  }   


    useEffect(()=>{
      getCartItems();
    },[user,productCartItem])

    useEffect(()=>{
      getDeliveryAddress()
      fetchDelMan()
  },[user._id])
    

  return (
    <div>
    <div style={{zIndex:"1000"}}><Navbar></Navbar></div>
  {title=="address"?"": <div className='add'> <NavLink to='/address' style={{textDecoration:"none",color:"black"}}><Address title={'del'}></Address></NavLink></div>}
          <div className="centered-container">
        <div className={title=="address"? "row ": "row container"} style={{backgroundColor:title=="address"?"#ddd0c8" :"brown" , width:"80vw" , height:"fit-content" , marginBottom:"100px" ,marginTop:title=="address"?"20px":"100px"}}>
            <div className={title=="address"?"col-md-8 mb-4 popup-background  popup-content":"col-md-8 mb-4"} style={{zIndex:""}}  >
                <div className="card mb-4 ">
                    {title=="address" ? "":<div className="card-header py-3 ">
                        <h5 className="mb-0">Billing details</h5>
                    </div>}
                    <div className="card-body" style={{backgroundColor:"wheat"}}>
                        <form >
                            <div className="row mb-4">
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label className="form-label" htmlFor="form7Example1">Name</label>
                                        <input type="text" id="form7Example1" className="form-control"  name='name' value={delDetails.name} onChange={handleInput} required/>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row mb-4">
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" htmlFor="form7Example4">Address</label>&nbsp;&nbsp;
                                <select name="" id="" onChange={handleSelectInput} value={delDetails.address}>
                                <option value="">Select address</option>
                                  {uniqueDelAddress?uniqueDelAddress.map((elem,idx)=>{
                                    return  <option value={elem.address} key={idx}>{elem.address}</option>
                                   }):""}
                                </select>
                                <input type="text" id="form7Example4" className="form-control"  name='address' value={delDetails.address} onChange={handleInput} required/>
                            </div>
                                <div className="col">
                                <div data-mdb-input-init className="form-outline">
                                        <span className='span'><label className="form-label" htmlFor="form7Example1">State</label>
                                        <State onChange={handleStateInput}  setDelDetails={setDelDetails} delDetails={delDetails} name={"state"} title={title}></State>
                                        </span>
                                        <input type="text" id="form7Example1" className="form-control"  name='state' value={delDetails.state} onChange={handleInput} required/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                    <span className='span'>
                                    <label className="form-label" htmlFor="form7Example1">City</label>
                                  
                                    </span>
                                        <input type="text" id="form7Example1" className="form-control"  name='city' value={delDetails.city} onChange={handleInput} required/>
                                    </div>
                                    
                                </div>
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label className="form-label" htmlFor="form7Example1">Pin Code</label>
                                        <input type="number" id="form7Example1" className="form-control"  name='pincode' value={delDetails.pincode} onChange={handleInput} required/>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" htmlFor="form7Example5">Email</label>
                                <input type="email" id="form7Example5" className="form-control" name='email' value={delDetails.email} onChange={handleInput} required />
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" htmlFor="form7Example6">Phone</label>
                                <input type="number" id="form7Example6" className="form-control"  name='phone' value={delDetails.phone} onChange={handleInput} required/>
                            </div>
                            {title=="address" ?<div>
                                <button className='button1 btn-primary btn-lg btn-block' onClick={handleSubmit}>Add</button>
                            </div>:""}
                            {/* <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" htmlFor="form7Example7">Additional information</label>
                                <textarea className="form-control" id="form7Example7" rows="4" name='message' value={delDetails.message} onChange={handleInput} required></textarea>
                            </div> */}
                          
                        </form>
                    </div>
                </div>
            </div>
            {title=="address" ?"":<div className="col-md-4 mb-4">
                <div className="card mb-4">
                    <div className="card-header py-3">
                        <h5 className="mb-0">Summary</h5>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                Products
                                <span>{<FormatPrice price={finalPrice}></FormatPrice>}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                Shipping <br />Charges
                                <span>{<FormatPrice price={shippingCharges}></FormatPrice>}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                <div>
                                    <strong>Total amount</strong>
                                    <br />
                              
                                    <strong>
                                        <p className="mb-0">(including all charges)</p>
                                    </strong>
                                </div>
                                <span><strong><FormatPrice price={finalPrice+shippingCharges}></FormatPrice></strong></span>
                            </li>
                        </ul>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="button1 btn-primary btn-lg btn-block" onClick={handleSubmit}>
                       Place Order
                        </button>
                    </div>
                </div>
                <div className='buttonClass'>
                  <NavLink to="/home" style={{textDecoration:"none"}}>
                  <button className='delBtn' style={{borderRight:"1px solid white"}} >Go to Home</button>
                  </NavLink>
                  <NavLink to="/cart" style={{textDecoration:"none"}}>
                  <button className='delBtn' onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>Go To Cart</button>
                  </NavLink>  
                </div>
            </div>}
        </div>
    </div>
    </div>
  )
}

export default Delivery