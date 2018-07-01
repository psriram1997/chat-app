const socket = io();
socket.on('connect',function(){
     console.log('connected to server');
     
});
socket.on('disconnect',function(){
    console.log('disconnected from server');
});

function scrollToBottom(){
    const messages = $('#messageBox');
    const newMessage = messages.children('li:last-child');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();
    const scrollHeight = messages.prop('scrollHeight');
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    if(scrollHeight <= clientHeight + scrollTop + newMessageHeight + lastMessageHeight){
        messages.scrollTop(scrollHeight);
    }
    
}

socket.on('newMessage', function(msg){
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var rendered = Mustache.render(template,{
       from : msg.from,
       createdAt : formattedTime,
       text : msg.text 
    });
    $('#messageBox').append(rendered);
    scrollToBottom();
    
    // const liEl = $('<li></li>').text(`${msg.from} ${formattedTime} : ${msg.text}`);
    // $('#messageBox').append(liEl);
});

socket.on('newLocationMessage', function(msg){
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const template = $('#location-message-template').html();
    const rendered = Mustache.render(template,{
       from : msg.from ,
       createdAt : formattedTime,
        url : msg.url
    });
    // const liEl = $('<li></li>').text(`${msg.from} ${formattedTime} :`);
    // const aEl  = $('<a target="_blank">My current location</a>');
    // aEl.attr('href',msg.url);
    // liEl.append(aEl);
    $('#messageBox').append(rendered);
    scrollToBottom();
});

$('form').on('submit',function(e){
    e.preventDefault();
    let text = e.target.elements.text.value
    socket.emit('createMessage',{
        from : 'User',
        text : text
    },function(){
        e.target.elements.text.value = '';
    })
    
});

$('#location-button').on('click',function(e){
    if(!navigator.geolocation){
        return alert('Your browser doesn\'t support geo-location');
    }
    e.target.disabled = true;
    e.target.innerText = "sending location...";
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            from : 'User',
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        },function(){
   
        });
        
        e.target.disabled = false;
        e.target.innerText = "send location";
    },function(){
        alert('unable to fetch geo location');
        e.target.disabled = false;
        e.target.innerText = "send location";
    })
});

