const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const passport = require('passport');
const passportLocal = require('passport-local')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync (async (req, res) => {
    res.send(req.body);
    try {
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const regiseteredUser = await User.register(user, password);
        // console.log(regiseteredUser);
        req.flash('success', 'Welcome to yelp camp');
        res.redirect('/campgrounds')
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}))

router.get('/login', (req, res) =>{
    res.render('users/login');
})

router.post('/login', (req, res) =>{
    req.flash('success', 'Welcome back')
    res.redirect('/campgrounds')
})
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/campgrounds',
//     failureRedirect: '/login'
//   }));



module.exports = router;