import React from 'react'
import '../css/SlidingButton.css'


const SlidingButton = () => {

  return (
    <div id="carouselExampleAutoplaying" className="carousel slide carousel" data-bs-ride="carousel" data-interval="100" >
      <div className="carousel-inner" >
        <div className="carousel-item active">
        <div>Bike Delivery <i className="fa-solid fa-motorcycle" ></i></div>
        </div>
        <div className="carousel-item">
        <div>Fastest Delivery <i className="fa-solid fa-truck-fast"></i></div>
        </div>
        <div className="carousel-item">
        <div>Fresh Food <i className="fa-solid fa-bowl-food" ></i></div>
        </div>
      </div>
      
    </div>
  )
}

export default SlidingButton