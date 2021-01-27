import axios from "./axios";
import React, { useState, useEffect } from "react";
const { APIKey } = require("../../secrets.json" || process.env.APIKey);

export default function LeagueTable() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        console.log("useEffect running ");
        axios
            .get(
                `https://apiv2.apifootball.com/?action=get_standings&league_id=149&APIkey=${APIKey}`
            )
            .then((response) => {
                console.log("API call complete", response.data);
                setTeams(response.data);
                console.log("state: ", teams);
            });
    }, []);
    console.log("state: ", teams);

    return (
        <div>
            <table className="table">
                <caption>Championship Table</caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>MP</th>
                        <th>Won</th>
                        <th>Drew</th>
                        <th>Lost</th>
                        <th>For</th>
                        <th>Against</th>
                        <th>Diff</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr key={team.team_id}>
                            <td>{team.overall_league_position}</td>
                            <td>{team.team_name}</td>
                            <td>{team.overall_league_payed}</td>
                            <td>{team.overall_league_W}</td>
                            <td>{team.overall_league_D}</td>
                            <td>{team.overall_league_L}</td>
                            <td>{team.overall_league_GF}</td>
                            <td>{team.overall_league_GA}</td>
                            <td>
                                {team.overall_league_GF -
                                    team.overall_league_GA}
                            </td>
                            <td>{team.overall_league_PTS}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
