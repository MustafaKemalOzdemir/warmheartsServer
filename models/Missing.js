const mongoose = require('mongoose');
const animal = require('./Animal').schema;
const address = require('./Address').schema;


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

    address: {
        type: address,
    },

});


module.exports = {
    model: mongoose.model('Missing', missingSchema),
    schema: missingSchema
}