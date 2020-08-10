const mongoose = require('mongoose');

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

    addressId: {
        type: String,
        required: true
    },

});


module.exports = {
    model: mongoose.model('Adoption', adoptionSchema),
    schema: adoptionSchema
}