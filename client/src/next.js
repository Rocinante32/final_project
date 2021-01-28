import axios from "./axios";
import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
const { APIKey } = process.env;

export default function NextMatch() {
    const [matches, setMatches] = useState([]);
    const [nextMatches, setNextMatches] = useState([]);
    const [pageView, setPageView] = useState(false);

    var todayDate = new Date().toISOString().slice(0, 10);
    var fortnightAway = new Date(Date.now() + 12096e5)
        .toISOString()
        .slice(0, 10);
    console.log(
        "todays date: ",
        todayDate,
        " date in 2 weeks: ",
        fortnightAway
    );

    useEffect(() => {
        console.log("useEffect running ");
        axios
            .get(
                `https://apiv2.apifootball.com/?action=get_events&from=${todayDate}&to=${fortnightAway}&league_id=149&team_id=2696&APIkey=${APIKey}`
            )
            .then((response) => {
                console.log("API call complete", response.data);
                setMatches(response.data);
                setNextMatches(response.data.slice(1));
                // console.log("state: ", teams);
                if (window.location.pathname === "/upcoming") {
                    setPageView(true);
                }
            });
    }, []);
    console.log("state: ", matches[0]);
    console.log("netx games 2: ", nextMatches);

    return (
        <>
            <div>
                <h2 className="center-text">Next Matches</h2>
                {matches.length && (
                    <Paper elevation={8} className="next-card">
                        <div className="club-next">
                            <div className="club-badge">
                                <img src={matches[0].team_home_badge}></img>
                                <h2>{matches[0].match_hometeam_name}</h2>
                            </div>
                            <div className="club-badge">
                                <img src={matches[0].team_away_badge}></img>
                                <h2>{matches[0].match_awayteam_name}</h2>
                            </div>
                        </div>

                        <h3 className="centre-text">
                            {matches[0].match_date} at {matches[0].match_time}{" "}
                        </h3>
                        <span className="logo-span">
                            <img
                                className="championship-logo"
                                src="/championship-logo.png"
                            ></img>
                        </span>
                        <h3 className="centre-text">
                            {matches[0].match_stadium}
                        </h3>
                        {/* <img src={matches[0].league_logo}></img> */}
                    </Paper>
                )}
            </div>
            {pageView && (
                <div>
                    {nextMatches.map((match) => (
                        // <Paper key={match.match_id}>
                        //     <h3>
                        //         {match.match_hometeam_name} vs{" "}
                        //         {match.match_awayteam_name}
                        //     </h3>
                        //     <h4>{match.match_time}</h4>
                        //     <h4>{match.match_date}</h4>
                        // </Paper>
                        <Paper
                            elevation={8}
                            key={match.match_id}
                            className="next-card"
                        >
                            <div className="club-next">
                                <div className="club-badge">
                                    <img src={match.team_home_badge}></img>
                                    <h2>{match.match_hometeam_name}</h2>
                                </div>
                                <div className="club-badge">
                                    <img src={match.team_away_badge}></img>
                                    <h2>{match.match_awayteam_name}</h2>
                                </div>
                            </div>

                            <h3 className="centre-text">
                                {match.match_date} at {match.match_time}{" "}
                            </h3>
                            <span className="logo-span">
                                <img
                                    className="championship-logo"
                                    src="/championship-logo.png"
                                ></img>
                            </span>
                            <h3 className="centre-text">
                                {match.match_stadium}
                            </h3>
                            {/* <img src={matches[0].league_logo}></img> */}
                        </Paper>
                    ))}
                </div>
            )}
        </>
    );
}
