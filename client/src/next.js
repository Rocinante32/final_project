import axios from "./axios";
import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
const { APIKey } = process.env;

export default function NextMatch() {
    const [matches, setMatches] = useState([]);

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
                // console.log("state: ", teams);
            });
    }, []);
    console.log("state: ", matches[0]);

    return (
        <>
            <h1>Hello from next match</h1>
            <div>
                <h2>Next Match</h2>
                {matches.length && (
                    <Paper className="next-card">
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
        </>
    );
}
