const express = require('express');
const router = express.Router();
const User = require('../models/User').model;
const cryptoManager = require('../cyriptoManager');

router.get('/', async(req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});


router.post('/signup', async(req, res) => {
    const check = await User.find({ email: req.body.email });

    if (Object.keys(check).length === 0) {
        console.log('New Entry');
    } else {
        console.log('not new');
        res.status(200).json({
            success: false,
            message: 'Bu E-Mail\'e ait üyelik bulunmaktadır'
        });
        return;
    }

    const user = new User({
        userId: cryptoManager.generateUserId(),
        name: req.body.name,
        surName: req.body.surName,
        email: req.body.email,
        password: cryptoManager.encryptPassword(req.body.password),
    });

    try {
        const savedUser = await user.save();
        res.status(200).json({
            success: true,
            message: 'Kayıt Başarılı',
            user: savedUser
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            message: error
        });
    }


});

router.post('/signin', async(req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        res.status(200).json({
            success: false,
            message: 'Eksik yada yanlış parametre'
        });
        return;
    }
    const queryResult = await User.find({ email: req.body.email });
    if (Object.keys(queryResult).length === 0) {
        res.status(200).json({
            success: false,
            message: 'Kullanıcı yada Şifre hatalı.'
        });
        return;
    }
    console.log(req.body);
    console.log(queryResult);
    console.log(req.body);
    console.log(cryptoManager.encryptPassword(req.body.password));
    console.log(queryResult[0].password);

    if (cryptoManager.encryptPassword(req.body.password) === queryResult[0].password) {
        res.status(200).json({
            success: true,
            message: 'Giriş Başarılı',
            user: queryResult[0]
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'Giriş Başarısız'
        });
    }

});

module.exports = router;