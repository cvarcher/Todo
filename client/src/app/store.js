import {configureStore} from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/AuthSlice';
// import {todoSlice} from '../features/todos/TodoSlice';

export const store =configureStore({
    reducer:{
        auth: authSlice.reducer,  //keyname " auth " can be used to access the state
        // todo: todoSlice.reducer

    }
})