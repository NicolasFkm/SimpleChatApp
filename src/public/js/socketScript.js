$(async function () {
    const socket = io({ query: `room=${window.location.pathname}` });

    fetch('/room', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: window.location.pathname})
    })
    .then(response => response.json())
    .then(response => {
        console.log("response", response.data);
        console.log("id ", response.data.id);
        console.log("Room created name");
        window.localStorage.setItem('roomId', response.data.id);
    });

    await saveUserName();

    $('form.chat-box').submit(async function (e) {
        e.preventDefault();

        if ($('#message').val() == "" || $('#message').val() == null) {
            return false;
        }

        let message = $('#message').val();
        
        await fetch('/message', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: message})
        })
            .then(response => response.json())
            .then(response => {
                let username = window.localStorage.getItem('username');
        
                socket.emit('chat message', { message: message, username });
                $('#message').val('');
            })
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

function BuildMessageElement(message, username, clientUsername) {
    const container = $('<div>').addClass("message-container");
    const div = $('<div>').addClass("message-box");
    const user = $('<small>').text(`${username}: `);
    const messageElement = $('<p>').text(message);

    if (username == clientUsername) {
        div.addClass("sent");
    }
    else {
        div.append(user);
    }
    div.append(messageElement);
    container.append(div)

    return container;
}


async function saveUserName() {
    var clientUsername = "";
    do {
        console.log(clientUsername);
        clientUsername = prompt("What's your name?")
    }
    while (clientUsername.trim() == "");

    await fetch('/user', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: clientUsername})
    })
        .then(response => response.json())
        .then(response => {
            let roomId = window.localStorage.getItem('roomId');
            window.localStorage.setItem('userId', response.data.id);
            window.localStorage.setItem('user', response.data);
            window.localStorage.setItem('username', response.data.name);

            fetch(`/room/${roomId}/user`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId: response.data.id})
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Added user to the room")
                })
        });

}