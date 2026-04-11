const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title:       { type: String, required: [true, 'Title is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'] },
    icon:        { type: String, default: '' },
    features:    [{ type: String }],
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
