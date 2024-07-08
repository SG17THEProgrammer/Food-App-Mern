import React from 'react'
import Navbar from '../../components/navbar'

const Location = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className='mapDiv'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124409.02624955568!2d77.58279519726563!3d12.98578610000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0e0361f49c0f%3A0xaccc514e54766bd4!2sTata%20Consultancy%20Services!5e0!3m2!1sen!2sin!4v1720440376678!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"  style={{width:"94.8vw",height:"60vh"}}></iframe>
    </div>
    </>
  )
}

export default Location