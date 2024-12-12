import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(signupUser({ username,password }))
        navigate("/login")
        setUsername('')
        setPassword('')
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Sign Up</button>
        
    </form>
  )
}

export default Signup