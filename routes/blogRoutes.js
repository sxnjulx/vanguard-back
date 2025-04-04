const express = require('express')
const { getAllBlogs, getBlogById, handleBlogUpdateRequest, handleCreateBlogRequest, handleBlogDelete } = require('../controllers/blogController')

const blogRoutes = express.Router()

blogRoutes.get("/", getAllBlogs)
blogRoutes.get("/:id", getBlogById)
blogRoutes.post("/",handleCreateBlogRequest)
blogRoutes.put("/:id",handleBlogUpdateRequest)
blogRoutes.delete("/:id",handleBlogDelete)



module.exports = blogRoutes