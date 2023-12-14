import React from "react";
import "./style.css";
function Loadingpage(){

    return(
        <div className="loader">
        <div className="lds-ripple">
           <div></div>
           <div></div>
        </div>
        </div>
    )
}
export default Loadingpage;