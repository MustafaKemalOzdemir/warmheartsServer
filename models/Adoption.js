const mongoose = require('mongoose');
const animal = require('./Animal').schema;

const adoptionSchema = mongoose.Schema({

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

    addressId: {
        type: String,
        required: true
    },

});


module.exports = {
    model: mongoose.model('Adoption', adoptionSchema),
    schema: adoptionSchema
}