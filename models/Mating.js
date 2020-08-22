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

    animalName: {
        type: String,
        required: true,
    },

    //Kısır
    castrated: {
        type: Number,
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

    image: {
        type: String,
        required: true
    },

    source: {
        type: String,
        required: true
    },
    //Aşı
    regularVaccine: {
        type: Number,
    },

    heat: {
        type: Number,
        required: true
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
    model: mongoose.model('Mating', matingSchema),
    schema: matingSchema
}