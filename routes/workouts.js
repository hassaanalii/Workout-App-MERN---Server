const express = require('express')
const router = express.Router()
const {
    createWorkout,
    getWorkouts,
    singleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')


router.get("/", getWorkouts)

router.get("/:id", singleWorkout)

router.post("/", createWorkout)

router.delete("/:id", deleteWorkout)

router.patch("/:id", updateWorkout)


module.exports = router