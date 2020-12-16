$(function () {
    var socket = io();
    
    $('form.chat-box').submit(function (e) {
        e.preventDefault();
        socket.emit('chat message', $('#message').val());
        $('#message').val('');
        return false;
    });

    socket.on('chat message', function (msg) {
        $('.history').append($('<li>').text(msg));
    });
});