const express = require('express');
const router = express.Router();
const Auth = require('../CustomModules/Authentication');
const User = require('../models/User');
const Animal = require('../models/Animal');
const Adoption = require('../models/Adoption');
const Mating = require('../models/Mating');
const Missing = require('../models/Missing');


router.get('/', async (req, res) => {
    var posts = [];
    posts.concat(Adoption.find());
    posts.concat(Mating.find());
    posts.concat(Missing.find());
    res.status(200).json(posts);
});

router.post('/animal/create', async (req, res) => {
    const { token, email, password, type, race, gender, age, images, source, regularVaccine } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token\n';
    if (!email)
        errorMessage += '- email\n';
    if (!password)
        errorMessage += '- password\n';
    if (!type)
        errorMessage += '- type\n';
    if (!race)
        errorMessage += '- race\n';
    if (!gender)
        errorMessage += '- gender\n';
    if (!age)
        errorMessage += '- age\n';
    if (images.length < 3)
        errorMessage += '- at least 3 images\n';
    if (!source)
        errorMessage += '- source\n';
    if (!regularVaccine)
        errorMessage += '- regularVaccine\n';
    if (errorMessage != '')
        return res.status(400).json({
            'success': false,
            'message': 'Please provide followings:\n' + errorMessage
        });

    var tokenResult = Auth.TokenCheck(token);

    if (tokenResult.Success) {
        User.findOne({ 'email': email }, (err, user) => {
            if (err)
                return res.status(400).json({
                    'Success': false,
                    'message': err
                });
            if (!user)
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });
            if (user.password !== password)
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });

            if (tokenResult.token.userId == user.userId) {
                let animal = new Animal({
                    'ownerId': user.userId,
                    'animalId': CryptoManager.GenerateId(),
                    'type': type,
                    'race': race,
                    'gender': gender,
                    'age': age,
                    'images': images,
                    'source': source,
                    'regularVaccine': regularVaccine
                });

                animal.save().then((result) => {
                    if (result)
                        return res.status(201).json({
                            'success': true,
                            'message': 'Animal has been created',
                            'animal': result
                        });
                }).catch((error) => {
                    if (error)
                        return res.status(500).json({
                            'success': false,
                            'message': error
                        });
                });
            }
            else
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });
        });
    }
});

router.post('/adoption/create', async (req, res) => {

    const { token, email, password, date, animalId, addressId } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token\n';
    if (!email)
        errorMessage += '- email\n';
    if (!password)
        errorMessage += '- password\n';
    if (!date)
        errorMessage += '- date\n';
    if (!animalId)
        errorMessage += '- animalId\n';
    if (!addressId)
        errorMessage += '- addressId\n';

    if (errorMessage != '')
        return res.status(400).json({
            'success': false,
            'message': 'Please provide followings:\n' + errorMessage
        });

    var tokenResult = Auth.TokenCheck(token);

    if (tokenResult.Success) {
        User.findOne({ 'email': email }, (err, user) => {
            if (err)
                return res.status(400).json({
                    'Success': false,
                    'message': err
                });
            if (!user)
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });
            if (user.password !== password)
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });

            if (tokenResult.token.userId == user.userId) {
                let adoptionPost = new Adoption({
                    'ownerId': user.userId,
                    'postId': CryptoManager.GenerateId(),
                    'date': date,
                    'animalId': animalId,
                    'addressId': addressId
                });

                adoptionPost.save().then((result) => {
                    if (result)
                        return res.status(201).json({
                            'success': true,
                            'message': 'Adoption Post has been created',
                            'adoption': result
                        });
                }).catch((error) => {
                    if (error)
                        return res.status(500).json({
                            'success': false,
                            'message': error
                        });
                });
            }
            else
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });
        });
    }
});

router.post('/mating/create', async (req, res) => {

    const { token, email, password, date, animalId, heat, addressId } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token\n';
    if (!email)
        errorMessage += '- email\n';
    if (!password)
        errorMessage += '- password\n';
    if (!date)
        errorMessage += '- date\n';
    if (!animalId)
        errorMessage += '- animalId\n';
    if (!heat)
        errorMessage += '- heat\n';
    if (!addressId)
        errorMessage += '- addressId\n';

    if (errorMessage != '')
        return res.status(400).json({
            'success': false,
            'message': 'Please provide followings:\n' + errorMessage
        });

    var tokenResult = Auth.TokenCheck(token);

    if (tokenResult.Success) {
        User.findOne({ 'email': email }, (err, user) => {
            if (err)
                return res.status(400).json({
                    'Success': false,
                    'message': err
                });
            if (!user)
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });
            if (user.password !== password)
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });

            if (tokenResult.token.userId == user.userId) {
                let matingPost = new Mating({
                    'ownerId': user.userId,
                    'postId': CryptoManager.GenerateId(),
                    'date': date,
                    'animalId': animalId,
                    'heat': heat,
                    'addressId': addressId
                });
                matingPost
                adoptionPost.save().then((result) => {
                    if (result)
                        return res.status(201).json({
                            'success': true,
                            'message': 'Mating Post has been created',
                            'adoption': result
                        });
                }).catch((error) => {
                    if (error)
                        return res.status(500).json({
                            'success': false,
                            'message': error
                        });
                });
            }
            else
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });
        });
    }
});

module.exports = router;