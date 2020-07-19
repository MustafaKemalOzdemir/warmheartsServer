const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {

});

router.post('/signin', async (req, res) => {
    const token = jwt.sign(
        { userId: queryResult[0]._id },
        'N0 B0Dy ReMeMbEr 2nD', 
        { expiresIn: '5m' }
    );

});

module.exports = router;