const {Blog} = require('../models/blog');
const mongoose = require('mongoose');


const getAllBlogs = async (req, res) => {
    console.log('GET request to the blogs');
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    try {
      const totalBlogs = await Blog.countDocuments();
      const blogs = await Blog.find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(limit);
      const totalPages = Math.ceil(totalBlogs / limit);
      res.json({
        blogs,
        pagination: {
          page,
          limit,
          totalPages: totalPages,
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    console.log('get blog by id');
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
          return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const handleBlogUpdateRequest = async (req, res) => {
    console.log('PUT request to the blogs');
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedBlog) {
          return res.status(404).json({ message: "Blog not found" });
        }
        res.json(updatedBlog);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

const handleCreateBlogRequest = async (req, res) => {
    try {
        // Convert author.id to ObjectId
        if (req.body.author ) {
            req.body.author.id = new mongoose.Types.ObjectId(req.body.author.id);
        }

        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleBlogDelete = async (req, res) => {
  console.log('DELETE request to the blogs');
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBlogs, getBlogById, handleBlogUpdateRequest, handleCreateBlogRequest, handleBlogDelete };