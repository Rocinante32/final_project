const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const secrets = require("../secrets.json");

app.use(
    cookieSession({
        secret: `Even a bad pizza is a good pizza`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(
    express.urlencoded({
        extended: true,
    }),
    express.json()
);

app.use(compression());
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.get("/league-data", (req, res) => {
    console.log("req to league made");
    app.get(
        `https://apiv2.apifootball.com/?action=get_standings&league_id=149&APIkey=${secrets.APIKey}`,
        (req, res) => {
            console.log("api call: ", res);
        }
    ).then((response) => {
        console.log("API call complete, ", response);
    });
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
