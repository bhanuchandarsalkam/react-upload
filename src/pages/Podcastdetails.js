import React,{useEffect,useState} from 'react';
import Header from "../header/header.js";
import {toast} from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {db,auth} from "../firbase";
import { doc,getDoc} from "firebase/firestore"; 
import Button from "../button/button.js";
import {onSnapshot,collection,query} from "firebase/firestore"; 
import Episodedetails from "../episodes/episodedetails.js";
import Audioplayer from "../audio/audioplayer.js";
function Podcastdetails(){
let { id }=useParams()
const navigate=useNavigate();
   console.log("id",id);
   const[podcast, setPodcast]=useState({})
   const [episodes,setEpisodes]=useState([]);
   const [playingfile,setPlayingfile]=useState("");
    const getData=async()=>{
        const docRef=doc(db,"podcasts",id)
    const docSnap= await getDoc(docRef);
    if(docSnap.exists()){
        console.log("document data",docSnap.data())
        setPodcast({id:id,...docSnap.data()})
    }
    else{
        console.log("No such podcasts!");
        toast.error("No such podcasts!");
        navigate("/podcasts");
    }
    } 
   useEffect(()=>{
    if(id){
        getData();
    }
   },[id])
   useEffect(()=>{
    const unsubscribe=onSnapshot(
        query(collection(db,"podcasts",id,"episodes")),
        (querySnapshot)=>{
            const episodeData=[];
            querySnapshot.forEach((doc)=>{
                episodeData.push({id:doc.id,...doc.data()})  
            })
            setEpisodes(episodeData);
        },
        (error)=>{
            console.error("error fetching episodes",error);
        }
    )
    return ()=>{
        unsubscribe();
    }
   },[id])
    return(
        <div>
       <Header/>
       <div className="wrapper" style={{marginTop:"0rem"}}>
      {
      podcast.id &&(<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center", width:"100%"}}>
        <h1 className="title" style={{textAlign:"left"}}>{podcast.title}</h1>
         {podcast.createdBy==auth.currentUser.uid &&( 
        <Button style={{width:"300px",margin:0}} text={"create episode"} onClick={()=>navigate(`/podcast/${id}/create-episode`)}/>
      )}
        </div>
        <div className="banner-wrapper">
        <img src={podcast.bannerimage}/>
        </div>
        <p className="podcast-description">{podcast.Description}</p>
        <h1 className="podcast-title-heading" style={{textAlign:"left"}}>Episodes</h1>
        {
            episodes.length>0?<>{episodes.map((episode,index)=>{
                return <Episodedetails key={index} index={index+1} title={episode.title} description={episode.Description} audioFile={episode.audioFile} onClick={(file)=>setPlayingfile(file)}/>
            })}</>:<p>No Episodes</p>
        }
        </div>)
        }
       </div>
       {playingfile &&<Audioplayer audiosrc={playingfile} image={podcast.displayimage}/>}
        </div>
    )
}
export default Podcastdetails;