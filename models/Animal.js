const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({

    ownerId: {
        type: String,
        required: true
    },

    animalId: {
        type: String,
        required: true
    },

    //Kedi
    type: {
        type: String,
        required: true
    },
    //Tekir kedi
    race: {
        type: String,
        required: true
    },
    //dişi
    gender: {
        type: Number,
        required: true
    },

    age: {
        type: String,
        required: true
    },

    images: [{
        type: String,
    }],

    source: {
        type: Number,
        required: true
    },
    //Aşı
    regularVaccine: {
        type: Boolean,
    },

});


module.exports = {
    model: mongoose.model('Animal', animalSchema),
    schema: animalSchema
}