const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {;

    const user = await User.findOne({ email: email });
    if (!user) {
        //done(error, usuario, {message: 'mensaje'})
        return done(null, false, { message: 'Usuario no existe' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Error en los datos proporcionados' });
        }
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});