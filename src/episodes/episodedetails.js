import React from "react";
import Button from "../button/button.js";
function Episodedetails({index,title,description,audioFile,onClick}){

    return(
        <div style={{width:"100%"}}>
        <p style={{textAlign:"left" ,marginBottom:0}}>{index}.{title}</p>
        <p style={{marginLeft:"1.5rem"}} className="podcast-description">{description}</p>
        <Button text={"play"} onClick={()=>onClick(audioFile)} width="50px"/>
        </div>
    )
}
export default Episodedetails;