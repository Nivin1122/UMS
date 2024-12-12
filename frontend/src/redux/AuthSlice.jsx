import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
// import { use } from "react";

const initialState = {
    token : localStorage.getItem('token') || null,
    user: null,
    refreshToken: localStorage.getItem('refresh') || null,
    isAdmin: localStorage.getItem('isAdmin') === 'true' || false
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.refreshToken = action.payload.refreshToken;
            state.isAdmin = action.payload.isAdmin || false;
        },
        logout:(state)=>{
            state.token = null;
            state.user = null;
            state.refreshToken = null;
            state.isAdmin = false;
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            localStorage.removeItem('isAdmin');
        }
    }
})


export const adminLoginUser = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/admin-login/', credentials);
        const { access, refresh, is_admin } = response.data

        dispatch(login({
            token: access,
            user: credentials.username,
            refreshToken: refresh,
            isAdmin: is_admin,
        }));

        return { access, isAdmin: is_admin};
    }catch (error) {
        console.error(error);
        throw error;
}
}



export const { login, logout } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
    try{
        const response = await axios.post('http://localhost:8000/api/auth/token/',credentials)
        const { access,refresh } = response.data;
        localStorage.setItem('token',access);
        localStorage.setItem('refresh',refresh);

        dispatch(login({ token: access, user: credentials.username, refreshToken: refresh}));

        return access;

    } catch (error) {
        console.error(error);
    }
}


export const signupUser = (userData) => async (dispatch) => {
    try {
        await axios.post('http://localhost:8000/api/auth/register/', userData);
        alert('Signup successful! Please log in.');
        // dispatch(login({ token: '', user: '' }));
    } catch (error) {
        console.error(error);
    }
}



export const refreshToken =()=> async (dispatch)=>{
    try{
        const refreshToken = localStorage.getItem('refresh');
        const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
            refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('token', access);

        dispatch(login({ token: access, user: '', refreshToken: refreshToken  }));

        return access;
    } catch (error) {
        console.error('Token refresh failed:', error.response?.data || error.message);
    }
}


export const logoutUser = () => async (dispatch) =>{
    try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }
        await axios.post('http://localhost:8000/api/auth/logout/', { refresh: refreshToken });

        dispatch(logout());
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')

        alert("Logged out successfully!");
    }catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);

        dispatch(logout())
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        
        alert('Session expired or invalid. Logged out!')
}
}


axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)


export default authSlice.reducer;