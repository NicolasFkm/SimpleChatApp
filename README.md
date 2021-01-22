# Simple Chat App

This application uses [Socket.IO](https://socket.io/) to implement a simple real-time chat feature. The chat creates rooms based on the URI. The user doesn't need to create an account or login in the application, just type the room name and it's ready to be used.

The original idea of this app was to make quick chats without any personal information.


## How to use

### Requirements:
* NodeJS installed

### Running the app

Clone or download the project in your machine, open the solution root folder and run the following commands:

```
npm install
npm run start
```

You can access the application at localhost:3000, you just need to enter the room name (or type in the url bar: chat/ROOMNAME).


## TODO List
* Save messages in the database;
* Add list of users in the chat;
* React front-end, currently simple interface with pug view engine.