import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLoginUser } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Ad_Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const result = await dispatch(adminLoginUser({ username, password }));
            
            if (result.isAdmin) {
                navigate("/admin-home");
            }
        } catch (err) {
            setError('Invalid admin credentials');
        }
    };

    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh'
        }}>
            <h2>Admin Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                gap: '10px'
            }}>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <button 
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Admin Login
                </button>
            </form>
        </div>
    );
}

export default Ad_Login;