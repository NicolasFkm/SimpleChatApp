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

        const div = $('<div>').addClass("message-box");
        const message = $('<p>').text(msg.message);

        if(msg.username == username){
            message.addClass("sent");
        }
        div.append(message);
        $('#history').append(div);
        var objDiv = document.getElementById("history");
        objDiv.scrollTop = objDiv.scrollHeight;
    });
});