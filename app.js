const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const bodyParser = require('body-parser');
const cryptoManager = require('./cyriptoManager');
require('dotenv/config');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: cryptoManager.encryptText('MkL')
    });
});

app.use('/posts', postRoute);
app.use('/users', userRoute);

app.listen(5000);

//mongoose.connect(process.env.CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Conected'))
mongoose.connect('mongodb://localhost:27017/WarmHeartsDB', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Conected'))