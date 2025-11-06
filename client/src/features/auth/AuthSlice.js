import { createSlice } from "@reduxjs/toolkit";

const initialState = {
user: null,
token: null,    
isAuthenticated: false, 
error : null,


}

export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers:{

        
    }

})