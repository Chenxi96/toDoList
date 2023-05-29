const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');
const app = express();


const port = process.env.PORT;
const url = process.env.MONGO_URI;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

mongoose
    .connect(url)
    .then(() => console.log('Connected'))
    .catch((e) => console.log(e))

const userSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Date: Date
});

const workSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Date: Date
});

const vacationSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Date: Date
})

const User = mongoose.model('user', userSchema);
const Work = mongoose.model('work', workSchema);
const Vacation = mongoose.model('vacation', vacationSchema);

app.post('/home', (req, res) => {
    const userList = new User({
        Title: req.body.title,
        Description: req.body.description,
        Date: new Date()
    })
    userList.save().then(() => {
        console.log('added')
        res.redirect('http://localhost:3000/home')
    });
})

app.post('/work', (req, res) => {
    const workList = new Work({
        Title: req.body.title,
        Description: req.body.description,
        Date: new Date()
    });
    workList.save().then((result) => {
        console.log(result)
        res.redirect('http://localhost:3000/work')
    })
});

app.post('/vacation', (req, res) => {
    const vacationList = new Vacation({
        Title: req.body.title,
        Description: req.body.description,
        Date: new Date()
    });
    vacationList.save().then((result) => {
        console.log(result)
        res.redirect('http://localhost:3000/vacation')
    })
})



app.get('/home', async (req, res) => {
    try {
        const allUser = await User.find({})
        res.status(200).send(allUser)
        console.log('showList')
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

app.get('/work', async (req, res) => {
    try {
        const allUser = await Work.find({})
        res.status(200).send(allUser)
        console.log('showList')
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

app.get('/vacation', async (req, res) => {
    try {
        const allUser = await Vacation.find({})
        res.status(200).send(allUser)
        console.log('showList')
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

app.post('/vacationdelete', async(req, res) => {
    try {
        const deleteTask = await Vacation.findByIdAndDelete(req.body._id);
        res
            .status(200)
            .send(deleteTask)
        console.log('deleted')
    } catch(err) {
        console.log(err)
        res.status(500).send()
    }
});

app.post('/workdelete', async(req, res) => {
    try{
        const deleteTask = await Work.findByIdAndDelete(req.body._id);
        res
            .status(200)
            .send(deleteTask)
            console.log('deleted')
    } catch(err) {
        console.log(err)
        res.status(500).send()
    }
});

app.post('/homedelete', async(req, res) => {
    try{
        const deleteTask = await User.findByIdAndDelete(req.body._id);
        res
            .status(200)
            .send(deleteTask)
            console.log('deleted')
    } catch(err) {
        console.log(err)
        res.status(500).send()
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})