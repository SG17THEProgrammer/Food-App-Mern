import React, { useState } from 'react';
import '../css/PopUp.css';

const Popup = ({closePopup,handleDelete}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p style={{fontSize:"25px"}}>Do you want to delete the user?</p>
        <div className='btnDiv'>
        <button className='yes' style={{fontSize:"20px"}}  onClick={handleDelete}>Yes</button>
        <button className='no' style={{fontSize:"20px"}} onClick={closePopup}>No</button>
        </div>
      </div>
    </div>
  );    
};

export default Popup;
