import axios from "./axios";
import React, { useState, useEffect } from "react";

export default function VideoPlayer() {
    return (
        <div id="video-backgnd">
            <img src="/grassDARk.jpg"></img>
            <h1>2020/2021 Match Highlights</h1>
            <div className="video-container">
                <iframe
                    width="720"
                    height="405"
                    src="https://www.youtube.com/embed/?listType=playlist&list=PLlaOP6_OjSjFqAl-nZJRHnHM9VccWs_v_"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    );
}

// https://youtube.com/playlist?list=PLlaOP6_OjSjFqAl-nZJRHnHM9VccWs_v_
