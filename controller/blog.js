const userModel = require('../models/userModal.js');
const blogModel = require('../models/newBlog.js');

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

const newBlog = async (req, res) => {
  try {
    const { title, content, type, username } = req.body;
    console.log(req.body); // Ensure you're logging the body

    // Create a new blog post
    const newBlog = new blogModel({
      title,
      content,
      type,
      username
    });

    // Save the blog post to the database
    await newBlog.save();

    // Send a response back to the client
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Blog ID is required' });
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      { title, content, type },
      { new: true }
    );

    if (!updatedBlog) {
      res.status(404).json({ message: 'Blog not found' });
    } else {
      res.status(200).json({ message: 'Update Success', blog: updatedBlog });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog', error: error.message });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const deletedBlog = await blogModel.findByIdAndDelete(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog', error: error.message });
  }
};

// Function to save a blog post
const saveBlog = async (req, res) => {
  const userId = req.userId; // Assume userId is set by authMiddleware
  const { blogId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.savedBlogs.includes(blogId)) {
      user.savedBlogs.push(blogId);
      await user.save();
      res.status(200).json({ message: 'Blog saved successfully' });
    } else {
      res.status(400).json({ message: 'Blog already saved' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all saved blogs for a user
const userSavedBlog = async (req, res) => {
  const userId = req.userId; // Assume userId is set by authMiddleware

  try {
    const user = await userModel.findById(userId).populate('savedBlogs');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.savedBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getBlogs , newBlog, updateBlog, getBlog, saveBlog, userSavedBlog, deleteBlog};
