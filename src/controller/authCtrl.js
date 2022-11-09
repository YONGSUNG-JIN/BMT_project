require('dotenv').config();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const handleAuthErrors = (err) => {
    let errors = {email:'', password:''};
    // 이메일 중복
    console.log(err);
    if(err.code === 11000){
        errors.email = "This email is already exists"
        return errors
    }
    if(err.message.includes('User validation failed')){
        const errArray = Object.values(err.errors);
        errArray.forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const maxAge = 60*60;
//Token을 return 하는 함수 = Token 발급 함수
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: 3 * maxAge
    });
}

const logoutGetCtrl = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}

const loginGetCtrl = (req, res) => {
    const errors = {
        email: "",
        password: ""
    };
    res.render('login.ejs', { errors });
}

const loginPostCtrl = async (req, res) => {
    const { email, password } = req.body
    try {
        const loginedUser = await User.login(email, password);
        const token = createToken(loginedUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect('/');
        // const foundUser = await User.findOne({ email: req.body.email }).exec();
        // const validPassword = await bcrypt.compare(req.body.password, foundUser.password);
        // if (!validPassword) {
        //     res.status(400).send('Worng Password')
        // } else {
        //     console.log(foundUser);
        //     req.session.user = foundUser;
        //     console.log(req.session);
        //     req.session.save(() => res.redirect('../'))
        // }
    } catch (e) {
        res.status(400).json({});
    }
}

const registerGetCtrl = (req, res) => {
    // mongoDB error message 아래 작성 필요
    res.render('register.ejs');
}

const registerPostCtrl = async (req, res) => {
    const { email, password, team, branch, role } = req.body
    try {
        const user = await User.create({ email, password, team, branch, role });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(user)
        res.status(200).json({ user });
    } catch (e) {
        let errors = handleAuthErrors(e);
        console.log(e)
        res.status(400).json({ errors });
        // res.render('register.ejs', { errors });
    }
}


module.exports = { logoutGetCtrl, loginGetCtrl, loginPostCtrl, registerGetCtrl, registerPostCtrl }