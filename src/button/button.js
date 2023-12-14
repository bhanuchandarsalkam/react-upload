import React from 'react';
import "./style.css";
const Button=({text,onClick,disabled,style})=>{

    return(
        <div onClick={onClick} className="btn" disabled={disabled} style={style}>
           {text}
        </div>
    )
}
export default Button;