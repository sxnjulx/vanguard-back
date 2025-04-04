const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const { Image, Blog } = require("../models/blog");
const { Project } = require('../models/project');
const imageRoutes = require("../routes/imageRoutes");
require("dotenv").config();


// AWS S3 Config
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const storeFileImageInS3 =  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  
      const fileExt = req.file.originalname.split(".").pop();
      const fileName = `uploads/${uuidv4()}.${fileExt}`;
  
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
  
      const command = new PutObjectCommand(params);
      await s3.send(command);
  
      // Construct the S3 URL
      const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  
      const newImage = new Image({
          key: fileName,  
          url: s3Url,
      });
      const savedImage = await newImage.save();
      res.status(201).json(savedImage);
      
    } catch (error) {
      res.status(500).json({ message: "Upload failed", error });
    }
  }

  const deleteImageFromS3 = async (req, res) => {
    try {
        const { imageId, blogId } = req.query;
        let imageKey = null;
                
        if (blogId){
            const blog = await Blog.findById(blogId);
            const project = await Project.findById(blogId);
            if (!blog || !project) return res.status(404).json({ message: "Blog not found" });
    
            if (blog){
                if (blog.author.image._id.toString() === imageId) {
                    imageKey =blog.author.image.key; // Store the key for S3 deletion
                    blog.author.image = null; // Remove the image
                } else{
                    blog.sections.forEach(section => {
                        section.images = section.images.filter(img => {
                            if (img._id.toString() === imageId) {
                                imageKey = img.key; // Store the key for S3 deletion
                                return false; // Remove this image
                            }
                            return true;
                        });
                    });
                }
                
                await blog.save();
            }
            if (project){
                if(project.coverImage._id.toString() == imageId){
                    imageKey = project.coverImage.key //Store the key to delete form s3
                    project.coverImage = null;
                } else{
                    project.sections.forEach(section => {
                        section.images = section.images.filter(img => {
                            if (img._id.toString() === imageId) {
                                imageKey = img.key; // Store the key for S3 deletion
                                return false; // Remove this image
                            }
                            return true;
                        });
                    })
                }
            }

        } else {
            const image = await Image.findById(imageId);
            if (!image) return res.status(404).json({ message: "Image not found" });
            imageKey = image.key
            await Image.findByIdAndDelete(imageId);

        }



        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageKey,
        };
  
        const command = new DeleteObjectCommand(params);
        await s3.send(command);

        
  
        res.json({ message: "File deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Delete failed", error });
    }
  }



  module.exports = {
    storeFileImageInS3,
    deleteImageFromS3
  }