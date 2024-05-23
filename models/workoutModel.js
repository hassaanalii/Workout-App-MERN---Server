const mongoose = require('mongoose');

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    reps:{
        type: Number,
        required: true,
    },
    load:{
        type: Number,
        required: true,
    },
    photoUrl: {
        type: String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Workout', WorkoutSchema)



