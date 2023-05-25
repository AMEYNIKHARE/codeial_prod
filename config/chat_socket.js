
module.exports.chatsockets = function(chatServer){
    let io = require('socket.io')(chatServer);
    // console.log('entertred');

    io.sockets.on('connection' , function(socket){
        console.log('New socket connection received! ' , socket.id);

        socket.on('disconnect' , function(){
            console.log('Socket disconnected!!!');
        });
    });
}