const express = require('express');
const { getAllProjects, getProjectById, deleteProjectById, createNewProject } = require('../controllers/projectController');

const projectRoutes = express.Router();

projectRoutes.get( "/", getAllProjects);
projectRoutes.get( "/:id", getProjectById);
projectRoutes.post( "/", createNewProject)
projectRoutes.delete( "/:id", deleteProjectById);

module.exports = projectRoutes;
