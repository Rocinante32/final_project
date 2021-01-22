import axios from "./axios";
const secrets = require("../../secrets.json");

export async function getLeague() {
    const { data } = await axios.get(
        `https://apiv2.apifootball.com/?action=get_standings&league_id=149&APIkey=${secrets.APIKey}`
    );
    console.log("from actions.js: ", data);
    // return {
    //     type: "GET_LIST",
    //     teams: data.users,
    // };
}
