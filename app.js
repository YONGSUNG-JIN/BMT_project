require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./src/config/dbCon')
const PORT = process.env.PORT || 3000;
const MongoStore = require('connect-mongo');
const sessionMiddleWare = require('./src/config/session');
const cookieParser = require('cookie-parser');
// const authRoute = require('./src/routes/authRoute');
const jwt = require('jsonwebtoken');
const User = require('./src/model/User');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

//middleware
const { checkCurrentUser, requireAuth } = require("./src/middleware/currentUser");
;
// Database & server connection
connectDB();
server.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('socketio', io);




app.use(cookieParser());
app.use('./src', express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// // Routes
app.get('*', checkCurrentUser);
app.use(require('./src/routes/authRoute'));
app.use('/', requireAuth, require('./src/routes/homeRoute'));
app.use('/branch', requireAuth, require('./src/routes/branchRoute'));
app.use('/task', requireAuth, require('./src/routes/taskRoute.js'));
app.use('/community', require('./src/routes/communityRoute.js'));


// const currentUserInfo = async (req, res) => {
//     const token = req.cookies.jwt;
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//     let currentUser = await User.findById(decodedToken.id);
//     return currentUser;
//     })
// }
