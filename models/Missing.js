const mongoose = require('mongoose');


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

    image: {
        type: String,
        required: true
    },

    source: {
        type: Number,
        required: true
    },
    //Aşı
    regularVaccine: {
        type: Boolean,
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

});


module.exports = {
    model: mongoose.model('Missing', missingSchema),
    schema: missingSchema
}