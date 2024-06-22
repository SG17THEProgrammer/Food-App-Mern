import { createSlice } from "@reduxjs/toolkit";
import { useAuth } from "../components/Auth";
import { toast } from "react-toastify";
import { useEffect } from "react";

// const getCartItems=()=>{
//     const storedItems = localStorage.getItem(`${user._id}`);
//     return storedItems ? JSON.parse(storedItems) : [];
//   }

const initialState = {
  productList: [],
  // cartItem:getCartItems()
  cartItem:[],
  // user:null,
};


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    }
    ,
    addCartItem: (state, action) => {
    
      const priceInNumber =  parseFloat(action.payload.price)
      // const priceTill3Decimal = priceInNumber.toFixed(3)
      console.log(action.payload.price)
      // const price = action.payload.price

      // console.log(action)
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast.error("Already Item in Cart");
      } else {
        toast("Item Added successfully");
        
        const total = priceInNumber; 
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total},
        ];
      }
    },
    deleteCartItem: (state, action) => {
      console.log(action.payload)
      const userId = action.payload[1];
      const itemId = action.payload[0];
      let cartItem= JSON.parse(localStorage.getItem(userId));
      const index = cartItem.findIndex((elem) => elem._id === itemId);
      cartItem.splice(index, 1);
      localStorage.setItem(userId, JSON.stringify(cartItem));
      window.location.reload();
      toast.success("Item Deleted");

    },
    increaseQty: (state, action) => {
      const userId = action.payload[1];
      const itemId = action.payload[0];
      let cartItem= JSON.parse(localStorage.getItem(userId));

      const index = cartItem.findIndex((elem) => elem._id === itemId);
      console.log(index)
      let qty = cartItem[index].qty;
      // console.log(qty)
      const qtyInc = ++qty;
      // console.log(qtyInc)
      cartItem[index].qty = qtyInc;
      // console.log(qty)


      const price = cartItem[index].price;
      console.log(price)
      const priceInNumber =  parseFloat(price)
      // console.log(priceInNumber)
      // const priceTill3Decimal = priceInNumber.toFixed(3)
      
      const total = priceInNumber * qtyInc;
      console.log(total)
      cartItem[index].total = total;
      localStorage.setItem(userId, JSON.stringify(cartItem));
      window.location.reload();

    },
    decreaseQty: (state, action) => {
      const userId = action.payload[1];
      const itemId = action.payload[0];
      let cartItem= JSON.parse(localStorage.getItem(userId));
      const index = cartItem.findIndex((elem) => elem._id === itemId);
      let qty = cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        cartItem[index].qty = qtyDec;

        const price = cartItem[index].price;
        const priceInNumber =  parseFloat(price)
        
        // const priceTill3Decimal = priceInNumber.toFixed(3)

        const total = priceInNumber * qtyDec;
        console.log(total)

        cartItem[index].total = total;
        localStorage.setItem(userId, JSON.stringify(cartItem));
      window.location.reload();

      }
    },
    clearCart:(state,action) => {
      console.log(action.payload)
      if(localStorage.getItem(action.payload)===null){
        toast.error("Cart is already empty");
      }
      else{
      localStorage.removeItem(action.payload);
      setTimeout(() => {
        window.location.reload();
        // state.cartItem = [];
      },1000)
      toast.success("Cart cleared");
    }
    },
    logoutUser:(state) => {
      return {
        ...state,
        cartItem: []
      };
    },
    setCartItem: (state, action) => {
      state.cartItem = [...action.payload];
      
    },
    // setUser: (state, action) => {
    //   state.user = action.payload;
    // },
  },
});



export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  clearCart,
  logoutUser, 
  setUser,
  setCartItem
} = productSlice.actions;

export const fetchCartItems = (userId) => (dispatch) => {
  if (!userId) {
    console.error("User ID not provided");
    return;
  }

  const storedCartItems = localStorage.getItem(userId);
  const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
  dispatch(setCartItem(cartItems));
};
export default productSlice.reducer;
