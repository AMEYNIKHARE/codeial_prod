const express = require('express');
const port = 8000;
const app = express();
// we are using separate route folder to handle browser requets (url) hence imported it.
const route = require('./routes/index'); 
// Using middleware to sent browser request to route folder to handle it
app.use('/' , route);  

// setting up my view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');



app.listen(port, function(err){
    if(err){
        console.log(`Error while starting the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
})