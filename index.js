const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
// set-up cookie parser
app.use(cookieParser());

// Flash messages
const flash = require('connect-flash');
const customMware = require('./config/customMware');

// to use session and passport for authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-Oauth');

// use mongo to store session cookie permanantly
const MongoStore = require('connect-mongo');

// middleware use to get the form data in req.body as an object
app.use(express.urlencoded());

// below two lines is to tell server that we are using 
// layouts to render pages using express-ejs-layouts library
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// telling server that we are using static file and all are in assets folder
app.use(express.static('./assets'));
// To display avatars on profile page
app.use('/uploads' , express.static('./uploads'));
// to attach assets to individual redered file.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// setting up my view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    secret: 'anythingForNow',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 30)
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://127.0.0.1/codeial_development',
            autoRemove : 'disabled'
        },
        function(err){
            console.log('error in connecting to mongodb to store session cookie' , err)
        })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// we are using separate route folder to handle browser requets (url) hence imported it.
const route = require('./routes');
// Using middleware to sent browser request to route folder to handle it
app.use('/', route); // we can directly use "app.use('/', require('./routes/home_route'));"


app.listen(port, function (err) {
    if (err) {
        console.log(`Error while starting the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
})