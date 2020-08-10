const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({

    adressId: {
        type: String,
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
    model: mongoose.model('Address', addressSchema),
    schema: addressSchema
}