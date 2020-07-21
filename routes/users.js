const express = require('express');
const router = express.Router();

let CryptoManager = require('../CustomModules/CryptoManager');
let Auth = require('../CustomModules/Authentication');
let User = require('../models/User');

router.post('/signup', async (req, res) => {
    const { email, firstname, lastname, password } = req.body;
    User.findOne({ 'email': email }, (user) => {
        if (user)
            res.status(409).json({
                'success': false,
                'message': 'Email is already registered'
            });

        const user = new User({
            'userId': CryptoManager.GenerateUserId(),
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password': password,
        });

        user.save().then((result) => {
            if (result)
                return res.status(201).json({
                    'success': true,
                    'message': 'Account has been created',
                    'user': result
                });
        }).catch((error) => {
            if (error)
                return res.status(500).json({
                    'success': false,
                    'message': error
                });
        });
    });
});

router.post('/signin', async (req, res) => {

    const token = Auth.TokenCreate(queryResult[0]._id);

});

module.exports = router;