import { configureStore } from "@reduxjs/toolkit";
// import userSliceReducer from "./userSlice";
import productSliceReducer from "./productSlide";
import mallproductSliceReducer from "./mallproductSlice";

export const store = configureStore({
  reducer: {
    // user : userSliceReducer,
    product : productSliceReducer,
    mallproduct:mallproductSliceReducer
    
  },
});
