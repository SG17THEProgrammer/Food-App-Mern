import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, fetchCartItems } from '../redux/productSlide';
import CardProducts from '../components/CardProducts';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import FormatPrice from '../Helpers/FormatPrice';
import { useAuth } from '../components/Auth';
import { toast } from 'react-toastify';

const Cart = () => {
  const { user ,getCartItems,cartItems} = useAuth();
  const dispatch = useDispatch();

  const totalPrice = cartItems?.reduce((sum, curr) => parseFloat(sum) + parseFloat(curr.total), 0);
  const totalPriceceil = Math.ceil(totalPrice);
  const tax = Math.ceil(totalPrice * 0.12, 2);
  const finalPrice = Math.ceil(totalPrice + tax, 2);

  // console.log(totalPriceceil)
  // console.log(isNaN(totalPriceceil))
  // console.log(tax)
  // console.log(finalPrice)
  // console.log(cartItems)
  // console.log(cartItems?.length )


  const handlePurchase = () => {
    if (cartItems?.length === 0) {
      toast.error('No item in cart');
    }
  };

  const handleClearCart=()=>{
    dispatch(clearCart(user._id))
    getCartItems()
  }

    useEffect(() => {
      getCartItems()
    },[user])

  useEffect(() => {
    dispatch(fetchCartItems(user._id));
  }, [dispatch, user._id]);

  return (
    <>
      <Navbar />
      <section className="mainCtn">
        <div className="row">
          {/* Cart items */}
          <div className="col-lg-9">
            <div className="card border" style={{ width: '800px' }}>
              <div className="m-4">
                <button className="btn" style={{ position: 'absolute', right: '0', top: '3px' }} onClick={handleClearCart}>
                  Clear Cart
                </button>
                <h4 className="card-title mb-4" style={{ textDecoration: 'underline' }}>
                  YOUR SHOPPING CART
                </h4>
                <br />
                {cartItems?.length > 0 ? (
                  cartItems?.map((elem) => (
                    <CardProducts
                      key={elem._id}
                      id={elem._id}
                      name={elem.name}
                      image={elem.image}
                      category={elem.category}
                      qty={elem?.qty}
                      total={elem.total}
                      price={elem.price}
                      items={cartItems}
                    />
                  ))
                ) : (
                  <h4 style={{ marginTop: '45px', textAlign: 'center', textDecoration: 'underline', color: 'crimson' }}>
                    Cart is Empty
                  </h4>
                )}
              </div>
              <div className="border-top pt-4 mx-4 mb-4">
                <p>
                  <i className="fas fa-truck text-muted fa-lg"></i> Delivery charges according to location and terms and conditions
                </p>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elemit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div style={{ width: '250px' }}>
            <div className="card col-lg-15">
              <div className="card-body">
                SUMMARY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ textDecoration: 'underline' }}>{cartItems==null ? 0 : cartItems?.length} items</span>
              </div>
            </div>
            <div className="card shadow-0 border">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price:</p>
                  <p className="mb-2">{<FormatPrice price={isNaN(totalPriceceil)? 0 :totalPriceceil } />}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">TAX:</p>
                  <p className="mb-2 text-danger">+{<FormatPrice price={isNaN(tax)? 0 :tax } />}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Final price:</p>
                  <p className="mb-2 fw-bold">{<FormatPrice price={isNaN(totalPrice)? 0 :totalPrice } />}</p>
                </div>

                <div className="mt-3">
                  {cartItems?.length !== 0 ? (
                    <NavLink to="/delivery" style={{ color: 'black' }}>
                      <span className="btn w-100 mb-2" onClick={handlePurchase}>
                        Proceed To Checkout
                      </span>
                    </NavLink>
                  ) : (
                    <NavLink to="/cart" style={{ color: 'black' }}>
                      <span className="btn w-100 mb-2" onClick={handlePurchase}>
                        Proceed To Checkout
                      </span>
                    </NavLink>
                  )}
                  <NavLink to="/home" className="btn btn-light w-100 border mt-2">
                    Back to shop
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
