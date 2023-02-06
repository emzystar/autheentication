// email (string, unique, required, validate)
// password(string,required, minlength

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator')

const userSchema = new Schema({
    email: {
        type: "String",
        required: [true, 'please provide an email'],
        validate: [ ()=>{}, 'please enter a valid email'],


    }, 
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minLength: [10, 'the minimum password length is 10'],
    }
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)