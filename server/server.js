const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
// const secrets = require("../secrets.json");

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

var users = [];

io.on("connection", function (socket) {
    // if (!socket.request.session) {
    //     console.log("socket disconnected: ", socket.id);
    //     return socket.disconnect(true);
    // }
    let connectedUsersCount = Object.keys(io.sockets.sockets).length;
    console.log("no of users connected: ", connectedUsersCount);

    socket.on("username", (username) => {
        console.log("users: ", users);
        if (users.includes(username)) {
            console.log("error as name already in use");
        } else {
            console.log("username added: ", username);
            socket.username = username;
            socket.request.session.username = username;
            users.push(username);
            console.log("users after add ", users, "no online: ", users.length);
        }
    });

    socket.on("chat_message", (data) => {
        // console.log("new chat msg: ", data);
        io.emit("chat_message", data);
    });

    socket.on("disconnect", (reason) => {
        console.log("reason fo disc: ", reason);
        if (socket.username) {
            console.log("user is d/c: ", socket.username);
            const userIdx = users.indexOf(socket.username);
            users.splice(userIdx, 1);
        } else {
            console.log(
                "socket disconnect: ",
                socket.id,
                "name: ",
                socket.username
            );
        }
        console.log("users after splice: ", users);
        // return socket.disconnect(true);
    });
});

io.on("connection", (socket) => {
    console.log(
        `socket with id ${socket.id} and user id: ${socket.username} just connected!`
    );
    console.log("socket.request.session: ", socket.request.session);
    console.log("users online: ", users, "num: ", users.length);
});
