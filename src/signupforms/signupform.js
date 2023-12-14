import React, { useState } from 'react';
import Inputcomponent from "../input/inputcomponent.js";
import Button from "../button/button.js";
import { auth, db } from "../firbase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setuser} from "../slices/userslice.js";
import{toast} from "react-toastify";
const Signupform = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conpassword, setConpassword] = useState("");
    const [error, setError] = useState("");
  const [loading,setLoading]=useState(false);
    const handle = async () => {
        setLoading(true);
        if (password === conpassword && password.length >= 6) {
            try {
                // Creating user's account
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
 
                // Saving user's details
                await setDoc(doc(db, "users", user.uid), {
                    name: fullname,
                    email: user.email,
                    uid: user.uid,
                });
 
                // Save the data in redux, call the redux action
             dispatch(setuser({ name: fullname, email: user.email, uid: user.uid }));
 
                // Navigate to profile page
                toast.success("user has been created");
                setLoading(false);
                 navigate("/profile");
            } catch (e) {
                toast.error(e.message);
                console.log("Error", e);
                setLoading(false);
            }
        } else {
            if(password!=conpassword){
                toast.error("please make sure that password and confirmpassword matches!");
            }
            else if(password.length<6){
                toast.error("please make sure that password length is greater than 6");
            }
            setLoading(false);
        }
    };
 
    return (
        <div className="bhanu">
            <Inputcomponent type="text" placeholder="Enter your name" state={fullname} setState={setFullname} />
            <Inputcomponent type="email" placeholder="Enter your email" state={email} setState={setEmail} />
            <Inputcomponent type="password" placeholder="Enter your password" state={password} setState={setPassword} />
            <Inputcomponent type="password" placeholder="Confirm password" state={conpassword} setState={setConpassword} />
            <Button text={loading?"loading...":"Signup"} onClick={handle} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
 
export default Signupform;