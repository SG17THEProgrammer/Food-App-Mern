import React, { useEffect, useState } from 'react'
import '../css/Contact.css'
import Navbar from '../components/navbar'
import { useAuth } from '../components/Auth'
import { toast } from 'react-toastify'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import Authorize from '../components/Authorize'
import { Discuss } from 'react-loader-spinner'
import Loader from '../components/Loader'


const Contact = () => {
	const { user, getCartItems, isLoggedIn } = useAuth()
	const productCartItem = useSelector((state) => state.product.cartItem);

	const [isLoading, setIsLoading] = useState(false)
	const [contact, setContact] = useState({
		name: "",
		email: "",
		message: "",
	})

	const [userData, setUserData] = useState(true)

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

	const sendEmail = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
	
		formData.append("access_key", "e8fa7b2e-8a34-499e-b006-8bd583f75a46");
	
		const response = await fetch("https://api.web3forms.com/submit", {
		  method: "POST",
		  body: formData
		});
	
		const data = await response.json();
	
		if (data.success) {
		  event.target.reset();
		} else {
		  console.log("Error", data);
		}
	  };

	// handle form on submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(contact);


		try {
			setIsLoading(true)
			const response = await fetch(`http://localhost:8001/contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			});
			const resData = await response.json();
			console.log("response data : ", response);
			console.log(resData);

			if (response.ok) {	

				//storing tokens in LS through context api 
				// storeTokensInLS(resData.token)

				//storing tokens in LS in simple way
				// localStorage.setItem('token',resData.token)


				setContact({
					name: user.name,
					email: user.email, message: ""
				});
				// navigate('/home')
				console.log(resData);
				setTimeout(() => {
					setIsLoading(false);
					toast.success(resData.message[0]);
				}, 2000)

				sendEmail(e)
				
			} else {
				toast.error(resData.message[0]);
				setIsLoading(false);
			}
		} catch (error) {
			toast.error("Couldn't send the message ");
			setIsLoading(false);

			//   res.status(400).send(error)
		}
	};



	useEffect(() => {
		getCartItems();
	}, [user, productCartItem])

	useEffect(() => {

	}, [userData, user])


	return (
		<>
			{isLoading ? <Loader></Loader> : ""}
			{isLoggedIn ? <><Navbar></Navbar>
				<div className='otrDiv'>
					<div className="ctn1 d-flex justify-content-center align-items-center ">
						<img src="images/contact image.jpg" alt="error" className='img5' />

						<form className='form' onSubmit={handleSubmit}>
							<h1 className="title text-center mb-4">Talk to Us<Discuss
								visible={true}
								height="80"
								width="80"
								ariaLabel="discuss-loading"
								wrapperStyle={{ transform: "rotate(-90deg)", position: "absolute", top: "-3px", right: "9.5%" }}
								wrapperClass="discuss-wrapper"
								color="#fff"
								colors={['white', 'red']}
								backgroundColor="#F4442E"
							/></h1>

							<div className="form-group position-relative">
								<label htmlFor="formName" className="d-block">
									<i className="icon" data-feather="user"></i>
								</label>
								<input type="text" id="formName" className="form-control form-control-lg thick" placeholder="Name" value={contact.name} name='name' onChange={handleInput} />
							</div>

							{/* <!-- E-mail --> */}
							<div className="form-group position-relative">
								<label for="formEmail" className="d-block">
									<i className="icon" data-feather="mail"></i>
								</label>
								<input type="email" id="formEmail" className="form-control form-control-lg thick" placeholder="E-mail" value={contact.email} name='email' onChange={handleInput} />
							</div>

							{/* <!-- Message --> */}
							<div className="form-group message">
								<textarea id="formMessage" className="form-control form-control-lg" rows="7" placeholder="Write your Message " name='message' value={contact.message} onChange={handleInput}></textarea>
							</div>

							{/* <!-- Submit btn --> */}
							<div className="text-center">
								<button type="submit" className="btn4 btn-primary" tabIndex="-1">{!isLoading ? "Send message" : "Sending message..."}</button>
							</div>
						</form>

					</div>
				</div>

				<div className='mapDiv'>
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.826251336639!2d77.64943747470733!3d27.474668076316725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397373bfee84fa59%3A0x4ef32952d15bb3f9!2sPushpanjali%20upvan%20extension!5e0!3m2!1sen!2sin!4v1708171013715!5m2!1sen!2sin" width="600" height="450" allowFullScreen="" loading="lazy" classNamereferrerPolicy="no-referrer-when-downgrade" className='map'></iframe>
				</div>
				<Footer></Footer></> : <Authorize></Authorize>}
		</>
	)
}

export default Contact