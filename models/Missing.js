const mongoose = require('mongoose');
const animal = require('./Animal').schema;


const missingSchema = mongoose.Schema({

    ownerId: {
        type: String,
        required: true
    },

    postId: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    animal: {
        type: animal,
        required: true
    },

    missingDate: {
        type: String,
        required: true
    },
    //Tasma
    collar: {
        type: Boolean,
        required: true
    },

    addressId: {
        type: String,
        required: true
    },

});


module.exports = {
    model: mongoose.model('Missing', missingSchema),
    schema: missingSchema
}