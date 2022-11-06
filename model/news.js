const {Schema, model} = require('mongoose')

const newsSchema = new Schema ({
    about: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})

module.exports = model('new', newsSchema)