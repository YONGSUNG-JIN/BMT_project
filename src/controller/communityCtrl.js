const express = require('express');
const app = express();
const formatMessage = require('../utils/messages');
const chatUsers = require('../utils/chatUsers');

const viewCommunity = (req, res) => {
    res.render('community.ejs')
}

const viewChat = (req, res) => {
    res.render('communityChat.ejs')
    const io = req.app.get('socketio');
    io.on('connection', (socket) => {
        socket.on('joinRoom', ({ username, room }) => {
            const user = chatUsers.userJoin(socket.id, username, room);
            socket.join(user.room);
            // to a single client who just joined
            socket.emit('message', formatMessage("", "Good Day"));
            //When a user connects, informs to the existing users
            socket.broadcast
                .to(user.room)
                .emit('message', formatMessage('', `${user.username} has joined the chat`));
            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: chatUsers.getRoomUsers(user.room),
            }); 
        })

        //Listen for chat message
        socket.on('chatMessage', (message) => {
            const user = chatUsers.getCurrentUser(socket.id);
            io.to(user.room).emit('message', formatMessage(user.username, message));
        });
          // Runs when client disconnects
        socket.on('disconnect', () => {
            const user = chatUsers.userLeave(socket.id);
            if (user) {
                io.to(user.room).emit('message', formatMessage('', `${user.username} has left the chat`)
                );
                //Send users info in the room
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: chatUsers.getRoomUsers(user.room)
                });
            }
        })
    })
}

const postChat = (req, res) => {


    //     io.on('connection', (socket) => {
    //         socket.on('joinRoom', ({ username, room }) => {
    //             const user = chatUsers.userJoin(socket.id, username, room);
    //             socket.join(user.room);
    //             socket.emit('message', formatMessage("", "Good Day")); // to a single client ??????
    //             // socket.broadcast.emit('message', "Good Day"); // ?????? ?????? ?????? ?????? ??????????????? ??????
    //             // io.emit('message', "Good Day"); // ?????? ??????????????? ??????
    //             // When a user connects
    //             socket.broadcast
    //                 .to(user.room)
    //                 .emit('message', formatMessage('', `${user.username} has joined the chat`));
    //             //Send users info in the room
    //             io.to(user.room).emit('roomUsers', 
    //             {
    //                 room: user.room,
    //                 users: chatUsers.getRoomUsers(user.room)
    //             }
    //             )


    //         //Listen for chat message
    //         socket.on('chatMessage', (message) => {
    //             const user = chatUsers.getCurrentUser(socket.id);
    //             io.to(user.room).emit('message', formatMessage(user.username, message));
    //         })
    //         // When a client disconnects
    //         socket.on('disconnect', () => {
    //             const user = chatUsers.userLeave(socket.id);
    //             if(user){
    //                 io.to(user.room).emit('message', formatMessage('', `${user.username} has left the chat`));
    //                 //Send users info in the room
    //                 io.to(user.room).emit('roomUsers', {
    //                 room: user.room,
    //                 users: chatUsers.getRoomUsers(user.room)
    //             });
    //             }
    //         })

    //         })
    // })
}

module.exports = { viewCommunity, viewChat, postChat }