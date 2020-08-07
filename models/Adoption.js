const mongoose = require('mongoose');
const animalSchema = require('./Animal').schema;
const addressSchema = require('./Address').schema;

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

    animalId: {
        type: String,
        required: true
    },

    animal: {
        type: animalSchema,
        required: true
    },

    address: {
        type: addressSchema,
        required: true
    },

});


module.exports = {
    model: mongoose.model('Adoption', adoptionSchema),
    schema: adoptionSchema
}