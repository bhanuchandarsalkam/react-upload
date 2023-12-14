import React from "react";
import "./style.css";
const Inputcomponent=({type,placeholder,state,setState})=>{

    return(
        <div>
            <input type={type}
            placeholder={placeholder}
            value={state}
            onChange={(e)=>setState(e.target.value)}
            required={true}
            className="custom-input"/>
        </div>
    )
}
export default Inputcomponent;