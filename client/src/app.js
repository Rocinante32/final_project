import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import NavBar from "./navbar";
import LeagueTable from "./leaguetable";

export default function App() {
    return (
        <div>
            <NavBar />
            <h1>welcome to the fanzone</h1>
            {/* <LeagueTable /> */}
        </div>
    );
}
