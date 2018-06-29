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

socket.on('newLocationMessage', function(msg){
    const liEl = $('<li></li>').text(`${msg.from}`);
    const aEl  = $('<a target="_blank">My current location</a>');
    aEl.attr('href',msg.url);
    liEl.append(aEl);
    $('#messageBox').append(liEl);
});

$('form').on('submit',function(e){
    e.preventDefault();
    let text = e.target.elements.text.value
    socket.emit('createMessage',{
        from : 'User',
        text : text
    },function(){
        console.log('message sent');
    })
    e.target.elements.text.value = '';
});

$('#locationButton').on('click',function(e){
    if(!navigator.geolocation){
        return alert('Your browser doesn\'t support geo-location');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position.coords.latitude,position.coords.longitude);
        socket.emit('createLocationMessage',{
            from : 'User',
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        },function(){
            console.log('create location event fired')
        });
    },function(){
        alert('unable to fetch geo location');
    })
});

// socket.emit('createMessage',{
//     from : "client",
//     text: "how do you do?"
//  });