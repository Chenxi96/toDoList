const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


const port = process.env.PORT;
const url = process.env.MONGO_URI;

app.use(cors())
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(url)
    .then(() => console.log('Connected'))
    .catch((e) => console.log(e))

const userSchema = mongoose.Schema({
    Title: String,
    Description: String
})

const User = mongoose.model('user', userSchema);

app.post('/', (req, res) => {
    const makeList = new User({
        Title: req.body.title,
        Description: req.body.description
    })
    makeList.save().then(() => {
        console.log('added')
        res.redirect('http://localhost:3000')
    });
})

app.get('/update', async (req, res) => {
    try {
        const allUser = await User.find({})
        res.status(200).send(allUser)
        console.log(allUser)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})