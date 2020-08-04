const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
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
    }
});
var User = module.exports = mongoose.model('Users', userSchema);

/*
module.exports = {
    model: mongoose.model('Users', userSchema),
    schema: userSchema
}
*/