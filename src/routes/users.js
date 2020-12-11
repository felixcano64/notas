const express = require('express');
const router = express.Router();

const User = require('../models/user');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
})

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
})

router.post('/users/signup', async(req, res) => {
    const errors = [];
    const { name, email, password, confirmacion } = req.body;

    if (name.length <= 0) {
        errors.push({ text: 'El nombre es obligatoria' });
    }

    if (email.length <= 0) {
        errors.push({ text: 'El email es obligatoria' });
    }

    if (password.length <= 4) {
        errors.push({ text: 'La contraseña debe ser mayor de 4 caracteres' });
    }

    if (password != confirmacion) {
        errors.push({ text: 'La cotrseña y la confirmacion no son iguales' });
    }

    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirmacion });
    } else {

        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            errors.push({ text: 'Este email ya existe... favor de cambiarlo' });
            res.render('users/signup', { errors, name, email, password, confirmacion });
        } else {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Usuario registrado correctamente');
            res.redirect('/users/signin');
        }
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;