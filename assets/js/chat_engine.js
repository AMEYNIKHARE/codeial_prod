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
        this.socket.on('connect' , function(){
            console.log('Connection established using sockets...');
        });
    }
}