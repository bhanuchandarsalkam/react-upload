import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userslice.js";
import podcastreducer from "./slices/podcastslice.js";
 export default configureStore({
    reducer:{
        user:userReducer,
        podcasts:podcastreducer,
    }
 });