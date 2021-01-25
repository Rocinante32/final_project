const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const secrets = require("../secrets.json");

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

const cookieSessionMiddleware = cookieSession({
    secret: `Even a bad pizza is a good pizza`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

//////////////// Chat/Socket.io Routes /////////////////

// io.on("connection", function (socket) {
//     if (!socket.request.session) {
//         return socket.disconnect(true);
//     }

//     // db.findLastMessages().then(({ rows }) => {
//     //     for (let i = 0; i < rows.length; i++) {
//     //         rows[i].created_at = rows[i].created_at.toLocaleString();
//     //     }
//     //     rows = rows.reverse();
//     //     socket.emit("10 most recent messages", rows);
//     // });

//     // const user_id = socket.request.session.userId;
// });

io.on("connection", (socket) => {
    console.log(
        `socket with id ${socket.id} and user id: ${socket.request.session.userId} just connected!`
    );
    console.log(
        "socket.request.session.userId: ",
        socket.request.session.userId
    );
});
