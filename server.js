// Set up our packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apiRoute = require('./server/route');
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
// Import Facebook and Google OAuth apps configs
import { facebook, google } from './config';

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformFacebookProfile = (profile) => {
    return {
        name: profile.name,
        id: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        avatar: profile.picture.data.url,
        email: profile.email
    }
}

// Transform Google profile into user object
const transformGoogleProfile = (profile) => ({
  name: profile.displayName,
  avatar: profile.image.url,
});

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook,
  // Gets called when user authorizes access to their profile    // Return done callback and pass transformed user object
  // Return done callback and pass transformed user object
  async (accessToken, refreshToken, profile, done) => done(null, transformFacebookProfile(profile._json))
));

// Register Google Passport strategy
passport.use(new GoogleStrategy(google,
  async (accessToken, refreshToken, profile, done) => done(null, transformGoogleProfile(profile._json))
));

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

// Set up Google auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

// Connect to our database
mongoose.connect('mongodb://sabhab1:ramanar1@ds027618.mlab.com:27618/hello_node');

app.use(express.static('build'))

// Configure body-parser
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


// Set our port
var port = 8080;

// Prefix our routes with with /simple-api
app.use('/api', apiRoute);

console.log('Listening ', port);
// START THE SERVER
app.listen(port);