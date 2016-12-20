var express = require("express"),
    app = express(),
    server = require("http").createServer(app);

var io = require("socket.io").listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 9999, function (){
    console.log("Server running on 9999");
});

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
})