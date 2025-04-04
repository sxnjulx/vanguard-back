const mongoose = require('mongoose');

const { ImageSchema, SectionSchema} = require('./blog')

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    coverImage : ImageSchema,
    title: { type: String, required: true },
    time: { type: Date, default: Date.now },
    initialParagraph: { type: String, required: true },
    sections: [SectionSchema] // Array of sections
});

const Project = mongoose.model('Project', projectSchema);

module.exports = {Project};