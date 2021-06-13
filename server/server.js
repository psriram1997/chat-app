const path = require('path');
const express = require('express');
const app     = express();
const http    = require('http');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    socket.emit('newMessage',generateMessage('Admin','Welcome to this group'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    });

    socket.on('createMessage', function(message,callback){
        callback();
        console.log("Message is : ", message.text);
        io.emit('newMessage',generateMessage(message.from,message.text));
    });

    socket.on('createLocationMessage',function(message,callback){
        callback();
        console.log('create location',message);
        io.emit('newLocationMessage',generateLocationMessage(message.from,message.latitude,message.longitude));
    });
});

server.listen(port,() => {
console.log(`server started on port ${port}`);
});