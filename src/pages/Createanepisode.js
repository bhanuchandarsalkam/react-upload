import React,{useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Header from "../header/header.js";
import Inputcomponent from "../input/inputcomponent.js";
import Fileinput from "../input/fileinput.js";
import Button from "../button/button.js";
import {toast} from "react-toastify";
import { useParams } from "react-router-dom";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {storage,auth,db} from "../firbase";
import { addDoc, setDoc,collection} from "firebase/firestore"; 
function Createepisode(){
    const {id}=useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [audiofile, setAudiofile] = useState();
  const [loading,setLoading]=useState(false);
  const audiofilehandle=(file)=>{
    setAudiofile(file);
  }
  const handle=async()=>{
    setLoading(true);
    if(title&&desc&&audiofile&&id){
  try{
  const audioRef=ref(
    storage,
    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
  );
  await uploadBytes(audioRef,audiofile);
  const audioURL=await getDownloadURL(audioRef);
  const episodeData={
    title:title,
    Description:desc,
    audioFile:audioURL,
  };
  await addDoc(collection(db,"podcasts",id,"episodes"),episodeData)
  toast.success("episode created successfully");
    setLoading(false);
    navigate(`/podcast/${id}`);
    setTitle("");
    setDesc("");
    setAudiofile("");
  }catch(e){
    toast.error(e.message);
    setLoading(false);
  }
    }
    else{
        toast.error("all the fields should be there");
        setLoading(false);
    }
  }
    return(
        <div>
       <Header/>
       <div className="wrapper">
        <p>create an episode</p>
        <Inputcomponent type="text" placeholder="Enter title" state={title} setState={setTitle} />
        <Inputcomponent type="text" placeholder="Enter description" state={desc} setState={setDesc} />
        <Fileinput accept={"audio/*"} id={"audio-file-input"} filefunc={audiofilehandle} text={"upload audio file"}/>
        <Button text={loading?"loading...":"create Episode"} onClick={handle} />
       </div>
        </div>
    )
}
export default Createepisode;