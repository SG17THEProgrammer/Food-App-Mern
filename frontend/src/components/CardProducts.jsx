import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteCartItem, increaseQty, decreaseQty } from '../redux/productSlide';
import '../css/Cart.css';
import FormatPrice from '../Helpers/FormatPrice';
import { useAuth } from './Auth';

const CardProducts = ({ qty, total, price, id, name, category, image }) => {
  const dispatch = useDispatch();
  const { user,getCartItems} = useAuth();
  

  const handleIncreaseQty = () => {
    dispatch(increaseQty([id, user._id]));
    getCartItems()
  };

  const handleDecreaseQty = () => {
    dispatch(decreaseQty([id, user._id]));
    getCartItems()
  };

  const handleRemoveItem = () => {
    dispatch(deleteCartItem([id, user._id]));
    getCartItems()

  };


  return (
    <div className="row mb-5">
      <div className="col-lg-5">
        <div className="me-lg-5">
          <div className="d-flex">
            <img src={image} style={{ width: '96px', height: '96px' }} alt={name} />
            <div className="about">
              <NavLink to="" className="nav-link" style={{ marginBottom: '10px' }}>
                {name}
              </NavLink>
              <p className="text-muted" style={{ color: 'red' }}>
                {category}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-5 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
        <div className="butn3">
          <p style={{ textAlign: 'center' }}>Quantity</p>
          <div className="btn3">
            <button className="butn btn" onClick={handleDecreaseQty}>
              ➖
            </button>
            <span className="input">{qty}</span>
            <button className="butn btn" onClick={handleIncreaseQty}>
              ➕
            </button>
          </div>
        </div>
        <div className="text">
          <p className="h6">Total Price : &nbsp; {<FormatPrice price={Math.ceil(total)} />}</p>
          <small className="text-muted text-nowrap" style={{ marginTop: '-50px' }}>
            {price}/ per item
          </small>
        </div>
      </div>
      <div className="col-lg col-sm-6 d-flex justify-content-xl-end">
        <div className="float-md-end">
          <button className="btn btn-light border text-danger icon-hover-danger" onClick={handleRemoveItem}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProducts;
