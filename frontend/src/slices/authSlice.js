import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //for userInfo first we check localStorage, if it is there we parse it and use it or we assign it as null
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers : {
        setCredentials:(state,action)=>{
            //setting userInfo to the state
            state.userInfo = action.payload;
            //setting userInfo to local storage after strigifying it
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        clearCredentials:(state,action)=>{
            //clearing user info in state
            state.userInfo = null;
            //removing from local storage
            localStorage.removeItem('userInfo');
        }
    }
})

export const {setCredentials,clearCredentials} = authSlice.actions;
export default authSlice.reducer;