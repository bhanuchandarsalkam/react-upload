import React from 'react';
import {Link,useLocation} from "react-router-dom";
import "./style.css";
const Header=()=>{
 const location=useLocation();
 const currentpath=location.pathname;
 //console.log(currentpath);
    return(
        <div className="navbar">
          <div className="gradient">

          </div>
       <div className="links">
        <Link to="/signup" className={currentpath=="/signup"?"active":""}>signup</Link>
        <Link to="/podcasts" className={currentpath=="/podcast"?"active":""}>podcast</Link>
        <Link to="/create-a-podcast" className={currentpath=="/create-a-podcast"?"active":""}>Start A podcast</Link>
        <Link to="/profile" className={currentpath=="/profile"?"active":""}>Profile</Link>
       </div>
        </div>
    )
}
export default Header;                                                                                                                                                          