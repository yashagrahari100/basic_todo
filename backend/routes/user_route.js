const express = require('express');
const { register, login, Logout } = require('../controller/user_controller');
const User_router = express.Router();


User_router.post('/signup',register)
User_router.post('/login',login)
User_router.get('/logout',Logout)


module.exports = {
    User_router
}