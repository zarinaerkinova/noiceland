const {Schema, model} = require('mongoose')

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    img: String,
    tel: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean  
})

module.exports = model('user', userSchema)