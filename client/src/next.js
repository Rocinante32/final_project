import axios from "./axios";
import React, { useState, useEffect } from "react";
const { APIKey } = process.env;

export default function NextMatch() {
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
                // setTeams(response.data);
                // console.log("state: ", teams);
            });
    }, []);
    // console.log("state: ", teams);

    return (
        <>
            <h1>Hello from next match</h1>
        </>
    );
}
