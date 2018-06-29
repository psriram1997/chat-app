const socket = io();
socket.on('connect',function(){
     console.log('connected to server');
     
});
socket.on('disconnect',function(){
    console.log('disconnected from server');
});

socket.on('newMessage', function(msg){
    const liEl = $('<li></li>').text(`${msg.from} : ${msg.text}`);
    $('#messageBox').append(liEl);
});

$('form').on('submit',(e) => {
    e.preventDefault();
    let text = e.target.elements.text.value
    socket.emit('createMessage',{
        from : 'User',
        text : text
    },()=>{

    })
    e.target.elements.text.value = '';
});

// socket.emit('createMessage',{
//     from : "client",
//     text: "how do you do?"
//  });