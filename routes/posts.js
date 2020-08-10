const express = require('express');
const router = express.Router();
const Auth = require('../CustomModules/Authentication');
const User = require('../models/User').model;
const Animal = require('../models/Animal').model;
const Adoption = require('../models/Adoption').model;
const Mating = require('../models/Mating').model;
const Missing = require('../models/Missing').model;
let CryptoManager = require('../CustomModules/CryptoManager');


router.get('/', async (req, res) => {
    var posts = [];
    posts.concat(Adoption.find());
    posts.concat(Mating.find());
    posts.concat(Missing.find());
    res.status(200).json(posts);
});

router.get('/animal/get/:id', async (req, res) => {
    console.log(req.params);
    Animal.findOne({ 'animalId': req.params.id }, (error, animal) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (animal)
            return res.status(200).json({
                'Success': true,
                'animal': animal
            });
        else
            return res.status(400).json({
                'Success': false,
                'message': 'No animal with specified id'
            });
    });
});

router.get('/adoption/get/:id', async (req, res) => {
    console.log(req.params);
    Adoption.findOne({ 'animalId': req.params.id }, (error, adoption) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (adoption)
            return res.status(200).json({
                'Success': true,
                'adoption': adoption
            });
        else
            return res.status(400).json({
                'Success': false,
                'message': 'No adoption post with specified id'
            });
    });
});

router.get('/mating/get/:id', async (req, res) => {
    console.log(req.params);
    Mating.findOne({ 'animalId': req.params.id }, (error, mating) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (mating)
            return res.status(200).json({
                'Success': true,
                'mating': mating
            });
        else
            return res.status(400).json({
                'Success': false,
                'message': 'No mating post with specified id'
            });
    });
});

router.get('/missing/get/:id', async (req, res) => {
    console.log(req.params);
    Missing.findOne({ 'animalId': req.params.id }, (error, missing) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (missing)
            return res.status(200).json({
                'Success': true,
                'missing': missing
            });
        else
            return res.status(400).json({
                'Success': false,
                'message': 'No missing post with specified id'
            });
    });
});

router.post('/animal/create', async (req, res) => {
    const { token, email, password, type, race, gender, age, images, source, regularVaccine } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token';
    if (!email)
        errorMessage += '- email';
    if (!password)
        errorMessage += '- password';
    if (!type)
        errorMessage += '- type';
    if (!race)
        errorMessage += '- race';
    if (gender === undefined)
        errorMessage += '- gender';
    if (age === undefined)
        errorMessage += '- age';
    if (images.length < 3)
        errorMessage += '- at least 3 images'
    if (source === undefined)
        errorMessage += '- source';
    if (!regularVaccine)
        errorMessage += '- regularVaccine';
    if (errorMessage != '')
        return res.status(400).json({
            'success': false,
            'message': 'Please provide followings:' + errorMessage
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
            } else
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
        errorMessage += '- token';
    if (!email)
        errorMessage += '- email';
    if (!password)
        errorMessage += '- password';
    if (!date)
        errorMessage += '- date';
    if (!animalId)
        errorMessage += '- animalId';
    if (!addressId)
        errorMessage += '- addressId';

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
            } else
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
            'message': 'Please provide followings:' + errorMessage
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
                matingPost.save().then((result) => {
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
            } else
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });
        });
    }
});

router.post('/missing/create', async (req, res) => {

    const { token, email, password, date, animalId, missingDate, collar, addressId } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token';
    if (!email)
        errorMessage += '- email';
    if (!password)
        errorMessage += '- password';
    if (!date)
        errorMessage += '- date';
    if (!animalId)
        errorMessage += '- animalId';
    if (!missingDate)
        errorMessage += '- missingDate';
    if (!collar)
        errorMessage += '- collar';
    if (!addressId)
        errorMessage += '- addressId';

    if (errorMessage != '')
        return res.status(400).json({
            'success': false,
            'message': 'Please provide followings:' + errorMessage
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
                let missingPost = new Missing({
                    'ownerId': user.userId,
                    'postId': CryptoManager.GenerateId(),
                    'date': date,
                    'animalId': animalId,
                    'missingDate': missingDate,
                    'collar': collar,
                    'addressId': addressId
                });
                missingPost.save().then((result) => {
                    if (result)
                        return res.status(201).json({
                            'success': true,
                            'message': 'Missing Post has been created',
                            'adoption': result
                        });
                }).catch((error) => {
                    if (error)
                        return res.status(500).json({
                            'success': false,
                            'message': error
                        });
                });
            } else
                return res.status(400).json({
                    'Success': false,
                    'message': 'Unathorized access'
                });
        });
    }
});

module.exports = router;