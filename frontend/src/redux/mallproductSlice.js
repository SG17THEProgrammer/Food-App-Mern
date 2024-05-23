
  import { createSlice } from "@reduxjs/toolkit";
  import { toast } from "react-toastify";
  
  // const getCartItemsFromLocalStorage=()=> {
  //   let cartItemsJSON = localStorage.getItem('cart');
  //   if (cartItemsJSON == []){
  //     return [];
  //   }
  //   else{
  //   return cartItemsJSON ? JSON.parse(cartItemsJSON) :[];
  //   }
  // }
  const getCartItems=(user)=> {
    const cartItems = localStorage.getItem(user);
    return cartItems ? JSON.parse(cartItems) : [];
  }
  
  const initialState = {
    mallproductList:[],
    // cartItem:getCartItemsFromLocalStorage()
    cartItem:getCartItems()
    
  };
  
  export const mallproductSlice = createSlice({
    name: "mallproduct",
    initialState,
    reducers: {
      setmallDataProduct: (state, action) => {
        // console.log(action)
        // state.productList = [...action.payload];
        // console.log(action)
        state.mallproductList = [...action.payload];
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
        toast.success("Item Deleted");
        const index = state.cartItem.findIndex((elem) => elem._id === action.payload);
        state.cartItem.splice(index, 1);
        console.log(index);
      },
      increaseQty: (state, action) => {
        console.log(action.payload)
      console.log(state.cartItem)
      const index = state.cartItem.findIndex((elem) => elem._id === action.payload);
      console.log(index)
      let qty = state.cartItem[index].qty;
      // console.log(qty)
      const qtyInc = ++qty;
      // console.log(qtyInc)
      state.cartItem[index].qty = qtyInc;
      // console.log(qty)


      const price = state.cartItem[index].price;
      console.log(price)
      const priceInNumber =  parseFloat(price)
      // console.log(priceInNumber)
      // const priceTill3Decimal = priceInNumber.toFixed(3)

      const total = priceInNumber * qtyInc;
      console.log(total)
      state.cartItem[index].total = total;
      },
      decreaseQty: (state, action) => {
        const index = state.cartItem.findIndex((elem) => elem._id === action.payload);
        let qty = state.cartItem[index].qty;
        if (qty > 1) {
          const qtyDec = --qty;
          state.cartItem[index].qty = qtyDec;
  
          const price = state.cartItem[index].price;
          const priceInNumber =  parseFloat(price)
  
          // const priceTill3Decimal = priceInNumber.toFixed(3)
  
          const total = priceInNumber * qtyDec;
          console.log(total)
  
          state.cartItem[index].total = total;
        }
      },
      clearCart:(state) => {
        toast.success("Cart cleared");
        state.cartItem=[];
      },
      logoutUser:(state) => {
        return {
          ...state,
          cartItem: []
        };
      }
  
    },
  });
  
  
  export const {
    setmallDataProduct,
    addCartItem,
    deleteCartItem,
    increaseQty,
    decreaseQty,
    clearCart,
    logoutUser,
  } = mallproductSlice.actions;
  
  
  
  export default mallproductSlice.reducer;
    