require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Middleware for checking current user
const checkCurrentUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.currentUser = null;
                next();
            } else {
                let currentUser = await User.findById(decodedToken.id);
                res.locals.currentUser = currentUser;
                next();            
            }
        })
    } else {
        res.locals.currentUser = null;
        next();            
    } 
}

//Middleware for JWT checking
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

module.exports = {checkCurrentUser, requireAuth};