const userModel = require('../models/userModal.js');
const express = require('express')
const authRouters = require('../controller/blogAuth.js');
const { authMiddleware } = require('../middleware/verifytoken');

const blogauthrout = express.Router()

blogauthrout.post('/register',authRouters.register)
blogauthrout.post('/login',authRouters.login)
blogauthrout.post('/logout',authRouters.logout)
blogauthrout.get('/username',authMiddleware,authRouters.getUsername)
blogauthrout.get('/profile',authMiddleware,authRouters.profile)

module.exports = blogauthrout;