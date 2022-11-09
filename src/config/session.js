require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sessionMiddleWare = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        maxAge: 1000 * 60 * 2
    }
}) 

module.exports = sessionMiddleWare;