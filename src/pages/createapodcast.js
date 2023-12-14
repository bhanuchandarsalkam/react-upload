import React from "react";
import Startpodcastpage from "../podcastpage/startpodcastpage.js";
import Header from "../header/header.js";
const Createapodcast=()=>{

    return(
        <div>
            <Header/>
            <div className="wrapper">
            <h1 className="bhanu">createapodcast</h1>
            <Startpodcastpage/>
            </div>
        </div>
    )
}
export default Createapodcast;