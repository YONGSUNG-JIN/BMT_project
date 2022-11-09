const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const socketio = require('socket.io');
// const io = socketio(server);

const formatMessage = require('../utils/messages');
const chatUsers = require('../utils/chatUsers');
const socketFunc = socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = chatUsers.userJoin(socket.id, username, room);
        socket.join(user.room);
        socket.emit('message', formatMessage("", "Good Day")); // to a single client 알림
        // socket.broadcast.emit('message', "Good Day"); // 접속 유저 이외 모든 사용자에게 알림
        // io.emit('message', "Good Day"); // 모든 사용자에게 알림
        // When a user connects
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage('', `${user.username} has joined the chat`));
        //Send users info in the room
        io.to(user.room).emit('roomUsers', 
        {
            room: user.room,
            users: chatUsers.getRoomUsers(user.room)
        }
        )

        
    //Listen for chat message
    socket.on('chatMessage', (message) => {
        const user = chatUsers.getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, message));
    })
    // When a client disconnects
    socket.on('disconnect', () => {
        const user = chatUsers.userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage('', `${user.username} has left the chat`));
                    //Send users info in the room
            io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: chatUsers.getRoomUsers(user.room)
        });
        }
    })

    })
}




module.exports = socketFunc;