const express = require('express');
const router = express.Router();
const Auth = require('../CustomModules/Authentication');
const User = require('../models/User').model;
const Animal = require('../models/Animal').model;
const Adoption = require('../models/Adoption').model;
const Mating = require('../models/Mating').model;
const Missing = require('../models/Missing').model;
let CryptoManager = require('../CustomModules/CryptoManager');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, 'ProfileImage-' + Date.now());
    }
});
var upload = multer({ storage: storage });


router.get('/', async (req, res) => {
    Mating.find({}, (error, matingResult) => {
        Missing.find({}, (error, missingResult) => {
            Adoption.find({}, (error, adoptionResult) => {
                var posts = [];
                posts.concat(matingResult);
                posts.concat(missingResult);
                posts.concat(adoptionResult);
                return res.status(200).json(matingResult);
            });
        });
    });
});

router.get('/adoption', async (req, res) => {
    Adoption.find({}, (error, searchResult) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (searchResult)
            return res.status(200).json({
                'Success': true,
                'result': searchResult
            });
        else
            return res.status(400).json({
                'Success': false,
                'message': 'No animal with specified id'
            });
    });
});

router.get('/mating', async (req, res) => {
    Mating.find({}, (error, searchResult) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (searchResult)
            return res.status(200).json({
                'Success': true,
                'result': searchResult
            });
        else
            return res.status(400).json({
                'Success': false,
                'message': 'No animal with specified id'
            });
    });
});

router.get('/missing', async (req, res) => {
    Missing.find({}, async (error, searchResult) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (searchResult) {
            let answer = [];
            for (var i = 0; i < searchResult.length; i++) {
                var obj = searchResult[i];
                await Animal.find({ 'animalId': obj['animalId'] }, (error, result) => {
                    let updated = JSON.parse(JSON.stringify(obj))
                    updated['animal'] = result;
                    answer.push(updated);
                });
            }
            return res.status(200).json({
                'Success': true,
                'result': answer
            });
        } else {
            return res.status(400).json({
                'Success': false,
                'message': 'No animal with specified id'
            });

        }




    });
});

router.get('/adoption/:id/get', async (req, res) => {
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
router.get('/mating/:id/get', async (req, res) => {
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
router.get('/missing/:id/get', async (req, res) => {
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

router.get('/user/:id/adoptions/get', async (req, res) => {
    console.log(req.params);
    Adoption.find({ 'ownerId': req.params.id }, (error, adoptions) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        return res.status(200).json({
            'Success': true,
            'adoptions': adoptions
        });
    });
});
router.get('/user/:id/matings/get', async (req, res) => {
    console.log(req.params);
    Mating.find({ 'ownerId': req.params.id }, (error, matings) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        return res.status(200).json({
            'Success': true,
            'matings': matings
        });
    });
});
router.get('/user/:id/missings/get', async (req, res) => {
    console.log(req.params);
    Missing.find({ 'ownerId': req.params.id }, (error, missings) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        return res.status(200).json({
            'Success': true,
            'missings': missings
        });
    });
});

router.post('/adoption/create', upload.single('fileToUpload'), async (req, res) => {

    const { token, email, password, date, animal, addressId } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token';
    if (!email)
        errorMessage += '- email';
    if (!password)
        errorMessage += '- password';
    if (!date)
        errorMessage += '- date';
    if (!animal)
        errorMessage += '- animal';
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
                animal.image = req.file ? "uploads\\" + req.file.filename : "uploads\\noImage.jpg";
                let adoptionPost = new Adoption({
                    'ownerId': user.userId,
                    'postId': CryptoManager.GenerateId(),
                    'date': date,
                    'animal': animal,
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
router.post('/mating/create', upload.single('fileToUpload'), async (req, res) => {

    const { token, email, password, date, animal, heat, addressId } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token\n';
    if (!email)
        errorMessage += '- email\n';
    if (!password)
        errorMessage += '- password\n';
    if (!date)
        errorMessage += '- date\n';
    if (!animal)
        errorMessage += '- animal\n';
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
                animal.image = req.file ? "uploads\\" + req.file.filename : "uploads\\noImage.jpg";

                let matingPost = new Mating({
                    'ownerId': user.userId,
                    'postId': CryptoManager.GenerateId(),
                    'date': date,
                    'animal': animal,
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
router.post('/missing/create', upload.single('fileToUpload'), async (req, res) => {

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
    if (!animal)
        errorMessage += '- animal';
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
                animal.image = req.file ? "uploads\\" + req.file.filename : "uploads\\noImage.jpg";

                let missingPost = new Missing({
                    'ownerId': user.userId,
                    'postId': CryptoManager.GenerateId(),
                    'date': date,
                    'animal': animal,
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