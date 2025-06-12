const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');

const host = "localhost";
const port = process.env.PORT || 8085;
const http = require("http").Server(app);
const io = require("socket.io")(http/* , {
    cors: {
        origin: "https://the-code.dev",
        methods: ["GET", "POST"]
    }
} */);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", (socket) => {
    socket.join("support");

    socket.on("suscribe", data => {
        socket.leave(data.prev_channel);
        socket.join(data.channel);
    });

    socket.on("message", data =>{
        socket.to("support").emit("message", data);
        socket.to(data.channel).emit("message", data);
        io.emit("message", data);
        console.log(data)
    });

});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/modules/chat/index.html'));
});

app.get("/test/:message", (req, res) => {

    let data = {fromID: "s45er3s5fgr", text: req.params.message, idColor: "#a4f9f7"};

    io.emit("message", data);
    res.send("hello. Test send");

});


http.listen(port, () =>
    console.log(`Listening on http://${host}:${port}/`)
);
