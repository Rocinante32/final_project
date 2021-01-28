import React, { useState } from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

export default function NavBar() {
    return (
        <div id="navbar">
            <Link to="/" id="logo-link">
                <img id="navbar-logo" src="/coventry.png"></img>
            </Link>
            <h3 id="title-nav">Sky Blues Fanzone</h3>
            <div id="navlinks">
                <Button
                    color="inherit"
                    className="button"
                    component={Link}
                    to="/table"
                >
                    league
                </Button>
                <Button
                    color="inherit"
                    className="button"
                    component={Link}
                    to="/chat"
                >
                    chat
                </Button>
                <Button
                    color="inherit"
                    className="button"
                    component={Link}
                    to="/videos"
                >
                    videos
                </Button>
            </div>
        </div>
    );
}
