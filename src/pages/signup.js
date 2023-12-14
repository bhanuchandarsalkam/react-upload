import React,{useState} from "react";
import Header from "../header/header.js";
import Inputcomponent from "../input/inputcomponent.js";
import Button from "../button/button.js";
import Signupform from "../signupforms/signupform.js";
import Loginform from "../signupforms/loginform.js";
const Signup=()=>{
    const [fullname,setFullname]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [conpassword,setConpassword]=useState("");
    const [flag,setFlag]=useState(false);
    const handle=async()=>{
console.log("bhanu");
    }
    return(
        <div>
             <Header/> 
             <div className="wrapper">
                {!flag?<h1 className="bhanu">Signup</h1>:<h1 className="bhanu">login</h1>}
             {!flag?<Signupform/>:<Loginform/>}
             {!flag?(<p className="chandra" style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Already have an acoount?. click here to login.</p>):(<p  className="chandra" style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Don't have an account?. click here to signup.</p>)}
             </div>
        </div>
    )
}
export default Signup;