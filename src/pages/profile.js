import React from 'react';
import {useSelector} from "react-redux";
import Header from "../header/header.js";
import {auth} from "../firbase";
import {signOut} from "firebase/auth";
import {toast} from "react-toastify";
import Button from "../button/button.js";
import Loadingpage from "../loader/Loadingpage.js";
const Profile=()=>{
 const user=useSelector(state=>state.user.user);
 console.log("user",user);
 if(!user){
    return <Loadingpage/>
 }
 const handlelogout=()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("user has successfully logged out!");
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
 }
    return(
        <div>
        <Header/>
        <h1 className="pro">{user.name}</h1>
        <h1 className="pro">{user.email}</h1>
        <h1 className="pro">{user.uid}</h1>
        <Button text={"logout"} onClick={handlelogout}/>
        </div>
    )
}
export default Profile;