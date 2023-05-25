console.log('entertred');

class chatEngine{

    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        
        this.socket = io.connect('http://127.0.0.1:5000');

        if(this.userEmail){
            this.connectHandler();
        }
    }

    connectHandler(){

        const self = this;
        this.socket.on('connect' , function(){
            console.log('Connection established using sockets...');

            self.socket.emit('join_room' , {
                user_email : self.userEmail,
                chatroom : 'codeial'
            });

            self.socket.on('user_joined' , function(data){
                console.log('s user joined! ' , data);
            });

            $('#chat-button').click(function(){

                let msg = $('#chat-text').val();

                if(msg != ''){
                    self.socket.emit('sent_message' , {
                        message : msg,
                        user_email : self.userEmail,
                        chatroom : 'codeial'
                    });
                }
            });

            self.socket.on('receive_message', function(data){
                console.log('Message received...' , data.message);

                var newMesssage;
                if(data.user_email == self.userEmail){
                    newMesssage = $(`<p class="user-chat">${data.message}</p>`);
                }
                else{
                    newMesssage = $(`<p class="other-user-chat">${data.message}</p>`);
                }

                $('#chats').append(newMesssage);
                
            });
        });

    }
}