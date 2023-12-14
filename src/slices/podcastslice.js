import {createSlice} from "@reduxjs/toolkit";

const initialState={
    podcasts:[]
}
const podcastslice=createSlice({
    name:"podcasts",
    initialState,
    reducers:{
        setPodcasts:(state,action)=>{
            state.podcasts=action.payload;
        }
    }
})
export const {setPodcasts}=podcastslice.actions;
export default podcastslice.reducer;
