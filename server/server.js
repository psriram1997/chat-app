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
    socket.emit('newMessage',{
        from:"Admin",
        text: "Welcome to our community",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from:"Admin",
        text: "New user joined",
        createdAt: new Date().getTime()
    });
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    });

    socket.on('createMessage', function(message){
        io.emit('newMessage',{
            from : message.from,
            text : message.text,
            createdAt: new Date().getTime()
        });
    });
});

server.listen(port,() => {
console.log(`server started on port ${port}`);
});