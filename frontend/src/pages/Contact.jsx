import React, { useState } from 'react'
import '../css/Contact.css'
import Navbar from '../components/navbar'
import { useAuth } from '../components/Auth'
import { toast } from 'react-toastify'
import Footer from '../components/Footer'


const Contact = () => {
	
	const [contact , setContact] = useState({
		name:"",
		email:"",
		message:"",
	  })
	
	  const [userData , setUserData] = useState(true)
	  const {user} = useAuth()
	  console.log(user)
	
	  if (userData && user) {
		setContact({
		  name: user.name,
		  email: user.email,
		  message: "",
		});
		setUserData(false);
	  }
	
	  const handleInput = (e) => {
		// console.log(e);
		let name = e.target.name;
		let value = e.target.value;
	
		setContact({
		  ...contact,
		  [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
		});
	  };
	
	  // handle form on submit
	  const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(contact);
	
		try {
		  const response = await fetch(`http://localhost:8001/contact`,{
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(contact),
		  });
		  console.log("response data : ", response);
	
		  if (response.ok) {
			  const resData = await response.json();
			  console.log(resData);
			  
			  //storing tokens in LS through context api 
			  // storeTokensInLS(resData.token)
			  
			  //storing tokens in LS in simple way
			  // localStorage.setItem('token',resData.token)
			  
			  
			  setContact({message: "" });
			  // navigate('/home')
			  console.log(resData);
			  toast.success("message send successfully");  
			} else {
			console.log("error inside response ", "error");
		  }
		} catch (error) {
			toast.error("Couldn't send the message ");  

		//   res.status(400).send(error)
		}
	  };
	
	
	


  return (
    <>
    <Navbar></Navbar>
    <div className='otrDiv'>
      <div className="ctn1 d-flex justify-content-center align-items-center ">
      <img src="images/contact image.jpg" alt="error" className='img5'/>
        
	<form className='form' onSubmit={handleSubmit}> 
		<h1 className="title text-center mb-4">Talk to Us</h1>

			{/* <!-- Name --> */}
			<div className="form-group position-relative">
				<label for="formName" className="d-block">
					<i className="icon" data-feather="user"></i>
				</label>
				<input type="text" id="formName" className="form-control form-control-lg thick" placeholder="Name" value={contact.name} name='name' onChange={handleInput}/>
			</div>

			{/* <!-- E-mail --> */}
			<div className="form-group position-relative">
				<label for="formEmail" className="d-block">
					<i className="icon" data-feather="mail"></i>
				</label>
				<input type="email" id="formEmail" className="form-control form-control-lg thick" placeholder="E-mail"  value={contact.email} name='email' onChange={handleInput}/>
			</div>

			{/* <!-- Message --> */}
			<div className="form-group message">
				<textarea id="formMessage" className="form-control form-control-lg" rows="7" placeholder="Write your Message " name='message' value={contact.message} onChange={handleInput}></textarea>
			</div>
		
			{/* <!-- Submit btn --> */}
			<div className="text-center">
				<button type="submit" className="btn4 btn-primary" tabIndex="-1">Send message</button>
			</div>
	</form>
	
</div>
</div>

<div className='mapDiv'>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.826251336639!2d77.64943747470733!3d27.474668076316725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397373bfee84fa59%3A0x4ef32952d15bb3f9!2sPushpanjali%20upvan%20extension!5e0!3m2!1sen!2sin!4v1708171013715!5m2!1sen!2sin" width="600" height="450"  allowFullScreen="" loading="lazy"  classNamereferrerPolicy="no-referrer-when-downgrade" className='map'></iframe>
</div>
<Footer></Footer>
    </>
  )
}

export default Contact