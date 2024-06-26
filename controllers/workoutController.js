const upload = require('../middleware/upload');
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose');


// const createWorkout = async(req, res) =>{
//     const {title, reps, load} = req.body;
//     try{
//         const workout = await Workout.create({title, reps, load})
//         res.status(200).json(workout)

//     }catch(error){
//         res.status(404).json({error: error.message})
//     }

// } 


const createWorkout = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const userId = req.userId
        console.log(userId);
        const { title, reps, load } = req.body;
        const photoUrl = req.file ? req.file.path : '';

        try {
            const workout = await Workout.create({ userId, title, reps, load, photoUrl });
            res.status(200).json(workout);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    });
};

// const updateWorkout = async (req, res) => {
//     const {id} = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error:"No Workout Object"})
//     }

//     const workout = await Workout.findOneAndUpdate({_id: id}, {
//         ...req.body
//     })

//     if(!workout){
//         return res.status(400).json({error:"No workout found"})
//     }

//     res.status(200).json(workout)
 
// }

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Workout Object" });
    }

    // Use the upload middleware to handle the file upload
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const updateData = { ...req.body };
        if (req.file) {
            updateData.photoUrl = req.file.path;
        }

        try {
            const workout = await Workout.findOneAndUpdate({ _id: id }, updateData, { new: true });

            if (!workout) {
                return res.status(400).json({ error: "No workout found" });
            }

            res.status(200).json(workout);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};


const getWorkouts = async (req, res) => {
    const userId = req.userId;
    try {
        const workouts = await Workout.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving workouts", error: error.message });
    }
}

const singleWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No Workout Object"})
    }

    const workout = await Workout.findById(id)
    
    if(!workout){
        return res.status(404).json({error:"No workout found"})
    }

    res.status(200).json(workout)
}

const deleteWorkout = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No Workout Object"})
    }

    const workout = await Workout.findOneAndDelete({_id:id})
    
    if(!workout){
        return res.status(400).json({error:"No workout found"})
    }

    res.status(200).json(workout)
    
}



module.exports = {
    createWorkout,
    getWorkouts,
    singleWorkout,
    deleteWorkout,
    updateWorkout,
}