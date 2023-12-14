import React,{useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Inputcomponent from "../input/inputcomponent.js";
import Button from "../button/button.js";
import {toast} from "react-toastify";
import Fileinput from "../input/fileinput.js";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {storage,auth,db} from "../firbase";
import { addDoc, setDoc,collection} from "firebase/firestore"; 
const Startpodcastpage=()=>{
 const dispatch = useDispatch();
const navigate = useNavigate();
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [displayimage,setDisplayimage]=useState("");
const [bannerimage,setBannerimage]=useState("");
const [loading,setLoading]=useState(false);
const handle=async()=>{
    if(title&&desc&&displayimage&&bannerimage){
        setLoading(true);
        try{
            const bannerimageRef=ref(
                storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(bannerimageRef,bannerimage);
               const bannerImageUrl=await getDownloadURL(bannerimageRef);
               console.log("bannerimageurl",bannerImageUrl);
               const DisplayimageRef=ref(
                storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(DisplayimageRef,displayimage);
               const DisplayImageUrl=await getDownloadURL(DisplayimageRef);
               console.log("imageudisplayrl",DisplayImageUrl);
              const podcastData={
                 title:title,
                Description:desc,
                bannerimage:bannerImageUrl,
                displayimage:DisplayImageUrl,
                createdBy:auth.currentUser.uid,
            }
            const docRef=await addDoc(collection(db,"podcasts"),podcastData)
            setTitle("");
            setDesc("");
            setBannerimage(null);
            setDisplayimage(null);
            toast.success("podcast created");
            setLoading(false);
        }
        catch(e){
            toast.error(e.message);
            console.log(e);
            setLoading(false);
        }
    }
    else{
        toast.error("please fill the fields!");
        setLoading(false);
    }
}
const bannerimagefunc=(file)=>{
    setBannerimage(file)
}
const displayimagefunc=(file)=>{
    setDisplayimage(file)
}
    return(
        <div className="bhanu">
          <Inputcomponent type="text" placeholder="title" state={title} setState={setTitle} />
          <Inputcomponent type="text" placeholder="description" state={desc} setState={setDesc} />
          <Fileinput accept={"image"} id={"banner-input-image"} filefunc={bannerimagefunc} text={"import banner image"}/>
          <Fileinput accept={"image"} id={"display-input-image"} filefunc={displayimagefunc} text={"import display image"}/>
          <Button text={loading?"loading...":"create A podcast"} onClick={handle} />
        </div>
    )
}
export default Startpodcastpage;