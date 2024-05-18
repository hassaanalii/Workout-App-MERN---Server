const Workout = require('../models/workoutModel')

const createWorkout = async(req, res) =>{
    const {title, reps, load} = req.body;
    try{
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)

    }catch(error){
        res.status(404).json({error: error.message})
    }

}