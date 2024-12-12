import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginUser({ username,password }))
        navigate("/home")
        setUsername('')
        setPassword('')
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>LOG IN</button>
    </form>
  )
}

export default Login