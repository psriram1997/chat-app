const path = require('path');
const express = require('express');
const app     = express();
const http    = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('User connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    });

    socket.emit('newMessage',{
        from : "server",
        text : "Hello everyone",
        createdAt :new Date().getTime()
    });

    socket.on('createMessage', function(message){
        console.log('create message event',message);
    });
});

server.listen(port,() => {
console.log(`server started on port ${port}`);
});