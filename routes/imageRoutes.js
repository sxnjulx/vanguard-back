const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { Image } = require("../models/blog");
const { storeFileImageInS3,  deleteImageFromS3} = require("../controllers/imageController");
require("dotenv").config();

const imageRoutes = express.Router();


const upload = multer({ storage: multer.memoryStorage() });

// ✅ Upload Image to S3 (AWS SDK v3)
imageRoutes.post("/", upload.single("file"), storeFileImageInS3);

// ✅ Delete Image from S3 (AWS SDK v3)
imageRoutes.delete("/", deleteImageFromS3 );

module.exports = imageRoutes;
