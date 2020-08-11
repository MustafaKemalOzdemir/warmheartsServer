const mongoose = require('mongoose');
const animal = require('./Animal').schema;
const address = require('./Address').schema;

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

    animal: {
        type: animal
    },

    heat: {
        type: Boolean,
        required: true
    },

    address: {
        type: address,
    },


});


module.exports = {
    model: mongoose.model('Mating', matingSchema),
    schema: matingSchema
}