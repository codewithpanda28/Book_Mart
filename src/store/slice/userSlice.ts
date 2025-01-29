import  { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState{
    user:any | null;
    isEmailVerfied:boolean;
    isLoginDialongOpen:boolean;
    inLoggedIn:boolean;
}


const initialState :userState={
    user:null,
    isEmailVerfied:false,
    isLoginDialongOpen:false,
    inLoggedIn:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUser:(state,action:PayloadAction<any>)=>{
            state.user = action.payload;
        },
        setIsEmailVerfied:(state,action:PayloadAction<any>)=>{
            state.isEmailVerfied = action.payload;
        },
        logout:(state)=>{
            state.user = null;
            state.isEmailVerfied = false;
        },
        toggleLoginDialog:(state)=>{
            state.isLoginDialongOpen = !state.isLoginDialongOpen;
        },
        authStatus:(state)=>{
            state.inLoggedIn = true;
        }
    }
});

export const { setUser, setIsEmailVerfied, logout, toggleLoginDialog, authStatus } = userSlice.actions;
export default userSlice.reducer;