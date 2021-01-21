$(function () {
    const socket = io();

    const username = prompt("What's your name?");
    
    $('form.chat-box').submit(function (e) {
        e.preventDefault();
        socket.emit('chat message', { message: $('#message').val(), username});
        $('#message').val('');
        return false;
    });

    socket.on('chat message', function (msg) {
        const container = $('<div>').addClass("message-container"); 
        const div = $('<div>').addClass("message-box");
        const user = $('<small>').text(`${msg.username}: `);
        const message = $('<p>').text(msg.message);
        
        if(msg.username == username){
            div.addClass("sent");
        }
        else{
            div.append(user);
        }
        div.append(message);
        container.append(div)
        $('#history').append(container);
        var objDiv = document.getElementById("history");
        objDiv.scrollTop = objDiv.scrollHeight;
    });
});