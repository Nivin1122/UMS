import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
    const { isAdmin, token } = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () =>{
        dispatch(logout());
        navigate("/admin-login")
    }

    if (!isAdmin || !token){
        return <Navigate to="/admin-login" />;
    }

  return (
    <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin!</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminHome;