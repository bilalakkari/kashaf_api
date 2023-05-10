const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors())

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type']
    }
});

var count = 0

io.on('connection', function (socket) {
    count++
    io.emit('user_count', count)

    socket.on('disconnect', function () {
        count--
        io.emit('user_count', count)
    })
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

http.listen(3000, function () {
    console.log("server is listening to port 3000")
})