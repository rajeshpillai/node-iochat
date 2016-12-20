var express = require("express"),
    app = express(),
    server = require("http").createServer(app);

var io = require("socket.io").listen(server);

users = [];
connections = [];

var port = process.env.PORT || 9999;

server.listen(port, function (){
    console.log(`Server running on {{port}}`);
});

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", function (socket){
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);


    socket.on("disconnect", function (data) {

        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();

        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s sockets connected", connections.length);
    })

    socket.on("send message", function (data) {
        console.log(data);
        io.sockets.emit("new message", {msg: data, user: socket.username});
    })

    // New users
    socket.on("new user", function (data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    })

    function updateUsernames(){
        io.sockets.emit("get users", users);
    }
});





