const express = require('express');
const app = express();
const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const connectdb = require('./config/db');
const passport = require('passport');
require('./services/passport-setup');
require('dotenv').config();
const cookieSession = require('cookie-session');
const expressLayout = require('express-ejs-layouts');

port = process.env.PORT || 200;

app.use(express.static('public'));
app.use(expressLayout);

//view engine
app.set('view engine', 'ejs');
app.set('layout', './layout/main');

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.cookieKey],
    })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//middleware
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

//routes
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});
// //callback routes for google to redirect to

//though it should be in the routes folder
// app.get('/google/callback', passport.authenticate('google'), (req, res) => {
//     res.send('you reached the callback url');
// });

const start = async () => {
    await connectdb(process.env.MONGODB_URL);
    console.log('db is connected');
    app.listen(port, () => console.log(`server running on port ${port}`));
};
start();
