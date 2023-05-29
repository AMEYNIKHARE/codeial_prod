
module.exports.chatsockets = function(chatServer){
    let io = require('socket.io')(chatServer, {
        cors: {
          origin: ["http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:8000/", "http://127.0.0.1:8000/"],
          allowedHeaders: ["my-custom-header"],
          credentials: true
        }
      });

    io.on('connection' , function(socket){
        // console.log('New socket connection received! ' , socket.id);

        socket.on('disconnect' , function(){
            // console.log('Socket disconnected!!!');
        });

        socket.on('join_room' , function(data){
            // console.log('joining request received...' , data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined' , data);
        });

        socket.on('sent_message' , function(data){
            io.in(data.chatroom).emit('receive_message' , data);
        });

    });

}