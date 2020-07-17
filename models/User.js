const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    surName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    posts: [

    ],


});

module.exports = {
    model: mongoose.model('Users', userSchema),
    schema: userSchema
}