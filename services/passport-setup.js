const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../models/authModel');

require('dotenv').config();
passport.use(
    new GoogleStrategy(
        {
            //options for the google strategy
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:200/auth/google/callback',
            //though it is not a must but it is a good practice
            passReqToCallback: true,
        },
        (request, accessToken, refreshToken, profile, done) => {
            //console.log(profile);
            //chec in if user already exists in databse
            User.findOne({ googleId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    //already have a user
                    console.log('user is:', currentUser);
                    done(null, currentUser);
                } else {
                    //if not, create user in our db
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        thumbnail: profile.photos,
                    })
                        .save()
                        .then((newUser) => {
                            console.log('new User created:' + newUser);
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
