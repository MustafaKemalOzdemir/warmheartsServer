const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({

    adressId: {
        type: String,
        required: true
    },

    city: {
        type: Number,
        required: true
    },

    town: {
        type: Number,
        required: true
    },

    addressDetail: {
        type: String,
        required: true
    },

});


module.exports = {
    model: mongoose.model('Address', addressSchema),
    schema: addressSchema
}