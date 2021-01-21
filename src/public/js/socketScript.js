$(function () {
    const socket = io({query: `room=${window.location.pathname}`});
    let clientUsername = "";

    do
    {
        console.log(clientUsername);
        clientUsername = prompt("What's your name?")
    }
    while(clientUsername.trim() == "");

    window.localStorage.setItem('username', clientUsername);

    $('form.chat-box').submit(function (e) {
        e.preventDefault();

        let username = window.localStorage.getItem('username');
        
        if($('#message').val() == "" || $('#message').val() == null){
            return false;
        }
        
        socket.emit('chat message', { message: $('#message').val(), username});
        $('#message').val('');
        return false;
    });
    
    socket.on('chat message', function (msg) {
        let clientUsername = window.localStorage.getItem('username');
        const message = BuildMessageElement(msg.message, msg.username, clientUsername);
        $('#history').append(message);

        const objDiv = document.getElementById("history");
        objDiv.scrollTop = objDiv.scrollHeight;
    });
});

function BuildMessageElement(message, username, clientUsername){
    const container = $('<div>').addClass("message-container"); 
    const div = $('<div>').addClass("message-box");
    const user = $('<small>').text(`${username}: `);
    const messageElement = $('<p>').text(message);
    
    if(username == clientUsername){
        div.addClass("sent");
    }
    else{
        div.append(user);
    }
    div.append(messageElement);
    container.append(div)

    return container;
}