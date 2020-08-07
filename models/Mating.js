const mongoose = require('mongoose');

const matingSchema = mongoose.Schema({

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

    heat: {
        type: Boolean,
        required: true
    },

    addressId: {
        type: String,
        required: true
    },

});


module.exports = {
    model: mongoose.model('Mating', matingSchema),
    schema: matingSchema
}