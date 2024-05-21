const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')


const loginUser = async (req, res) => {

}


const registerUser = async (req, res) => {
    const {name, password, email} = req.body;

    try{
        const exists = await userModel.findOne({email})

        if (exists){
            return res.json({success: false, message: "User already registered"})
        }

        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success: false, message: "Enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        

    }catch(error){

    }
}


module.exports = {
    loginUser,
    registerUser
}