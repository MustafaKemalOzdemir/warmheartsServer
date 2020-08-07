const mongoose = require('mongoose');
const animalSchema = require('./Animal').schema;
const addressSchema = require('./Address').schema;

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

    animalId: {
        type: String,
        required: true
    },

    animal: {
        type: animalSchema,
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

    address: {
        type: addressSchema,
        required: true
    },

});


module.exports = {
    model: mongoose.model('Missing', missingSchema),
    schema: missingSchema
}