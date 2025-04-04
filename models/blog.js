const mongoose = require("mongoose");

// Define the Image Schema
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  key: { type: String, required: true }
});

// Create the Image model
const Image = mongoose.model('Image', ImageSchema);

// Define the Section Schema that uses the Image Schema for images
const SectionSchema = new mongoose.Schema({
  subTitle: { type: String, required: true },
  images: [ImageSchema], // Array of Image objects
  paragraphs: [{ type: String, required: true }]
});

// Define the Blog Schema
const BlogSchema = new mongoose.Schema({
  author: {
    name: { type: String, required: true },
    image: ImageSchema, // Embed Image Schema directly in the author field
    title: { type: String, required: true },
  },
  title: { type: String, required: true },
  time: { type: Date, default: Date.now },
  initialParagraph: { type: String, required: true },
  sections: [SectionSchema] // Array of sections
});

// Create the Blog model
const Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog, Image, ImageSchema, SectionSchema }; // Export both Blog and Image models
