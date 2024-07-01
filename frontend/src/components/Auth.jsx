import { createContext, useContext ,useState,useEffect} from "react";
import { logoutUser } from "../redux/productSlide";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [team , setTeam] = useState([]);
    const [allUsers , setAllUsers] = useState();
    const [cartItems,setCartItems] =useState()


    const storeTokensInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
      };

      
const saveCartItemsToLS=(productCartItem,user)=> {
    user?localStorage.setItem(user, JSON.stringify(productCartItem)):"";
}
const getCartItems = () => {
  if (user && user._id) {
    const storedItems = localStorage.getItem(`${user._id}`);
   storedItems ? setCartItems(JSON.parse(storedItems)): [];
  }
};








      let isLoggedIn = !!token; //token hai true hojayega isLoggedIn agar nhi hai toh isLoggedIn false ho jayega
  //  //console.log(token);
   //console.log("isLoggedin ", isLoggedIn);  
 
   const LogoutUser = () => {
     setToken("");
     localStorage.removeItem("token");
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
        // //console.log(data.userData);

        // our main goal is to get the user data 👇
        setUser(data.userData);
      } else {
        //console.error("Error fetching user data");
      }
    } catch (error) {
      //console.log(error);
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
        // //console.log(data.user);

        // our main goal is to get the user data 👇
        setTeam(data.user);
      } else {
        //console.error("Error fetching user data");
      }
    } catch (error) {
      //console.log(error);
    }
  }
  const getallUsers = async () =>{
    try {
      const response = await fetch(`http://localhost:8001/allusers`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        //console.log(data);

        // our main goal is to get the user data 👇
        setAllUsers(data.allUsers);
      } else {
        //console.error("Error fetching user data");
      }
    } catch (error) {
      //console.log(error);
    }
  }



  
  
  

  
  useEffect(() => {
    getallUsers()
    getCartItems();
    userAuthentication();
    getTeam();
  }, []);

    return (
        <>
        <AuthContext.Provider value={{ isLoggedIn, storeTokensInLS, LogoutUser ,user ,team,saveCartItemsToLS,cartItems,getCartItems,allUsers}}>
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