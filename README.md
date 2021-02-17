# Simple Chat App

This application uses [Socket.IO](https://socket.io/) to implement a simple real-time chat feature. The chat creates rooms based on the URI. The user doesn't need to create an account or login in the application, just type the room name and it's ready to be used.

The original idea of this app was to make quick chats without any personal information, just for fun and keeping only the recent data in the chat history.


## How to use

### Requirements:
* Docker installed
* .env file configured with the following keys:
    * DATABASE_HOST
    * DATABASE_USERNAME
    * DATABASE_PASSWORD
    * DATABASE_ROOT_PASSWORD
    * DATABASE_PORT
    * DATABASE_DB
    * PORT

### Running the app

Clone or download the project in your machine, open the solution root folder and run the following command in the root folder:

```
docker-compose up -d --build
```

You can access the application at localhost:3000 (or the port configured in the .env file), you just need to enter the room name (or type in the url bar: chat/ROOMNAME).


## TODO List
* Add list of users in the chat;
* React front-end, currently simple interface with pug view engine.