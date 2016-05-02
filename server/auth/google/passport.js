var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      //console.log(profile);
      User.findOne({
        email: profile.emails[0].value
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            role: 'user',
            username: profile.username,
            avatar: profile.photos[0].value,
            email: profile.emails[0].value,
            provider: 'google',
            google: profile._json
          });
          user.save(function(err) {
            if (err) return done(err);
            done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
