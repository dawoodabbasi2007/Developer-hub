const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title:        { type: String, required: [true, 'Title is required'], trim: true },
    description:  { type: String, required: [true, 'Description is required'] },
    image:        { type: String, default: '' },
    category:     { type: String, default: 'Web Development', trim: true },
    technologies: [{ type: String }],
    liveUrl:      { type: String, default: '' },
    githubUrl:    { type: String, default: '' },
    isActive:     { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
