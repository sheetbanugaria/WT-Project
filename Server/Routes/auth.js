const express = require('express')
const router = express.Router()
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    
    if(user) {
        return res.json({message: 'User existed'});
    }
    const hashpassword = await bcrypt.hash(password,10)
    const newuser = new UserModel({username, password: hashpassword});
    await newuser.save()
    return res.json({message: 'Record saved'})
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = await UserModel.findOne({username});
    if(!user) {
        return res.json({message: 'Wrong Credentials'});
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        return res.json({message: 'Wrong Credentials'});
    }
    const token = jwt.sign({id: user._id}, 'Secret');
    res.cookie('token' , token)
    return res.json({message: 'Successfully logged In', id: user._id})
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.json({message: 'Logged Out'})
})

module.exports = router;