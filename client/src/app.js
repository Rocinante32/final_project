import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import NavBar from "./navbar";
import LeagueTable from "./leaguetable";
import Chat from "./chat";
import VideoPlayer from "./highlights";
import Welcome from "./welcome";
import Footer from "./footer";
import NextMatch from "./next";
import { Timeline } from "react-twitter-widgets";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Route exact path="/table" render={() => <LeagueTable />} />
                <Route exact path="/videos" render={() => <VideoPlayer />} />
                <Route exact path="/chat" render={() => <Chat />} />
                <Route exact path="/" render={() => <Welcome />} />
                <Route exact path="/upcoming" render={() => <NextMatch />} />
                <Link to="/upcoming" className="no-text-dec">
                    <Route exact path="/" render={() => <NextMatch />} />
                </Link>

                <div className="welcome-widgets">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Timeline id="twitter-box"
                                dataSource={{
                                    sourceType: "profile",
                                    screenName: "Coventry_City",
                                }}
                                options={{
                                    height: "600",
                                    width: "500",
                                }}
                            />
                        )}
                    />
                </div>

                <Footer />
            </div>
        </BrowserRouter>
    );
}
