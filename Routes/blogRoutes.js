const express = require('express');
const blogRouters = require('../controller/blog.js');
const { authMiddleware } = require('../middleware/verifytoken');

const blogrout = express.Router();

blogrout.get('/allblogs', blogRouters.getBlogs);
blogrout.post('/newBlog', authMiddleware, blogRouters.newBlog);
blogrout.get('/updateBlog/:id', authMiddleware, blogRouters.getBlog);
blogrout.delete('/deleteBlog/:id', authMiddleware, blogRouters.deleteBlog);
blogrout.put('/updateBlog/:id', authMiddleware, blogRouters.updateBlog);

module.exports = blogrout;