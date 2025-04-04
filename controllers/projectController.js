const { Project } = require('../models/project');
const mongoose = require('mongoose');

const getAllProjects = async (req, res) => {
    console.log('GET request to the projects');
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    try {
        const totalProjects = await Project.countDocuments();
        const projects = await Project.find()
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalProjects / limit);
        res.json({
            projects,
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

const getProjectById = async (req, res) => {
    console.log('GET request to project by id');
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleProjectUpdateRequest = async (req, res) => {
    console.log('PUT request to the projects');
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createNewProject = async (req, res) => {
    try {
        
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteProjectById = async (req, res) => {
    console.log('DELETE request to project by id');
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllProjects, getProjectById, handleProjectUpdateRequest, createNewProject, deleteProjectById };