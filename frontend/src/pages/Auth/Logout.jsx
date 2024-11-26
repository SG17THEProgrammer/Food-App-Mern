import React , { useEffect } from 'react'
import { useAuth } from '../../components/Auth';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/productSlide';

const Logout = () => {
    const dispatch = useDispatch()

    const { LogoutUser ,isLoggedIn} = useAuth();
    dispatch(logoutUser())

    useEffect(() => {
        LogoutUser();
        setTimeout(()=>{
            //window.location.reload();
        },2000)
        toast.success("Successfully logged out")
    }, [LogoutUser,isLoggedIn]);



    return <Navigate to="/login" />;
}

export default Logout

