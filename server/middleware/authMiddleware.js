const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require("../models/userModel.js");


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACKURL,
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                // Check if user exists in the database
                let user = await User.findOne({ username: profile.username });

                if (user) {
                    // If user exists, update the access token
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;
                    await user.save();
                } else {
                    // If user does not exist, create a new user
                    user = new User({
                        name: profile.displayName,
                        username: profile.username,
                        profileUrl: profile.profileUrl,
                        avatarUrl: profile.photos[0].value,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        reviews: [],
                    });
                    await user.save();
                }

                // Return user through the done callback
                done(null, user);
            } catch (error) {
                console.error('Error during authentication:', error);
                done(error, null);
            }
        }
    )
);

