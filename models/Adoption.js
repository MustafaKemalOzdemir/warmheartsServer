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

    animalName: {
        type: String,
        required: true,
    },

    //Kısır
    castrated: {
        type: Boolean,
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
        type: String,
        required: true
    },

    age: {
        type: String,
        required: true
    },

    images:[ {
        type: String
    }],

    source: {
        type: String,
        required: true
    },
    //Aşı
    regularVaccine: {
        type: Number,
    },

    city: {
        type: String,
        required: true
    },

    town: {
        type: String,
        required: true
    },

    addressDetail: {
        type: String,
        required: true
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    },

});


module.exports = {
    model: mongoose.model('Adoption', adoptionSchema),
    schema: adoptionSchema
}