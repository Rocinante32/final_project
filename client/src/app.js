import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import NavBar from "./navbar";
import LeagueTable from "./leaguetable";
import Chat from "./chat";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <NavBar />

                {/* <LeagueTable /> */}
                <Route exact path="/chat" render={() => <Chat />} />
            </div>
        </BrowserRouter>
    );
}
