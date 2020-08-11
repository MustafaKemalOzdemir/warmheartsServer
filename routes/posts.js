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


router.get('/', async (req, res, next) => {
    Mating.find({}, (error, matingResult) => {
        Missing.find({}, (erro, missingResult) => {
            Adoption.find({}, (err, adoptionResult) => {
                var posts = [];
                posts = posts.concat(matingResult);
                posts = posts.concat(missingResult);
                posts = posts.concat(adoptionResult);
                return res.status(200).json(matingResult);
            });
        });
    });
});

router.get('/adoption', async (req, res, next) => {
    Adoption.find({}, (error, searchResult) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (searchResult)
            return res.status(200).json({
                'Success': true,
                'adoptions': searchResult
            });
    });
});
router.get('/mating', async (req, res, next) => {
    Mating.find({}, (error, searchResult) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (searchResult)
            return res.status(200).json({
                'Success': true,
                'matings': searchResult
            });
    });
});
router.get('/missing', async (req, res, next) => {
    Missing.find({}, async (error, searchResult) => {
        if (error)
            return res.status(400).json({
                'Success': false,
                'message': error
            });
        if (searchResult)
            return res.status(200).json({
                'Success': true,
                'misings': searchResult
            });
    });
});

router.get('/adoption/:id', async (req, res, next) => {
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
router.get('/mating/:id', async (req, res, next) => {
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
router.get('/missing/:id', async (req, res, next) => {
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

router.delete('/adoption/:id', async (req, res, next) => {
    const { token, email, password, } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token';
    if (!email)
        errorMessage += '- email';
    if (!password)
        errorMessage += '- password';
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
            Adoption.deleteOne({ 'postId': req.params.id, 'ownerId': user.userId }, (error) => {
                if (error)
                    return res.status(400).json({
                        'Success': false,
                        'message': 'Unathorized access'
                    });;
                    return res.status(200).json({
                        'Success': true,
                        'message': 'Adoption post has been successfully deleted'
                    });;
            });
        } else
            return res.status(400).json({
                'Success': false,
                'message': 'Unathorized access'
            });
    });
});
router.delete('/mating/:id', async (req, res, next) => {
    const { token, email, password, } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token';
    if (!email)
        errorMessage += '- email';
    if (!password)
        errorMessage += '- password';
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
            Mating.deleteOne({ 'postId': req.params.id, 'ownerId': user.userId }, (error) => {
                if (error)
                    return res.status(400).json({
                        'Success': false,
                        'message': 'Unathorized access'
                    });;
                    return res.status(200).json({
                        'Success': true,
                        'message': 'Mating post has been successfully deleted'
                    });;
            });
        } else
            return res.status(400).json({
                'Success': false,
                'message': 'Unathorized access'
            });
    });
});
router.delete('/missing/:id', async (req, res, next) => {
    const { token, email, password, } = req.body;
    let errorMessage = '';
    if (!token)
        errorMessage += '- token';
    if (!email)
        errorMessage += '- email';
    if (!password)
        errorMessage += '- password';
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
            Missing.deleteOne({ 'postId': req.params.id, 'ownerId': user.userId }, (error) => {
                if (error)
                    return res.status(400).json({
                        'Success': false,
                        'message': 'Unathorized access'
                    });;
                    return res.status(200).json({
                        'Success': true,
                        'message': 'Missing post has been successfully deleted'
                    });;
            });
        } else
            return res.status(400).json({
                'Success': false,
                'message': 'Unathorized access'
            });
    });
});

router.get('/user/:id/adoptions', async (req, res, next) => {
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
router.get('/user/:id/matings', async (req, res, next) => {
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
router.get('/user/:id/missings', async (req, res, next) => {
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

router.post('/adoption', upload.single('fileToUpload'), async (req, res, next) => {

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
router.post('/mating', upload.single('fileToUpload'), async (req, res, next) => {

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
router.post('/missing', upload.single('fileToUpload'), async (req, res, next) => {

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