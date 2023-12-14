import React,{useState} from 'react';
import "./style.css";
const Fileinput=({accept,id,filefunc,text})=>{
    const [fileselected,setFileselected]=useState("");
const display=(e)=>{
console.log(e.target.files)
setFileselected(e.target.files[0].name);
filefunc(e.target.files[0]);
}
    return(
        <>
     <label htmlFor={id} className="file-input">{fileselected?`the file ${fileselected} was selected`:text}</label>
     <input type="file" accept={accept} id={id} style={{display:"none"}} onChange={display}/>
        </>
    )
}
export default Fileinput;