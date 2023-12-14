import React from 'react';
import Signup from "./pages/signup.js"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Profile from "./pages/profile.js";
import Createapodcast from "./pages/createapodcast.js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import {onAuthStateChanged} from 'firebase/auth';
import {onSnapshot} from "firebase/firestore";
import { auth, db } from "./firbase.js";
import { doc} from "firebase/firestore"; 
import { useDispatch } from "react-redux";
import {setuser} from "./slices/userslice.js";
import Privateroute from "./input/privateroutes.js";
import Podcast from "./pages/podcast.js"
import Podcastdetails from "./pages/Podcastdetails.js";
import Createepisode from "./pages/Createanepisode.js";
const App=()=>{
   const dispatch=useDispatch();
   useEffect(()=>{
    const unsubscribedauth=onAuthStateChanged(auth,(user)=>{
      if(user){
        const unsubscribedsnapshot=onSnapshot(
          doc(db,"user",user.uid),
          (userDoc)=>{
         if(userDoc.exists()){
          const userData=userDoc.data();
           dispatch(setuser(
           {
             name:userData.name,
              email:userData.email,
              uid:user.uid,
             } ))
         }
          },
         (error)=>{
          console.log("error fetching user data:",error);
         }
        )
        return ()=>{
          unsubscribedsnapshot();
         }
      }
     })
     return ()=>{
       unsubscribedauth();
     }
   },[])
   return(
    <div>
      <ToastContainer/>
      <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route element={<Privateroute/>}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-a-podcast" element={<Createapodcast/>}/>
        <Route path="/podcasts" element={<Podcast/>}/>
        <Route path="/podcast/:id" element={<Podcastdetails/>}/>
        <Route path="/podcast/:id/create-episode" element={<Createepisode/>}/>
        </Route>
      </Routes>
      </Router>
    </div>
   )
}
export default App;
