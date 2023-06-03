class chatEngine{

    constructor(chatBoxId, userEmail, userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;
        
        this.socket = io('http://16.170.212.60:3000');

        if(this.userEmail){
            this.connectHandler();
        }
    }

    connectHandler(){

        const self = this;
        this.socket.on('connect' , function(){
            // console.log('Connection established using sockets...');

            self.socket.emit('join_room' , {
                user_name : self.userName,
                user_email : self.userEmail,
                chatroom : 'codeial'
            });

            self.socket.on('user_joined' , function(data){
                // console.log('New User joined! ', data);
            });

            $('#chat-button').click(function(){

                let msg = $('#chat-text').val();
                $('#chat-text').val('');

                if(msg != ''){
                    self.socket.emit('sent_message' , {
                        message : msg,
                        user_email : self.userEmail,
                        user_name : self.userName,
                        chatroom : 'codeial'
                    });
                }
            });

            self.socket.on('receive_message', function(data){
                // console.log('Message received...' , data.message);

                var newMesssage;
                if(data.user_email == self.userEmail){
                    newMesssage = $(`<p class="user-chat"> You : ${data.message}</p>`);
                }
                else{
                    const name = data.user_name.split(" ")[0];
                    newMesssage = $(`<p class="other-user-chat">${name} : ${data.message}</p>`);
                }

                $('#chats').append(newMesssage);
                var myDiv = $('#chats');
                myDiv.scrollTop(myDiv[0].scrollHeight);
            });
        });

    }
}