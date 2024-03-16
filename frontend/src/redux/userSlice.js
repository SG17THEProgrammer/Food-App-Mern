// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   email: "",
//   name: "",
//   image: "",
//   // token:"",
//   _id: "",
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginRedux: (state, action) => {
//       console.log(action)
//       console.log(action.payload.data);
//         state.user = action.payload.data;
//       state._id = action.payload.data._id;
//       state.name = action.payload.data.name;
//       state.email = action.payload.data.email;
//       state.image = action.payload.data.image;
//       // state.token = action.payload.data.token;
//       // localStorage.setItem('loginData',JSON.stringify(action.payload.data))
//       // console.log(JSON.stringify(action.payload.data))

//     },  
//     logoutRedux: (state, action) => {
//       state._id = "";
//       state.name = "";
//       state.email = "";
//       state.image = "";
//       // state.token = "";
//       // localStorage.delete('loginData',JSON.stringify(action.payload.data))
//     }
//     // ,
//     // generateToken:(state, action) => {
//     //   console.log(action)

//     // }
//   },
// });

// export const { loginRedux ,logoutRedux} = userSlice.actions;

// export default userSlice.reducer;
