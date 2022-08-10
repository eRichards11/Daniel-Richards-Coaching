const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultControllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')



router.all('/', (req, res, next) => {
    req.app.locals.layout = 'default'
    next()
})


router.route('/').get(defaultController.index)

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true}, (req, email, password, done) => {
    User.findOne({email: email}).then(user => {
        if (!user) {
            return done(null, false, req.flash('error-message', 'User not found with this email.'));
        }

        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if (err) {
                return err;
            }

            if (!passwordMatched) {
                return done(null, false, req.flash('error-message', 'Invalid Username or Password'));
            }

            return done(null, user, req.flash('success-message', 'Login Successful'));
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


router.route('/login')
    .get(defaultController.loginGet)
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true,
        session: true
    }) ,defaultController.loginPost);


router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost);


router.route('/bio')
    .get(defaultController.bio)

router.route('/resources')
    .get(defaultController.resources)

router.route('/exercises')
    .get(defaultController.exercises)

router.route('/contact')
    .get(defaultController.contact)

router.route('/thanks')
    .get(defaultController.thanks)

router.route('/stats')
    .get(defaultController.stats)


module.exports = router
