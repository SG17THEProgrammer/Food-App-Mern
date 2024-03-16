import React , { useEffect } from 'react'
import { useAuth } from '../components/Auth';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/productSlide';

const Logout = () => {
    const dispatch = useDispatch()

    const { LogoutUser } = useAuth();
    dispatch(logoutUser())

    useEffect(() => {
        LogoutUser();
    }, [LogoutUser]);



    return <Navigate to="/login" />;
}

export default Logout

