const express = require('express');
const router = express.Router();

let CryptoManager = require('../CustomModules/CryptoManager');
let Auth = require('../CustomModules/Authentication');
let User = require('../models/User');

router.post('/signup', async (req, res) => {
    const { email, firstname, lastname, password } = req.body;
    if (!email)
        return res.status(400).json({
            'success': false,
            'message': 'Email has not been provided'
        });
    if (!firstname)
        return res.status(400).json({
            'success': false,
            'message': 'Firstname has not been provided'
        });
    if (!lastname)
        return res.status(400).json({
            'success': false,
            'message': 'Lastname has not been provided'
        });
    if (!password)
        return res.status(400).json({
            'success': false,
            'message': 'Password has not been provided'
        });
    User.findOne({ 'email': email }, (user) => {
        if (user)
            return res.status(409).json({
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

    const { email, password } = req.body;

    if (!email)
        return res.status(400).json({
            'success': false,
            'message': 'Email has not been provided'
        });
    if (!password)
        return res.status(400).json({
            'success': false,
            'message': 'Password has not been provided'
        });

    User.findOne({ 'email': email }, (user) => {
        if (!user)
            return res.status(400).json({
                'success': false,
                'message': 'Email or password is wrong'
            });
        if (user.password !== password)
            return res.status(400).json({
                'success': false,
                'message': 'Email or password is wrong'
            });
        const token = Auth.TokenCreate(user.userId);
        return res.status(200).json({
            'success': true,
            'message': 'Access granted',
            'token': token
        });
    });
});

module.exports = router;