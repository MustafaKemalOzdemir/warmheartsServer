const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    ownerId: {
        type: Number,
        required: true
    },


});


module.exports = {
    model: mongoose.model('Posts', postSchema),
    schema: postSchema
}