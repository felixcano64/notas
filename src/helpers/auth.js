const { model } = require("../models/Note");

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Usuario no esta Logiado');
    res.redirect('/users/signin');
};

module.exports = helpers;