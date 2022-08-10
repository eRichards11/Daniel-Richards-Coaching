const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel').Category
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')

module.exports = {
    index: (req, res) => {
        res.render('default/index')
    },

    bio: (req, res) => {
        res.render('./default/bio')
    },

    resources: async (req, res) => {
        const posts = await Post.find().lean()
        const categories = await Category.find().lean()
        res.render('default/resources', {posts: posts, categories: categories})
    },

    exercises: async (req, res) => {
        const posts = await Post.find().lean()
        const categories = await Category.find().lean()
        res.render('default/exercises', {posts: posts, categories: categories})
    },

    loginGet: (req, res) => {
        res.render('default/login', {message: req.flash('error')});
    },


    loginPost: (req, res) => {

    },


    contact: (req, res) => {
        res.render('./default/contact')
    },

    thanks: (req, res) => {
        res.render('./default/thanks')
    },

    stats: (req, res) => {
        res.render('./default/stats')
    },

    /* REGISTER ROUTES*/

    registerGet: (req, res) => {
        res.render('default/register');
    },

    registerPost: (req, res) => {
        let errors = [];

        if (!req.body.firstName) {
            errors.push({message: 'First name is mandatory'});
        }
        if (!req.body.lastName) {
            errors.push({message: 'Last name is mandatory'});
        }
        if (!req.body.email) {
            errors.push({message: 'Email field is mandatory'});
        }
        if (!req.body.password || !req.body.passwordConfirm) {
            errors.push({message: 'Password field is mandatory'});
        }
        if (req.body.password !== req.body.passwordConfirm) {
            errors.push({message: 'Passwords do not match'});
        }

        if (errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            User.findOne({email: req.body.email}).then(user => {
                if (user) {
                    req.flash('error-message', 'Email already exists, try to login.');
                    res.redirect('/login');
                } else {
                    const newUser = new User(req.body);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save().then(user => {
                                req.flash('success-message', 'You are now registered');
                                res.redirect('/login');
                            });
                        });
                    });
                }
            });
        }
    }

};



