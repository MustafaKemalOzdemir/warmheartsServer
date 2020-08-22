const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const staticRoute = require('./routes/static');
const bodyParser = require('body-parser');
const cryptoManager = require('./CustomModules/CryptoManager');
var multer = require('multer');
var upload = multer({ dest: './uploads' });
require('dotenv/config');

app.use(bodyParser.json());

app.get('/images/:name', async(req, res) => {
    res.sendFile(__dirname + '/public/uploads/' + decodeURIComponent(req.params.name));
});

app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/static', staticRoute);

app.listen(5000);

//mongoose.connect(process.env.CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Conected'))
//mongoose.connect('mongodb://localhost:27017/WarmHeartsDB', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Conected'))
mongoose.connect('mongodb+srv://nomad:SkAUTIzdDIgPRs5S@wm.ftdg2.mongodb.net/WarmHeartsDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Conected'))