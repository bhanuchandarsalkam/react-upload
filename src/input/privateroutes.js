import React from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {Outlet,Navigate} from "react-router-dom";
import {auth} from "../firbase";
import Loadingpage from "../loader/Loadingpage.js"
const Privateroutes=()=>{
const [user,loading,error]=useAuthState(auth);
if(loading){
    return <Loadingpage/>
}
else if(!user||error){
    return <Navigate to="/" replace />
}
else{
return <Outlet/>
}
}
export default Privateroutes;