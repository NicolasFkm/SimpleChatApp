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
        window.localStorage.setItem('roomId', response.data.id);
    });

    await saveUserName();

    await fetchRoomMessages();

    $('form.chat-box').submit(async function (e) {
        e.preventDefault();

        if ($('#message').val() == "" || $('#message').val() == null) {
            return false;
        }

        let message = $('#message').val();
        
        console.log("Submit message");
        
        await fetch('/message', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: message, userId: window.localStorage.getItem('userId'), chatRoomId: window.localStorage.getItem('roomId')})
        })
        .then(response => response.json())
        .then(response => {
            console.log("Reponse: ", response);
            let userId = window.localStorage.getItem('userId');
            let username = window.localStorage.getItem('username');
            
            socket.emit('chat message', { message: message, user: {userId, username} });
                $('#message').val('');
            })
        return false;
    });

    socket.on('chat message', function (msg) {
        let userId = window.localStorage.getItem('userId');
        const message = BuildMessageElement(msg.message, msg.user.userId, userId, msg.user.username);
        $('#history').append(message);

        const objDiv = document.getElementById("history");
        objDiv.scrollTop = objDiv.scrollHeight;
    });
});

function BuildMessageElement(message, messageUserId, userId, username) {
    const container = $('<div>').addClass("message-container");
    const div = $('<div>').addClass("message-box");
    const user = $('<small>').text(`${username}: `);
    const messageElement = $('<p>').text(message);

    if (messageUserId == userId) {
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
        body: JSON.stringify({name: clientUsername, roomId: window.localStorage.getItem('roomId')})
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

async function fetchRoomMessages() {
    console.log("fetchRoomMessages [STARTED]");

    fetch(`${window.location.pathname}/message`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            let userId = window.localStorage.getItem('userId');
            console.log("response is", response.messages);

            if(response == undefined) return;

            response.messages.forEach(message => {                
                const messageElement = BuildMessageElement(message.text, message.User.id, userId, message.User.name);
                $('#history').append(messageElement);
            });
        });

}
