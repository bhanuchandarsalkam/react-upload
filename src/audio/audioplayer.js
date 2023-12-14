import React,{useState,useEffect} from "react";
import {useRef} from "react";
import "./style.css";
import {FaPlay,FaPause,FaVolumeUp,FaVolumeMute} from "react-icons/fa";
function Audioplayer({audiosrc,image}){
    const [isplaying,setIsplaying]=useState(true);
    const [ismute,setIsmute]=useState(false);
    const [duration,setDuration]=useState("");
    const [currentTime,setCurrentTime]=useState(0);
     const [volume,setVolume]=useState(1);
     const audioRef=useRef();
     const handleduration=(e)=>{
        setCurrentTime=e.target.value;
        audioRef.current.currentTime=e.target.value;
     }
     const toggleplay=()=>{
        console.log(audioRef);
        console.log(audiosrc);
     if(isplaying){
        setIsplaying(false);
        audioRef.current.pause();
     }
     else{
        setIsplaying(true);
        audioRef.current.play();
     }
     }
     const togglemute=()=>{
        if(ismute){
            setIsmute(false);
        }
        else{
            setIsmute(true);
        }
     }
     const handlevolume=(e)=>{
     setVolume(e.target.value);
     audioRef.current.volume=e.target.value;
     }
    useEffect(()=>{
        const audio=audioRef.current;
        audio.addEventListener("timeupdate",handleTimeUpdate);
        audio.addEventListener("loadedmetadata",handleLoadedMetaData);
        audio.addEventListener("ended",handleEnded);
        return()=>{
            audio.removeEventListener("timeupdate",handleTimeUpdate);
        audio.removeEventListener("loadedmetadata",handleLoadedMetaData);
        audio.removeEventListener("ended",handleEnded);
        }
    },[])
const handleTimeUpdate=()=>{
    setCurrentTime(audioRef.current.currentTime);
}
const handleLoadedMetaData=()=>{
    setDuration(audioRef.current.duration);
}
  const handleEnded=()=>{
    setCurrentTime(0);
    setIsplaying(false);
  }
     useEffect(()=>{
        if(!ismute){
            audioRef.current.volume=1;
            setVolume(1);
        }
        else{
            audioRef.current.volume=0;
            setVolume(0);
        }
     },[ismute]);
     useEffect(()=>{
     setDuration(audioRef.current.duration);
     },[audioRef])
     const formatTime=(time)=>{
    const minutes=Math.floor(time/60);
    const seconds=Math.floor(time%60);
    return `${minutes}:${seconds<10?"0":""}${seconds}`;
     }
    return(
        <div className="custom-audio-player">
      <img src={image} className="display-image-player"/>
      <audio ref={audioRef} src={audiosrc}/>
      <p  className="audio-btn" onClick={toggleplay}>{isplaying?<FaPause/>:<FaPlay/>}</p>
      <div className="duration-flex">
        <p>{formatTime(currentTime)}</p>
      <input type="range" max={duration} step={0.01} value={currentTime} onChange={handleduration} className="duration-range"/>
      <p>{formatTime(duration-currentTime)}</p>
      <p className="audio-btn" onClick={togglemute}>{!ismute?<FaVolumeUp/>:<FaVolumeMute/>}</p>
      <input type="range" value={volume} max={1} min={0} step={0.01} onChange={handlevolume} className="volume-range"/>
      </div>
        </div>
    )
}
export default Audioplayer;