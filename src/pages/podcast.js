import React,{useEffect,useState} from "react";
import Header from "../header/header.js";
import {useDispatch,useSelector} from "react-redux";
import {onSnapshot,collection,query} from "firebase/firestore"; 
import {db} from "../firbase";
import {setPodcasts} from "../slices/podcastslice.js";
import Podcastcard from "../podcasts/podcastcard.js";
import Inputcomponent from "../input/inputcomponent.js";
function Podcast(){
    
  const dispatch=useDispatch();
  const podcasts=useSelector(state=>state.podcasts.podcasts)
  const [search,setSearch]=useState("");
  useEffect(()=>{
const unsubscribe=onSnapshot(
    query(collection(db,"podcasts")),
    (querySnapshot)=>{
        let podcastData=[];
        querySnapshot.forEach((doc)=>{
       podcastData.push({id:doc.id,...doc.data()})
        });
        dispatch(setPodcasts(podcastData));
    },
    (error)=>{
        console.log("error fetching podcasts",error);
    }
)
return()=>{
    unsubscribe();
}
  },[dispatch])
  console.log(podcasts);
  var filteredpodcasts=podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.trim().toLowerCase()))
    return(
        <div>
            <Header/>
            <div className="bhanu" style={{ marginTop:"2rem"}}>
            <h1 className="dis">Discover Podcasts</h1>
            <Inputcomponent type="text" placeholder="search by title" state={search} setState={setSearch} />
            {
                filteredpodcasts.length>0?(
                    <div className="podcast-flex" style={{marginTop:"2rem"}}>
                    {filteredpodcasts.map((item)=>{
                    return<Podcastcard key={item.id} id={item.id} title={item.title} displayImage={item.displayimage} />
                })}</div>):(<p>{search?"podcasts not found":"no podcasts on the platform"}</p>)
            }
            </div>
        </div>
    )
}
export default Podcast;