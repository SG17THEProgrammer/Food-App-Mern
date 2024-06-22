import React, { useEffect, useState } from 'react'
import '../css/Delivery.css'
import Navbar from '../components/navbar'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../components/Auth'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import FormatPrice from '../Helpers/FormatPrice'
import { loadStripe } from '@stripe/stripe-js'
const Delivery = () => {
  const {user,cartItems,getCartItems} = useAuth();
  const productCartItem = useSelector((state) => state.product.cartItem);

  const totalPrice = productCartItem.reduce((sum,curr)=>parseFloat(sum) + parseFloat(curr.total),0)

  const tax= Math.ceil(totalPrice*0.12,2);
  const finalPrice =Math.ceil(totalPrice+tax,2)


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

console.log(shippingCharges)

  const [delDetails,setDelDetails ] = useState({
    name:"",
    address:"",
    city:"",
    pincode:"",
    email:"",
    phone:"",
    state:"",
    message:""
  })

  const [delData, setdelData] = useState(true)
  if (delData && user) {
		setDelDetails({
			name: user.name,
			email: user.email,
      phone:user.phone,
			message: "",
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


  const handlePayment = async () => {
    const stripe = await loadStripe('pk_test_51OkP1CSGM4q7z7zWyecwfKJL4fMfVV3dWiTTksC7PFH8LK5Xix3ADEV0C2UxJQBiY8y23JHqztqyNLeC2fkRsbAt00uIZcT3sD');

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
        const response = await fetch('http://localhost:8001/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({products:cartItems,customerInfo:customerInfo , deliveryCharge:shippingCharges , tax:tax})
          });
          
        if (!response.ok) {
          toast.error("Failed to create checkout session")
          throw new Error('Failed to create checkout session');

        }

        const data = await response.json();
        console.log('Session data:', data);
        toast.success("Redirecting to checkout")
        setTimeout(async()=>{

          const result = await stripe.redirectToCheckout({ sessionId: data.id });
          console.log('Stripe redirect result:', result);
        },2000 )

        if (result.error) {
            console.error('Stripe redirect error:', result.error);
        }
    } catch (error) {
        console.error('Error during payment handling:', error);
    }
};

    const handleSubmit=async()=>{
      try {
        const response = await fetch(`http://localhost:8001/delivery`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId:user._id,delDetails})
        });
        const resData = await response.json();
			console.log("response data : ", response);
			console.log(resData);
      if(response.ok){
        setDelDetails({
          name: user.name,
          email: user.email,
          phone:user.phone,
          message: "",
          address:"",
          city:"",
          pincode:"",
        });

        handlePayment()
      }
      else{
        toast.error(resData.message[0])
      }
      } catch (error) {
        toast.error("Couldn't place order ");
      }
    }


    useEffect(()=>{
      getCartItems();
    },[user,productCartItem])

  return (
    <div>
    <Navbar></Navbar>
          <div className="centered-container">
        <div className="row container" style={{backgroundColor:"brown" , width:"80vw" , height:"fit-content" , marginBottom:"100px"}}>
            <div className="col-md-8 mb-4"  >
                <div className="card mb-4">
                    <div className="card-header py-3">
                        <h5 className="mb-0">Billing details</h5>
                    </div>
                    <div className="card-body" style={{backgroundColor:"wheat"}}>
                        <form >
                            <div className="row mb-4">
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label className="form-label" for="form7Example1">Name</label>
                                        <input type="text" id="form7Example1" className="form-control"  name='name' value={delDetails.name} onChange={handleInput} required/>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row mb-4">
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" for="form7Example4">Address</label>
                                <input type="text" id="form7Example4" className="form-control"  name='address' value={delDetails.address} onChange={handleInput} required/>
                            </div>
                                <div className="col">
                                <div data-mdb-input-init className="form-outline">
                                        <label className="form-label" for="form7Example1">State</label>
                                        <input type="text" id="form7Example1" className="form-control"  name='state' value={delDetails.state} onChange={handleInput} required/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label className="form-label" for="form7Example1">City</label>
                                        <input type="text" id="form7Example1" className="form-control"  name='city' value={delDetails.city} onChange={handleInput} required/>
                                    </div>
                                    
                                </div>
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label className="form-label" for="form7Example1">Pin Code</label>
                                        <input type="number" id="form7Example1" className="form-control"  name='pincode' value={delDetails.pincode} onChange={handleInput} required/>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" for="form7Example5">Email</label>
                                <input type="email" id="form7Example5" className="form-control" name='email' value={delDetails.email} onChange={handleInput} required />
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" for="form7Example6">Phone</label>
                                <input type="number" id="form7Example6" className="form-control"  name='phone' value={delDetails.phone} onChange={handleInput} required/>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" for="form7Example7">Additional information</label>
                                <textarea className="form-control" id="form7Example7" rows="4" name='message' value={delDetails.message} onChange={handleInput} required></textarea>
                            </div>
                          
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
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
                  <button className='delBtn' >Go To Cart</button>
                  </NavLink>  
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Delivery