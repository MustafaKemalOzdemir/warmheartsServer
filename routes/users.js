const express = require('express');
const router = express.Router();

const Auth = require('../CustomModules/Authentication');

router.post('/signup', async (req, res) => {

});

router.post('/signin', async (req, res) => {

    const token = Auth.TokenCreate(queryResult[0]._id, '5m');

});

module.exports = router;