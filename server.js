require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workouts');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
const userRoutes = require('./routes/users');
const { authCheck } = require('./middleware/auth');


app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

const corsOptions = {
    origin: process.env.REACT_URL,
    optionsSuccessStatus: 200,
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors(corsOptions));

app.use('/api/workouts', authCheck, workoutRoutes)
app.use('/api/user', userRoutes)


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
