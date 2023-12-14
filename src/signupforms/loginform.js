import React,{useState} from 'react';
import Inputcomponent from "../input/inputcomponent.js";
import Button from "../button/button.js";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth,db} from "../firbase.js";
import { doc, getDoc } from "firebase/firestore"; 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setuser} from "../slices/userslice.js";
import {toast} from "react-toastify";
const Loginform=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
 const handleinput=async()=>{
    console.log("chandra");
    setLoading(true);
    if(email&&password){
        try {
            // Creating user's account
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Saving user's details
            const userDoc=await getDoc(doc(db, "users", user.uid));
             const userData=userDoc.data;
             console.log("userdata",userData);
            // Save the data in redux, call the redux action
         dispatch(setuser({ name:userData.name, email: user.email, uid: user.uid,profilePic:userData.profilePic}));
    
            // Navigate to profile page
            setLoading(false);
             toast.success("login successfully!");
             navigate("/profile");
        } catch (e) {
            setError(e.message);
            console.log("Error", e);
            setLoading(false);
            toast.error(e.message);
        }
    }
    else{
        toast.error("make sure that email and password are not empty!");
      setLoading(false);
    }
    
} 
 
    return(
        <div className="bhanu">
            <Inputcomponent type="email" placeholder="enter your email" state={email} setState={setEmail}/>
             <Inputcomponent type="password" placeholder="enter your password" state={password} setState={setPassword}/>
             <Button text={loading?"loading...":"login"} onClick={handleinput}/>
        </div>
    )
}
export default Loginform;
