const socket = io();
socket.on('connect',function(){
     console.log('connected to server');
     
});
socket.on('disconnect',function(){
    console.log('disconnected from server');
});

socket.on('newMessage', function(msg){
    console.log('message',msg);
});

// socket.emit('createMessage',{
//     from : "client",
//     text: "how do you do?"
//  });