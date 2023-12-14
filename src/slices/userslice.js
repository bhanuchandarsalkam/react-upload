import {createSlice} from "@reduxjs/toolkit";

const initialState={
    user:null
}
const Userslice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setuser:(state,action)=>{
            state.user=action.payload;
        },
        clearuser:(state)=>{
    state.user=null;
        }
    }
})
export const {setuser,clearuser}=Userslice.actions;
export default Userslice.reducer;
