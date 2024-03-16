import { createContext, useContext ,useState,useEffect} from "react";
import { logoutUser } from "../redux/productSlide";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [team , setTeam] = useState([]);



    const storeTokensInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
      };

      
const saveCartItemsToLS=(productCartItem)=> {
    localStorage.setItem('cart', JSON.stringify(productCartItem));
}

// Function to retrieve cart items from local storage
const getCartItemsFromLocalStorage=()=> {
  let cartItemsJSON = localStorage.getItem('cart');
  if (cartItemsJSON == []){
    return [];
  }
  else{
  return cartItemsJSON ? JSON.parse(cartItemsJSON) :[];
  }
}




      let isLoggedIn = !!token; //token hai true hojayega isLoggedIn agar nhi hai toh isLoggedIn false ho jayega
   console.log(token);
   console.log("isLoggedin ", isLoggedIn);  
 
   const LogoutUser = () => {
     setToken("");

     localStorage.removeItem("token");
     localStorage.removeItem("cart");
   };

    // function to check the user Authentication or not
  const userAuthentication = async () => {

    if (isLoggedIn){
    try {
      const response = await fetch(`http://localhost:8001/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.userData);

        // our main goal is to get the user data 👇
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  };

  
  const getTeam = async () =>{
    try {
      const response = await fetch(`http://localhost:8001/team`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.user);

        // our main goal is to get the user data 👇
        setTeam(data.user);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    userAuthentication();
    getTeam();
  }, []);

    return (
        <>
        <AuthContext.Provider value={{ isLoggedIn, storeTokensInLS, LogoutUser ,user ,team,saveCartItemsToLS,getCartItemsFromLocalStorage }}>
          {children}
        </AuthContext.Provider>
        </>
      );
    };
    

export const  useAuth = () => {
        const authContextValue = useContext(AuthContext);
        if (!authContextValue) {
          throw new Error("useAuth used outside of the Provider");
        }
        return authContextValue;
      };