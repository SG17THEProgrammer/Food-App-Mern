import React from 'react'
import Navbar from '../components/navbar'
import '../css/AboutUs.css'
import { useAuth } from '../components/Auth'

const AboutUs = () => {

    const {team} = useAuth()
    //console.log(team)
  return (
      <>
    <Navbar></Navbar>
    <div className='outerDiv'>
        <div className="about-section">
        <div className='imgDiv3'><img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='img1' alt="error" /></div>
 <div className='paraDiv2'> <p className='para1 shine'>Our app is a digital platform designed to facilitate the ordering, delivery of food. <br /> It  has become increasingly popular due to its convenience and accessibility. <br />Users can  browse menus, place orders, and make payments all   from their smartphones or computers.
</p></div>
</div>

<h2 style={{textAlign:"center" ,margin:"100px 0 20px 0 " ,textDecoration:"underline"}}>Our Team</h2>
<div className=" row cardDiv">
  { team.map((elem,idx)=>{
    const {name , designation, image , about , email } = elem;
    return(
    <div className="column1" key={idx}>
    <div className="card2">
      <img src={image}  className='img2' alt="image"/>
      <div className="container2">
        <h3>{name}</h3>
        <p className="title1">{designation}</p>
        <p>{about}</p>
        <p className='email'>{email}</p>
        {/* <p><button className="button1">Contact</button></p> */}
      </div>
    </div>
  </div>
    )
  })
 }


  
</div>
</div>
    </>
  )
}

export default AboutUs