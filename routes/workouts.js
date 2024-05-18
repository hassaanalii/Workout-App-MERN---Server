const express = require('express')

const router = express.Router()

router.get("/", (req, res) => {
    res.json({msg:"heheh"})

})

router.get("/:id", (req, res) => {
    res.json({msg:"single workout "})

})

router.post("/", (req, res) => {
    res.json({msg:"post "})

})

router.delete("/:id", (req, res) => {
    res.json({msg:"delete "})

})

router.patch("/:id", (req, res) => {
    res.json({msg:"patch "})

})


module.exports = router