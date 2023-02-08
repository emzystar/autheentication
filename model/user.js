// email (string, unique, required, validate)
// password(string,required, minlength

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

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

// mongoose hooks
 // function that protects user info before we save
 userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next()

 })

module.exports = mongoose.model('user', userSchema)