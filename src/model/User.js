const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true,"Please enter a password"],
        minlength : [6, "Minimum password length is 6 characters"]
    },
    team:{
        type: String,
        // required: true
    },
    branch:{
        type: String,
        // required: true
    },
    role:{
        type: String,
        // required: true
    }
},{ 
    timestamps: 
    true 
})

// register되는 user info 중 passowrd 암호화
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// login 시 입력 정보를 DB 내 정보와 대조하는 static method를 임의로 login이라 명명
userSchema.statics.login = async function(email, password) {
    const foundUser = await this.findOne({email});
    if(foundUser) {
        const validPassword = await bcrypt.compare(password, foundUser.password);
        if(validPassword){
            return foundUser
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}



module.exports = mongoose.model('User', userSchema)
