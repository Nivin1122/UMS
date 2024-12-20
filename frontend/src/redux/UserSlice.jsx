import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUsers = createAsyncThunk('users/fetchUsers',async(_,{ rejectWithValue })=>{
    try {
        const response = await axios.get('http://localhost:8000/adm/users/')
        return response.data;
    }catch (error) {
        return rejectWithValue(error.response.data);
}})

const userSlice = createSlice({
    name:'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchUsers.pending,(state)=>{
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})


export default userSlice.reducer;